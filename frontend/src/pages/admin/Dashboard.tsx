import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboardLayout from '../../components/dashboard/AdminDashboardLayout';
import ParkingSpotsList from './ParkingSpotsList';
import RevenueStats from './RevenueStats';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">Welcome back, {user?.name}</p>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueStats />
          <ParkingSpotsList />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}