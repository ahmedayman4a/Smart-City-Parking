from dataclasses import dataclass
from datetime import datetime, timedelta

@dataclass
class Vehicle:
    id: str
    arrival_time: datetime
    parking_duration: timedelta
    reservation_id: int = None