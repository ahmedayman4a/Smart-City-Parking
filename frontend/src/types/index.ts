export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'system_admin';
}

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

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}