import React from 'react';
import { Car, Battery, AlertCircle } from 'lucide-react';

const mockParkingSpots = [
  { id: 'A1', type: 'regular', status: 'available' },
  { id: 'A2', type: 'regular', status: 'occupied' },
  { id: 'B1', type: 'ev', status: 'available' },
  { id: 'B2', type: 'ev', status: 'charging' },
  { id: 'C1', type: 'disabled', status: 'available' },
  { id: 'C2', type: 'disabled', status: 'occupied' },
];

export default function ParkingLotStatus() {
  const getSpotIcon = (type: string) => {
    switch (type) {
      case 'ev': return <Battery className="h-6 w-6" />;
      case 'disabled': return <AlertCircle className="h-6 w-6" />;
      default: return <Car className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'charging': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Parking Lot Status</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockParkingSpots.map((spot) => (
          <div
            key={spot.id}
            className="border rounded-lg p-4 flex flex-col items-center"
          >
            <div className="text-gray-500 mb-2">{getSpotIcon(spot.type)}</div>
            <div className="text-lg font-medium text-gray-900 mb-2">Spot {spot.id}</div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(spot.status)}`}>
              {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}