import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ManagerDashboardLayout from '../../components/dashboard/ManagerDashboardLayout';
import ParkingLotStatus from '../../components/manager/ParkingLot';
import ReservationsList from '../../components/manager/ReservationsList';
import LotStatistics from '../../components/manager/LotStatistics';
import { getReservations } from '../../api/reservationService';

export default function ManagerDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservations = await getReservations();
        console.log('Reservations:', reservations);
        setReservations(reservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);
        

    return (
    <ManagerDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Parking Manager Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveView('lot')}
              className={`px-4 py-2 rounded-md ${
                activeView === 'lot' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Parking Lot
            </button>
            <button
              onClick={() => setActiveView('reservations')}
              className={`px-4 py-2 rounded-md ${
                activeView === 'reservations' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Reservations
            </button>
            <button
              onClick={() => setActiveView('statistics')}
              className={`px-4 py-2 rounded-md ${
                activeView === 'statistics' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Statistics
            </button>
          </div>
        </div>
 */}
        <div className="mt-6">
            <ReservationsList reservations={reservations} />
          {/* {activeView === 'lot' && <ParkingLotStatus />} */}
          {/* {activeView === 'reservations' && <ReservationsList />} */}
          {/* {activeView === 'statistics' && <LotStatistics />} */}
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}