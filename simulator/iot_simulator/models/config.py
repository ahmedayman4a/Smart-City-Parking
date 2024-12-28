from dataclasses import dataclass
from typing import List, Tuple
from datetime import datetime

@dataclass
class ParkingLotConfig:
    lot_id: int
    arrival_rate: float  # vehicles per minute
    mean_parking_duration: float  # minutes
    max_capacity: int = 10
    peak_minutes: Tuple[int, int] = (25, 35)  # peak during 25-35th minute of each hour
    peak_multiplier: float = 2.0

@dataclass
class SimulationConfig:
    api_endpoint: str
    parking_lots: List[ParkingLotConfig]
    speed_factor: int = 1  # real-time simulation
    start_time: datetime = datetime.now()
