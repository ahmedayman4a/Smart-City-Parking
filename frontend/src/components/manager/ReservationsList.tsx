import React, { useState } from 'react';
import { Calendar, Clock, User, Search } from 'lucide-react';

const mockReservations = [
  {
    id: '1',
    spotId: 'A1',
    userName: 'John Doe',
    startTime: '2024-03-20T10:00:00',
    endTime: '2024-03-20T12:00:00',
    status: 'upcoming'
  },
  {
    id: '2',
    spotId: 'B2',
    userName: 'Jane Smith',
    startTime: '2024-03-20T14:00:00',
    endTime: '2024-03-20T16:00:00',
    status: 'active'
  }
];

export default function ReservationsList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReservations = mockReservations.filter(
    reservation => reservation.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Reservations</h3>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search reservations..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredReservations.map((reservation) => (
          <div key={reservation.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {reservation.userName}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{new Date(reservation.startTime).toLocaleDateString()}</span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span>
                    {new Date(reservation.startTime).toLocaleTimeString()} - 
                    {new Date(reservation.endTime).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  reservation.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </span>
                <span className="mt-2 text-sm text-gray-500">
                  Spot {reservation.spotId}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}