import { useEffect, useState } from "react";
import ManagerDashboardLayout from "../../components/dashboard/ManagerDashboardLayout";
import ParkingLotStatus from "../../components/manager/ParkingLot";
import LotStatistics from "../../components/manager/LotStatistics";
import apiClient from "../../api/apiClient";

interface ParkingLot {
  id: string;
  name: string;
  address: string;
  ratePerHour: number;
  type: string;
  totalSpaces: number;
  capacity: number; // Added capacity to align with ParkingLotStatus
}

export default function ManagerDashboard() {
  const [activeView, setActiveView] = useState<
    "lot" | "reservations" | "statistics"
  >("lot");

  const [parkingLotsData, setParkingLotData] = useState<ParkingLot[]>([]);

  useEffect(() => {
    const fetchParkingLotData = async () => {
      const response = await apiClient.get(`/parkingLot/user_all`);
      setParkingLotData(response.data.items);
    };

    fetchParkingLotData();
  }, []);

  return (
    <ManagerDashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Parking Manager Dashboard
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveView("lot")}
              className={`px-4 py-2 rounded-md ${
                activeView === "lot"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Parking Lot
            </button>
            <button
              onClick={() => setActiveView("statistics")}
              className={`px-4 py-2 rounded-md ${
                activeView === "statistics"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Statistics
            </button>
          </div>
        </div>

        <div className="mt-6">
          {activeView === "lot" &&
            parkingLotsData.map((lot) => (
              <ParkingLotStatus key={lot.id} parkingLotData={lot} />
            ))}
          {activeView === "statistics" && <LotStatistics />}
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}
