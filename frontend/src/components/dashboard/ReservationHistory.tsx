import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockReservationHistory = [
  {
    id: '1',
    spotId: 'A1',
    location: 'Downtown Parking - Block A',
    startTime: '2024-03-15T10:00:00',
    endTime: '2024-03-15T12:00:00',
    status: 'completed',
    totalPrice: 15.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  },
  {
    id: '2',
    spotId: 'B3',
    location: 'Central Mall Parking',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'cancelled',
    totalPrice: 12.00
  }
];

export default function ReservationHistory() {
  const navigate = useNavigate();

  const handleReservationClick = (reservationId: string) => {
    navigate(`/reservation-details/${reservationId}`);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Reservation History</h3>
        <p className="mt-1 text-sm text-gray-500">Your past parking reservations</p>
      </div>
      <div className="divide-y divide-gray-200">
        {mockReservationHistory.map((reservation) => (
          <div 
            key={reservation.id} 
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            onClick={() => handleReservationClick(reservation.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {reservation.location}
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
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  reservation.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {reservation.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-1" />
                  )}
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </span>
                <span className="mt-2 text-sm font-medium text-gray-900">
                  ${reservation.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}