import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Car,
  Clock,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  User,
  History
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Find Parking', icon: Car, href: '/find-parking' },
  { name: 'My Reservations', icon: Clock, href: '/reservations' },
  { name: 'Payment Methods', icon: CreditCard, href: '/payments' },
  { name: 'History', icon: History, href: '/history' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64">
          <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ParkWise</span>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500">User Account</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="mt-4 w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              >
                <LogOut className="mr-3 h-6 w-6" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          {/* Top navigation */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <div className="flex-1 px-4 flex justify-end">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}