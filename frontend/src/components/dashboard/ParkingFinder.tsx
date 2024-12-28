import React, { useState } from 'react';
import { Search, Filter, MapPin, List, Map as MapIcon } from 'lucide-react';
import ParkingMap from '../map/ParkingMap';
import type { ParkingSpot } from '../../types';
import { reserveSpot } from '../../api/reservationService';

const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    type: 'regular',
    status: 'available',
    price: 5.0,
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: '123 Main St, New York, NY 10001',
    },
  },
  {
    id: '2',
    type: 'ev',
    status: 'available',
    price: 8.0,
    location: {
      lat: 40.7129,
      lng: -74.0061,
      address: '456 Park Ave, New York, NY 10001',
    },
  },
];

export default function ParkingFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [showModal, setShowModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({
    lotId: '',
    start: '',
    end: '',
    paymentMethod: '',
  });

  const handleReserve = (spotId: string) => {
    setReservationDetails({ lotId:spotId, start: '', end: '', paymentMethod: '' });
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReservationDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Reservation Details:', reservationDetails);
    reserveSpot(reservationDetails);
    setShowModal(false);
  };

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
                    viewMode === 'list' ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-700'
                  }`}
                >
                  <List className="h-5 w-5 mr-2" />
                  List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md ${
                    viewMode === 'map' ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-700'
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
                        <p className="text-sm font-medium text-gray-900 truncate">{spot.location.address}</p>
                        <p className="text-sm text-gray-500">
                          {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)} Spot
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">${spot.price.toFixed(2)}/hr</span>
                      <button
                        onClick={() => handleReserve(spot.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
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

      {/* Reservation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Reserve Parking Spot
                </h3>
                <div className="mt-2 space-y-4">
                  <input
                    type="datetime-local"
                    name="start"
                    value={reservationDetails.start}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 rounded-md"
                    placeholder="Start Time"
                  />
                  <input
                    type="datetime-local"
                    name="end"
                    value={reservationDetails.end}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 rounded-md"
                    placeholder="End Time"
                  />
                  <select
                    name="paymentMethod"
                    value={reservationDetails.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 rounded-md"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
