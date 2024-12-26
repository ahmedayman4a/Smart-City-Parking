import React from 'react';
import { User, Mail, Building, MapPin, Phone, Shield } from 'lucide-react';

export default function Profile() {
  const adminProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'ParkWise Solutions',
    role: 'Parking Lot Administrator',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: 'March 2024',
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Admin Profile</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account information and settings
            </p>
          </div>

          {/* Profile Content */}
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-8">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">{adminProfile.name}</h2>
                <p className="text-sm text-gray-500">{adminProfile.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{adminProfile.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p className="text-sm text-gray-900">{adminProfile.company}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{adminProfile.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-sm text-gray-900">{adminProfile.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="text-sm text-gray-900">{adminProfile.joinDate}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Edit Profile
              </button>
              <button className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}