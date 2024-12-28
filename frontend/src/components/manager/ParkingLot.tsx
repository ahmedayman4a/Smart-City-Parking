import { useEffect, useState } from "react";
import { Car, Battery, AlertCircle } from "lucide-react";
import apiClient from "../../api/apiClient";

interface ParkingLotData {
  id: string;
  name: string;
  type: string;
  capacity: number; // Ensure this is consistent with the ManagerDashboard component
}

interface ParkingSpot {
  id: string;
  spotNumber: number;
  status: string; // e.g., "available", "occupied", "reserved"
}

export default function ParkingLotStatus({
  parkingLotData,
}: {
  parkingLotData: ParkingLotData;
}) {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await apiClient.get<{ parkingSpots: ParkingSpot[] }>(
          `/parkingLot/${parkingLotData.id}/spots/all`
        );
        setParkingSpots(response.data.parkingSpots);
      } catch (error) {
        console.error("Error fetching parking spots:", error);
        setParkingSpots([]); // Fallback in case of an error
      }
    };

    if (parkingLotData?.id !== undefined) {
      fetchParkingSpots();
    }
  }, [parkingLotData]);

  const getSpotIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "electric":
        return <Battery className="h-6 w-6" />;
      case "handicap":
        return <AlertCircle className="h-6 w-6" />;
      case "standard":
        return <Car className="h-6 w-6" />;
      default:
        return <Car className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-red-100 text-red-800";
      case "reserved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {parkingLotData.name}
        </h2>
        <p className="text-sm text-gray-600">
          Type: <span className="font-medium">{parkingLotData.type}</span>
        </p>
        <p className="text-sm text-gray-600">
          Capacity:{" "}
          <span className="font-medium">{parkingLotData.capacity}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {parkingSpots.length > 0 ? (
          parkingSpots.map((spot) => (
            <div
              key={spot.id}
              className="border rounded-lg p-4 flex flex-col items-center"
            >
              <div className="text-gray-500 mb-2">
                {getSpotIcon(spot.status)}
              </div>
              <div className="text-lg font-medium text-gray-900 mb-2">
                Spot {spot.spotNumber}
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  spot.status
                )}`}
              >
                {spot.status.charAt(0).toUpperCase() +
                  spot.status.slice(1).toLowerCase()}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No parking spots available.
          </div>
        )}
      </div>
    </div>
  );
}
