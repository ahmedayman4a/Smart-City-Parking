from iot_simulator.core.simulator import ParkingSimulator
from iot_simulator.models.config import SimulationConfig, ParkingLotConfig
from iot_simulator.services.mock_parking_api import MockParkingAPIService
from iot_simulator.visualization.parking_visualizer import ParkingVisualizer
import time
import threading

def main():
    # Configuration
    config = SimulationConfig(
        api_endpoint="http://localhost:8080",
        parking_lots=[
            ParkingLotConfig(
                lot_id=1,
                arrival_rate=20,  # 20 vehicles per hour
                mean_parking_duration=2.0,  # 2 hours average parking duration
                max_capacity=50  # 50 spots per lot
            ),
            ParkingLotConfig(
                lot_id=2,
                arrival_rate=15,  # 15 vehicles per hour
                mean_parking_duration=1.5,  # 1.5 hours average parking duration
                max_capacity=20  # 20 spots per lot
            ),
            ParkingLotConfig(
                lot_id=3,
                arrival_rate=10,  # 10 vehicles per hour
                mean_parking_duration=3.0,  # 3 hours average parking duration
                max_capacity=30  # 30 spots per lot
            )
        ]
    )

    # Setup visualization
    visualizer = ParkingVisualizer()
    # Create visualization for each parking lot
    for lot_config in config.parking_lots:
        visualizer.create_parking_lot(lot_config.lot_id, lot_config.max_capacity)  # 50 spots per lot

    # Create simulator with mock API
    simulator = ParkingSimulator(config)
    simulator.api_service = MockParkingAPIService(config.parking_lots)

    # Add visualization updates to the simulator
    original_update_status = simulator.api_service.update_spot_status
    def update_status_with_viz(lot_id: int, spot_id: int, status):
        result = original_update_status(lot_id, spot_id, status)
        if result:
            visualizer.update_spot(lot_id, spot_id, status.value)
        return result
    
    simulator.api_service.update_spot_status = update_status_with_viz

    # Run simulation
    print("Starting simulation...")
    # Run simulator in a separate thread
    threading.Thread(target=simulator.run, daemon=True).start()
    # Run visualizer in main thread
    visualizer.run()

if __name__ == "__main__":
    main()
