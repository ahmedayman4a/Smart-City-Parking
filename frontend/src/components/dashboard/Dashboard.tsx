import React from 'react';
import DashboardLayout from './DashboardLayout';
import ActiveReservations from './ActiveReservations';
import ParkingFinder from './ParkingFinder';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mt-6 grid grid-cols-1 gap-6">
          <ActiveReservations />
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Find Parking</h2>
            <ParkingFinder />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}