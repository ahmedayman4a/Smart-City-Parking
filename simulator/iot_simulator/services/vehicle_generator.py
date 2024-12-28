from datetime import datetime, timedelta
import numpy as np
from iot_simulator.models.vehicle import Vehicle
from iot_simulator.models.config import ParkingLotConfig

class VehicleGenerator:
    def generate_vehicle(self, current_time: datetime, lot_config: ParkingLotConfig) -> Vehicle:
        # Generate duration in minutes
        duration = timedelta(minutes=float(
            np.random.exponential(lot_config.mean_parking_duration)
        ))
        
        return Vehicle(
            id=f"V{current_time.timestamp():.0f}",
            arrival_time=current_time,
            parking_duration=duration
        )

    def get_next_arrival_time(self, current_time: datetime, lot_config: ParkingLotConfig) -> timedelta:
        minute = current_time.minute
        
        # Apply peak minute multiplier
        rate = lot_config.arrival_rate
        if lot_config.peak_minutes[0] <= minute <= lot_config.peak_minutes[1]:
            rate *= lot_config.peak_multiplier
            
        # Generate random interval in minutes
        minutes = float(np.random.exponential(1/rate))
        return timedelta(minutes=minutes)