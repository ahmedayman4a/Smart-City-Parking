from iot_simulator.models.parking_spot import ParkingSpotStatus
from typing import Optional, Dict, List
from iot_simulator.models.config import ParkingLotConfig
import random

class MockParkingAPIService:
    def __init__(self, parking_lots: List[ParkingLotConfig]):
        self.spots = {}
        for lot in parking_lots:
            self.spots[lot.lot_id] = [
                {"lot_id": lot.lot_id, "spot_id": i, "status": "VACANT"} 
                for i in range(1, lot.max_capacity + 1)
            ]

    def find_available_spot(self, lot_id: int) -> Optional[Dict]:
        if lot_id in self.spots:
            vacant_spots = [spot for spot in self.spots[lot_id] if spot["status"] == "VACANT"]
            return random.choice(vacant_spots) if vacant_spots else None
        return None

    def update_spot_status(self, lot_id: int, spot_id: int, status: ParkingSpotStatus) -> bool:
        if lot_id in self.spots:
            for spot in self.spots[lot_id]:
                if spot["spot_id"] == spot_id:
                    spot["status"] = status.value
                    return True
        return False
