import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ParkingSpot } from '../../types';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface ParkingMapProps {
  spots: ParkingSpot[];
  center?: [number, number];
  zoom?: number;
}

export default function ParkingMap({ 
  spots, 
  center = [40.7128, -74.0060], 
  zoom = 13 
}: ParkingMapProps) {
  return (
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
              <button className="mt-2 w-full px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Reserve
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}