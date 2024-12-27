import simpy
from iot_simulator.services.parking_api_service import ParkingAPIService
from iot_simulator.services.vehicle_generator import VehicleGenerator
from iot_simulator.models.parking_spot import ParkingSpotStatus
from iot_simulator.models.vehicle import Vehicle
from iot_simulator.models.config import ParkingLotConfig, SimulationConfig

class ParkingSimulator:
    def __init__(self, config: SimulationConfig):
        # self.env = simpy.Environment()
        self.env = simpy.rt.RealtimeEnvironment(factor=30)
        self.config = config
        self.api_service = ParkingAPIService(config.api_endpoint)
        self.vehicle_generator = VehicleGenerator()

    def vehicle_arrival(self, lot_config: ParkingLotConfig):
        while True:
            inter_arrival = self.vehicle_generator.get_next_arrival_time(lot_config)
            yield self.env.timeout(inter_arrival)
            
            vehicle = self.vehicle_generator.generate_vehicle(self.env.now, lot_config)
            self.env.process(self.handle_vehicle(vehicle, lot_config.lot_id))

    def handle_vehicle(self, vehicle: Vehicle, lot_id: int):
        parking_data = self.api_service.find_available_spot(lot_id)
        
        if parking_data:
            if self.api_service.update_spot_status(parking_data['id'], ParkingSpotStatus.OCCUPIED):
                yield self.env.timeout(vehicle.parking_duration)
                self.api_service.update_spot_status(
                    parking_data['id'],
                    ParkingSpotStatus.VACANT
                )
        else:
            print(f"No parking spot available for vehicle {vehicle.id}")

    def run(self):
        for lot_config in self.config.parking_lots:
            self.env.process(self.vehicle_arrival(lot_config))
        self.env.run()
