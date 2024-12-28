import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { ParkingSpot } from "../../types";
import { reserveSpot } from "../../api/reservationService";
import ReservationModal from "../dashboard/ReservationModal";
import L from "leaflet";

import regularSrc from "../../assets/parked-car.png";
import evSrc from "../../assets/power-supply.png";
import handSrc from "../../assets/wheelchair.png";

interface ParkingMapProps {
  spots: ParkingSpot[];
}

const MapAutoBounds = ({ spots }: { spots: ParkingSpot[] }) => {
  const map = useMap();

  useEffect(() => {
    if (spots.length > 0) {
      const latLngs = spots.map((spot) =>
        L.latLng(spot.latitude, spot.longitude)
      );
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView([37.7749, -122.4194], 13);
    }
  }, [spots, map]);

  return null;
};

const getIcon = (type: string) => {
  // Map spot types to their respective icons
  const iconMap = {
    standard: regularSrc,
    electric: evSrc,
    handicap: handSrc,
  };

  const iconUrl = iconMap[type.toLowerCase()] || regularSrc; // Default to car icon if type not found
  return L.icon({
    iconUrl,
    iconSize: [32, 32], // Customize size as needed
    iconAnchor: [16, 32], // Adjust anchor point if necessary
    popupAnchor: [0, -32], // Adjust popup position relative to the icon
  });
};

export default function ParkingMap({ spots }: ParkingMapProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  // Modal Logic
  const openModal = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSpot(null);
  };

  const handleReserve = async ({
    startTime,
    endTime,
    paymentMethod,
  }: {
    startTime: string;
    endTime: string;
    paymentMethod: string;
  }) => {
    if (selectedSpot) {
      const reservation = {
        lotId: selectedSpot.id,
        start: new Date(startTime),
        end: new Date(endTime),
        paymentMethod,
      };
      console.log(reservation);
      try {
        await reserveSpot(reservation);
        closeModal();
      } catch (error) {
        console.error("Failed to reserve spot:", error);
      }
    }
  };

  return (
    <>
      <MapContainer className="h-[600px] w-full rounded-lg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapAutoBounds spots={spots} />
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.latitude, spot.longitude]}
            icon={getIcon(spot.type)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{spot.name}</h3>
                <h3 className="text-sm text-gray 600">{spot.address}</h3>
                <p className="text-sm text-gray-600">{spot.type} Spot</p>
                <p className="text-sm font-medium">
                  ${spot.ratePerHour.toFixed(2)}/hr
                </p>
                <button
                  className="mt-2 w-full px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  onClick={() => openModal(spot)}
                >
                  Reserve
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <ReservationModal
        isOpen={modalOpen}
        onClose={closeModal}
        spot={selectedSpot}
        onReserve={handleReserve}
      />
    </>
  );
}
