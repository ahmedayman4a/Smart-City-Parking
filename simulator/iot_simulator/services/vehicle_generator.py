from iot_simulator.models.vehicle import Vehicle
import numpy as np
from iot_simulator.models.config import ParkingLotConfig

class VehicleGenerator:
    def generate_vehicle(self, current_time: float, lot_config: ParkingLotConfig) -> Vehicle:
        parking_duration = np.random.exponential(lot_config.mean_parking_duration)
        return Vehicle(
            id=f"V{current_time:.0f}",
            arrival_time=current_time,
            parking_duration=parking_duration
        )

    def get_next_arrival_time(self, lot_config: ParkingLotConfig) -> float:
        return np.random.exponential(1/lot_config.arrival_rate)
