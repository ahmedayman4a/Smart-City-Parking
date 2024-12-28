import simpy
from iot_simulator.services.parking_api_service import ParkingAPIService
from iot_simulator.services.vehicle_generator import VehicleGenerator
from iot_simulator.models.parking_spot import ParkingSpotStatus
from iot_simulator.models.vehicle import Vehicle
from iot_simulator.models.config import ParkingLotConfig, SimulationConfig
from datetime import datetime, timedelta


class ParkingSimulator:
    def __init__(self, config: SimulationConfig):
        self.env = simpy.rt.RealtimeEnvironment(
            initial_time=config.start_time.timestamp(),
            factor=config.speed_factor
        )
        self.config = config
        self.api_service = ParkingAPIService(config.api_endpoint)
        self.vehicle_generator = VehicleGenerator()
        print(f"Initialized simulator with speed factor: {config.speed_factor}")
        print(f"Start time: {config.start_time}")

    def current_datetime(self) -> datetime:
        return datetime.fromtimestamp(self.env.now)

    def simulate_reservations(self, lot_config: ParkingLotConfig):
        print(f"\nStarting simulation for parking lot {lot_config.lot_id}")
        while True:
            current_time = self.current_datetime()
            arrival_delta = self.vehicle_generator.get_next_arrival_time(
                current_time, 
                lot_config
            )
            
            print(f"\n[{current_time}] Generating reservation:")
            future_arrival = current_time + arrival_delta
            vehicle = self.vehicle_generator.generate_vehicle(future_arrival, lot_config)
            print(f"- Next vehicle arrival in {arrival_delta}")
            print(f"- Vehicle stay duration: {vehicle.parking_duration}")
            
            # Create reservation request
            reservation_request = {
                'lotId': lot_config.lot_id,
                'start': future_arrival.isoformat(),
                'end': (future_arrival + vehicle.parking_duration).isoformat(),
                'paymentMethod': 'CARD'
            }
            
            print("- Submitting reservation request...")
            # Submit reservation
            reservation = self.api_service.create_reservation(reservation_request)
            if reservation:
                print(f"- Reservation created successfully for spot {reservation['spotId']}")
                self.env.process(self.handle_reservation(vehicle, reservation))
            else:
                print("- Failed to create reservation")
            
            yield self.env.timeout(arrival_delta.total_seconds())

    def _parse_datetime(self, datetime_str: str) -> float:
        try:
            # Handle various ISO formats
            if '.' in datetime_str:
                main_part, fraction = datetime_str.split('.')
                # Pad the fraction with zeros if needed
                fraction = f"{fraction:<06}"[:6]  # Left align and take first 6 digits
                datetime_str = f"{main_part}.{fraction}"
            return datetime.fromisoformat(datetime_str).timestamp()
        except ValueError:
            # Fallback: strip fractional seconds completely
            clean_dt = datetime_str.split('.')[0]
            return datetime.fromisoformat(clean_dt).timestamp()

    def handle_reservation(self, vehicle, reservation):
        start_time = self._parse_datetime(reservation['start'])
        end_time = self._parse_datetime(reservation['end'])
        
        wait_time = max(start_time - self.env.now, 0)
        print(f"\n[{self.current_datetime()}] Waiting {wait_time} seconds for reservation start")
        yield self.env.timeout(wait_time)
        
        print(f"[{self.current_datetime()}] Marking spot {reservation['spotId']} as occupied")
        success = self.api_service.update_spot_status(
            reservation['spotId'], 
            ParkingSpotStatus.OCCUPIED
        )
        
        if success:
            duration = max(end_time - self.env.now, 0)
            print(f"- Vehicle parked successfully, will stay for {duration} seconds")
            yield self.env.timeout(duration)
            
            print(f"[{self.current_datetime()}] Marking spot {reservation['spotId']} as vacant")
            self.api_service.update_spot_status(
                reservation['spotId'],
                ParkingSpotStatus.AVAILABLE
            )
        else:
            print("- Failed to update spot status")

    def run(self):
        print("\nStarting parking simulator...")
        for lot_config in self.config.parking_lots:
            print(f"Initializing simulation for lot {lot_config.lot_id}")
            self.env.process(self.simulate_reservations(lot_config))
        print("All simulations initialized, running environment")
        self.env.run()