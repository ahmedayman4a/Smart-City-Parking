
// Parking facility form props
export interface ParkingFacilityFormProps {
  managerId: string; // Manager ID to link the facility
}

// User type for roles and user information
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Driver' | 'Admin' | 'ParkingManager';
}

// Parking spot details
export interface ParkingSpot {
  id: string;
  type: 'regular' | 'ev' | 'disabled';
  status: 'available' | 'occupied' | 'reserved';
  price: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

// Reservation details
export interface Reservation {
  id: string;
  userId: string;
  spotId: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

// Notifications for users
export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}