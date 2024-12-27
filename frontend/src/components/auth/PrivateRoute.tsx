import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: 'Driver' | 'Admin' | 'ParkingManager';
}

export default function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    switch (user?.role) {
      case 'Admin':
        return <Navigate to="/admin/dashboard" />;
      case 'ParkingManager':
        return <Navigate to="/manager/dashboard" />;
      default:
        return <Navigate to="/dashboard" />;
    }
  }

  return <>{children}</>;
}