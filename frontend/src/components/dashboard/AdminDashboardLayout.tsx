import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ParkingCircle,
  Users,
  Settings,
  Bell,
  LogOut,
  User,
  BarChart3,
  FileText
} from 'lucide-react';
import { NotificationButton } from '../NotificationButton';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { name: 'Parking Spots', icon: ParkingCircle, href: '/admin/parking-spots' },
  { name: 'Users', icon: Users, href: '/admin/users' },
  { name: 'Reports', icon: FileText, href: '/admin/reports' },
  { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64">
          <div className="flex flex-col flex-grow pt-5 bg-blue-800 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <ParkingCircle className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">ParkWise Admin</span>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-white ${
                      location.pathname === item.href ? 'bg-blue-700' : 'hover:bg-blue-700'
                    }`}
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-blue-200">Administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-blue-700"
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
            <div className="flex-1 px-4 flex justify-between items-center">
              <div className="flex-1 flex justify-center">
                <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <NotificationButton />
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