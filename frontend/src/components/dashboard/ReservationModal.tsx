import { useState } from "react";
import Modal from "react-modal";
import type { ParkingSpot } from "../../types";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  spot: ParkingSpot | null;
  onReserve: (reservation: {
    startTime: string;
    endTime: string;
    paymentMethod: string;
  }) => void;
}

export default function ReservationModal({
  isOpen,
  onClose,
  spot,
  onReserve,
}: ReservationModalProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleReserve = () => {
    if (spot && startTime && endTime && paymentMethod) {
      onReserve({ startTime, endTime, paymentMethod });
      setStartTime("");
      setEndTime("");
      setPaymentMethod("");
    } else {
      console.log("Please fill all fields.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Reservation Modal"
      ariaHideApp={false}
      style={{
        content: {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        },
      }}
    >
      <h2 className="text-lg font-bold">Reserve Spot</h2>
      {spot && (
        <>
          <p className="text-sm mb-2">{spot.address}</p>
          <label className="block mb-2">
            Start Time:
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="block mb-2">
            End Time:
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="block mb-2">
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash">Cash</option>
            </select>
          </label>
          <button
            className="mt-4 w-full px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            onClick={handleReserve}
          >
            Confirm Reservation
          </button>
        </>
      )}
      <button
        className="mt-4 w-full px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        onClick={onClose}
      >
        Cancel
      </button>
    </Modal>
  );
}
