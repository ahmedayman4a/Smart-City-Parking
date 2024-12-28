import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Reservation } from '../../types';

const mockReservations: Reservation[] = [
  {
    id: '1',
    userId: '1',
    spotId: '1',
    startTime: '2024-03-20T10:00:00',
    endTime: '2024-03-20T12:00:00',
    status: 'active',
    totalPrice: 15.00,
    paymentStatus: 'paid'
  }
];

export default function ActiveReservations() {
  const navigate = useNavigate();

  const handleReservationClick = (reservationId: string) => {
    navigate(`/reservation-details/${reservationId}`);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Active Reservations</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {mockReservations.map((reservation) => (
            <li 
              key={reservation.id} 
              className="px-4 py-4 sm:px-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => handleReservationClick(reservation.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>Downtown Parking Garage - Spot A1</p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>{new Date(reservation.startTime).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>
                      {new Date(reservation.startTime).toLocaleTimeString()} - 
                      {new Date(reservation.endTime).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                  <p className="mt-2 text-sm text-gray-900">${reservation.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}