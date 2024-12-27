import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminDashboardLayout from '../../components/dashboard/AdminDashboardLayout';
import RevenueStats from './RevenueStats';
import UsersList from '../../components/admin/UserList';
import Analytics from '../../components/admin/Analytics';
import ParkingSpotsList from './ParkingSpotsList';

interface AdminDashboardProps {
  activeTab?: string;
}

export default function AdminDashboard({ activeTab: initialTab }: AdminDashboardProps) {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(initialTab || 'overview');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersList />;
      case 'analytics':
        return <Analytics />;
      case 'parking-spots':
        return <ParkingSpotsList />;
      default:
        return (
          <div className="space-y-6">
            <RevenueStats />
            <Analytics />
          </div>
        );
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'users' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'analytics' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('parking-spots')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'parking-spots' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Parking Spots
            </button>
          </div>
        </div>
        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}