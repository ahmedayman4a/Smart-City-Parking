import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import DriverSignup from './pages/auth/DriverSignup';
import ManagerSignup from './pages/auth/ManagerSignup';
import UserDashboard from './pages/user/Dashboard';
import UserReservations from './pages/user/Reservations';
import AdminDashboard from './pages/admin/Dashboard';
import ManagerDashboard from './pages/manager/Dashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import ReservationHistoryPage from './pages/user/ReservationHistory';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup/driver" element={<DriverSignup />} />
        <Route path="/signup/manager" element={<ManagerSignup />} />
        
        {/* User Routes */}
        <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/reservations" element={<PrivateRoute><UserReservations /></PrivateRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

        {/* Manager Routes */}
        <Route path="/manager/*" element={<PrivateRoute><ManagerDashboard /></PrivateRoute>} />
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;