from iot_simulator.models.parking_spot import ParkingSpotStatus
import requests
from typing import Optional, Dict

class ParkingAPIService:
    def __init__(self, api_endpoint: str):
        self.api_endpoint = api_endpoint
        self.token = None
        self.login()
    
    def login(self) -> bool:
        try:
            response = requests.post(
                f"{self.api_endpoint}/api/authenticate/login",
                json={
                    "email": "sensor@parking.com",
                    "password": "password"
                }
            )
            if response.status_code == 200:
                self.token = response.json().get('data')
                return True
            print(f"Failed to login: {response.text}")
            return False
        except requests.exceptions.RequestException as e:
            print(f"Failed to login: {e}")
            return False

    def _get_headers(self) -> Dict[str, str]:
        return {"Authorization": f"Bearer {self.token}"} if self.token else {}

    def create_reservation(self, reservation_request: dict) -> Optional[dict]:
        try:
            response = requests.post(
                f"{self.api_endpoint}/api/reservation/reserve",
                json=reservation_request,
                headers=self._get_headers()
            )
            return response.json() if response.status_code == 200 else None
        except requests.exceptions.RequestException as e:
            print(f"Failed to create reservation: {e}")
            return None

    def update_spot_status(self, spot_id: int, status: ParkingSpotStatus) -> bool:
        try:
            response = requests.put(
                f"{self.api_endpoint}/api/sensors/{spot_id}/status",
                json={"status": status.value},
                headers=self._get_headers()
            )
            return response.status_code == 200
        except requests.exceptions.RequestException as e:
            print(f"Failed to update parking status: {e}")
            return False
