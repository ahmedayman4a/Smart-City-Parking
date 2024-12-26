import React, { useState } from 'react';
import { Search, Filter, MapPin, List, Map as MapIcon } from 'lucide-react';
import type { ParkingSpot } from '../../types';
import ParkingMap from '../map/ParkingMap';

const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    type: 'regular',
    status: 'available',
    price: 5.00,
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Main St, New York, NY 10001'
    }
  },
  {
    id: '2',
    type: 'ev',
    status: 'available',
    price: 8.00,
    location: {
      lat: 40.7129,
      lng: -74.0061,
      address: '456 Park Ave, New York, NY 10001'
    }
  }
];

export default function ParkingFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search by location or landmark"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md ${
                    viewMode === 'list' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  <List className="h-5 w-5 mr-2" />
                  List
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md ${
                    viewMode === 'map' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  <MapIcon className="h-5 w-5 mr-2" />
                  Map
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </button>
              </div>
            </div>

            {viewMode === 'map' ? (
              <div className="mt-4">
                <ParkingMap spots={mockParkingSpots} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockParkingSpots.map((spot) => (
                  <div
                    key={spot.id}
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex flex-col space-y-3 hover:border-gray-400"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {spot.location.address}
                        </p>
                        <p className="text-sm text-gray-500">
                          {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)} Spot
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        ${spot.price.toFixed(2)}/hr
                      </span>
                      <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}