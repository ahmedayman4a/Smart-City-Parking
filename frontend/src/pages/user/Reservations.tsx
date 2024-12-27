import React from 'react';
import UserDashboardLayout from '../../components/dashboard/UserDashboardLayout';
import ReservationHistory from '../../components/dashboard/ReservationHistory';

export default function UserReservations() {
  return (
    <UserDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Reservations</h1>
        <div className="mt-6">
          <ReservationHistory />
        </div>
      </div>
    </UserDashboardLayout>
  );
}