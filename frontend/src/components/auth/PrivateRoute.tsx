import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: 'Driver' | 'Admin' | 'ParkingManager';
  redirectPath?: string; // New prop for dynamic redirection
}

export default function PrivateRoute({ children, requiredRole, redirectPath = '/dashboard' }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  console.log('Redirect Path:', redirectPath);
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on the role or fallback to the given redirectPath
    switch (user?.role) {
      case 'Admin':
        return <Navigate to={redirectPath} />;
      case 'ParkingManager':
        return <Navigate to={redirectPath} />;
      default:
        return <Navigate to={redirectPath} />;
    }
  }

  return <>{children}</>;
}