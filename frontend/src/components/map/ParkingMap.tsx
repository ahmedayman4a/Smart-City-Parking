import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from 'react-modal'; // Install react-modal: npm install react-modal
import type { ParkingSpot } from '../../types';
import { reserveSpot } from '../../api/reservationService';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface ParkingMapProps {
  spots: ParkingSpot[];
  center?: [number, number];
  zoom?: number;
}

export default function ParkingMap({
  spots,
  center = [40.7128, -74.0060],
  zoom = 13,
}: ParkingMapProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const openModal = (event: React.MouseEvent, spot: ParkingSpot) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setSelectedSpot(spot);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSpot(null);
    setStartTime('');
    setEndTime('');
    setPaymentMethod('');
  };

  const handleReserve = async () => {
    if (selectedSpot && startTime && endTime && paymentMethod) {
      const reservation = {
        spotId: selectedSpot.id,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        paymentMethod,
      };

      try {
        await reserveSpot(reservation);
        alert('Reservation successful!');
        closeModal();
      } catch (error) {
        alert('Failed to reserve spot. Please try again.');
      }
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-[600px] w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.location.lat, spot.location.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{spot.location.address}</h3>
                <p className="text-sm text-gray-600">{spot.type} Spot</p>
                <p className="text-sm font-medium">${spot.price.toFixed(2)}/hr</p>
                <button
                  className="mt-2 w-full px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  onClick={(event) => openModal(event, spot)}
                >
                  Reserve
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Reservation Modal"
        style={{
          content: {
            position: 'fixed', // Use fixed to position it relative to the viewport
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            transform: 'translate(-50%, -50%)',
            width: '400px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000, // Higher z-index ensures it is on top
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999, // Ensure overlay is behind modal but above the map
          },
        }}
      >
        <h2 className="text-lg font-bold">Reserve Spot</h2>
        {selectedSpot && (
          <>
            <p className="text-sm mb-2">{selectedSpot.location.address}</p>
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
          onClick={closeModal}
        >
          Cancel
        </button>
      </Modal>
    </>
  );
}
