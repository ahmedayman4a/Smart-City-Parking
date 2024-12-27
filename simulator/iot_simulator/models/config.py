from dataclasses import dataclass
from typing import List
@dataclass
class ParkingLotConfig:
    lot_id: int
    arrival_rate: float  # vehicles per hour
    mean_parking_duration: float  # hours
    max_capacity: int = 50

@dataclass
class SimulationConfig:
    api_endpoint: str
    parking_lots: List[ParkingLotConfig]
