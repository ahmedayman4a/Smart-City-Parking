import React, {useEffect} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import UserDashboardLayout from '../../components/dashboard/UserDashboardLayout';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Navigation, 
  Car, 
  CheckCircle,
  Timer
} from 'lucide-react';

const mockReservation = {
  id: '1',
  spotId: 'A1',
  location: 'Downtown Parking - Block A',
  startTime: '2024-03-15T10:00:00',
  endTime: '2024-03-15T12:00:00',
  status: 'active',
  totalPrice: 15.00,
  coordinates: [51.505, -0.09],
  parkingLot: 'Downtown Central Parking',
  floor: '2nd Floor',
  section: 'B'
};

export default function ReservationDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/reservations');
    }
  }, [state, navigate]);

  if (!state) {
    return null; 
  }

  const reservation = state;

  return (
    <UserDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Parking Details</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${reservation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            <CheckCircle className="h-4 w-4 mr-2" />
            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Info Card */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-3">
                    <Car className="h-6 w-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{reservation.lotName}</h2>
                      <p className="text-sm text-gray-500">Spot {reservation.spotId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${reservation.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Total Price</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-500">{reservation.lotAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Timer className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Duration</p>
                      {
                        (new Date(reservation.end).getTime() - new Date(reservation.start).getTime()) / 1000 / 60 / 60 
                      } Hours
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Date</p>
                      <p className="text-sm text-gray-500">
                        {new Date(reservation.start).toLocaleDateString()} - &nbsp;
                        {new Date(reservation.end).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Time</p>
                      <p className="text-sm text-gray-500">
                        {new Date(reservation.start).toLocaleTimeString()} - &nbsp; 
                        {new Date(reservation.end).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Location</h3>
              <div className="h-64 rounded-lg overflow-hidden">
                <MapContainer center={[reservation.latitude, reservation.longitude]} zoom={15} className="h-full w-full">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={[reservation.latitude, reservation.longitude]}>
                    <Popup>{reservation.lotAddress}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${reservation.latitude},${reservation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                <Navigation className="h-5 w-5 mr-2" />
                Navigate to Parking
              </a>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
}
