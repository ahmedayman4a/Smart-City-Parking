from iot_simulator.models.parking_spot import ParkingSpotStatus
import requests
from typing import Optional, Dict

class ParkingAPIService:
    def __init__(self, api_endpoint: str):
        self.api_endpoint = api_endpoint

    def find_available_spot(self, lot_id: int) -> Optional[Dict]:
        try:
            response = requests.get(f"{self.api_endpoint}/api/sensors/available/{lot_id}")
            return response.json() if response.status_code == 200 else None
        except requests.exceptions.RequestException as e:
            print(f"Failed to find available spot: {e}")
            return None

    def update_spot_status(self, sensor_id: int, status: ParkingSpotStatus) -> bool:
        try:
            response = requests.put(
                f"{self.api_endpoint}/api/sensors/{sensor_id}/status",
                json={"status": status.value}
            )
            return response.status_code == 200
        except requests.exceptions.RequestException as e:
            print(f"Failed to update parking status: {e}")
            return False
