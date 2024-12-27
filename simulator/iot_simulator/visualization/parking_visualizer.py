import tkinter as tk
from typing import Dict, List
from threading import Lock

class ParkingVisualizer:
    def __init__(self, spots_per_row: int = 10):
        self.root = tk.Tk()
        self.root.title("Parking Lot Simulation")
        self.spots_per_row = spots_per_row
        self.spots: Dict[int, List[tk.Canvas]] = {}
        self.lock = Lock()
        self.setup_gui()

    def setup_gui(self):
        self.frame = tk.Frame(self.root, padx=10, pady=10)
        self.frame.pack(expand=True, fill='both')

    def create_parking_lot(self, lot_id: int, total_spots: int):
        lot_frame = tk.LabelFrame(self.frame, text=f"Parking Lot {lot_id}", padx=5, pady=5)
        lot_frame.pack(pady=10)
        
        self.spots[lot_id] = []
        rows = (total_spots - 1) // self.spots_per_row + 1

        for i in range(total_spots):
            row = i // self.spots_per_row
            col = i % self.spots_per_row
            
            spot = tk.Canvas(lot_frame, width=30, height=30, bg='green')
            spot.grid(row=row, column=col, padx=2, pady=2)
            text_id = spot.create_text(15, 15, text=str(i+1), fill='white')
            self.spots[lot_id].append(spot)

    def update_spot(self, lot_id: int, spot_id: int, status: str):
        def _update():
            color = 'red' if status == 'OCCUPIED' else 'green'
            self.spots[lot_id][spot_id-1].configure(bg=color)
        self.root.after(0, _update)

    def run(self):
        self.root.mainloop()
