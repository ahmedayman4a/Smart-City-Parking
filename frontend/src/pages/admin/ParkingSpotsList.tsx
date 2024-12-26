import React from 'react';
import { MapPin, Car, Battery, AlertCircle } from 'lucide-react';

const mockParkingSpots = [
  {
    id: '1',
    location: 'Level 1, Block A',
    type: 'regular',
    status: 'available',
    lastOccupied: '2 hours ago'
  },
  {
    id: '2',
    location: 'Level 2, Block B',
    type: 'ev',
    status: 'occupied',
    lastOccupied: 'Currently occupied'
  },
  {
    id: '3',
    location: 'Level 1, Block C',
    type: 'disabled',
    status: 'maintenance',
    lastOccupied: 'Under maintenance'
  }
];

export default function ParkingSpotsList() {
  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'regular':
        return <Car className="h-5 w-5" />;
      case 'ev':
        return <Battery className="h-5 w-5" />;
      case 'disabled':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Parking Spots</h3>
        <p className="mt-1 text-sm text-gray-500">Overview of all parking spots</p>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {mockParkingSpots.map((spot) => (
          <li key={spot.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{spot.location}</p>
                  <div className="flex items-center mt-1">
                    {getStatusIcon(spot.type)}
                    <p className="ml-2 text-sm text-gray-500">
                      {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)} Spot
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(spot.status)}`}>
                  {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
                </span>
                <p className="ml-4 text-sm text-gray-500">{spot.lastOccupied}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}