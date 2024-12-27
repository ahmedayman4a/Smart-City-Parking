import React, { useEffect, useState } from 'react';
import UserDashboardLayout from '../../components/dashboard/UserDashboardLayout';
import ReservationHistory from '../../components/dashboard/ReservationHistory';
import { getReservations } from '../../api/reservationService';
// import ReservationHistory from '../../components/dashboard/ReservationHistory';

export default function ReservationHistoryPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservations = await getReservations();
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
    <UserDashboardLayout>
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">My Reservations</h1>
          <div className="mt-6 grid grid-cols-1 gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ReservationHistory reservations={reservations} />
            )}
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
}
