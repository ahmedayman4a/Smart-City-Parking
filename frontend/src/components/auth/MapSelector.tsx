import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon to match styles
const markerIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface MapSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  // Component to handle map clicks
  const LocationMarker = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onLocationSelect(lat, lng);
      },
    });

    return position ? <Marker position={position} icon={markerIcon} /> : null;
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "left" }}>
      <label className="block text-sm font-medium text-gray-700">
        Select Location on Map
      </label>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={12}
        style={{
          height: "300px",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapSelector;
