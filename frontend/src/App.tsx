import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import DriverSignup from './pages/auth/DriverSignup';
import ManagerSignup from './pages/auth/ManagerSignup';
import UserDashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import ManagerDashboard from './pages/manager/Dashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import ReservationHistoryPage from './pages/user/ReservationHistory';
import ReservationDetails from './pages/user/ReservationDetails';
import ManagerReservations from './pages/manager/Reservations';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup/driver" element={<DriverSignup />} />
        <Route path="/signup/manager" element={<ManagerSignup />} />

        {/* User Routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute redirectPath="/dashboard"><UserDashboard /></PrivateRoute>}
        />
        <Route
          path="/reservations"
          element={<PrivateRoute redirectPath="/reservations"><ReservationHistoryPage /></PrivateRoute>}
        />
        <Route
          path="/reservation-details/:id"
          element={<PrivateRoute redirectPath="/reservation-details"><ReservationDetails /></PrivateRoute>}
        />
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={<PrivateRoute requiredRole="Admin" redirectPath="/admin/dashboard"><AdminDashboard /></PrivateRoute>}
        />

        {/* Manager Routes */}
        <Route
          path="/manager/dashboard"
          element={<PrivateRoute requiredRole="ParkingManager" redirectPath="/manager/dashboard"><ManagerDashboard /></PrivateRoute>}
        />
        <Route
          path="/manager/reservations"
          element={<PrivateRoute requiredRole="ParkingManager" redirectPath="/manager/reservations"><ManagerReservations /></PrivateRoute>}
        />
        <Route
          path="/manager/*"
          element={<PrivateRoute requiredRole="ParkingManager" redirectPath="/manager/dashboard"><ManagerDashboard /></PrivateRoute>}
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;