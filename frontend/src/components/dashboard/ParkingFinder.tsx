import { useState, useEffect } from "react";
import { Search, MapPin, List, Map as MapIcon } from "lucide-react";
import ParkingMap from "../map/ParkingMap";
import type { ParkingSpot } from "../../types";
import { reserveSpot } from "../../api/reservationService";
import apiClient from "../../api/apiClient";
import LoadingSpinner from "./LoadingSpinner";
import ReservationModal from "./ReservationModal";

export default function ParkingFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("map");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const SPOTSPERPAGE = 6;

  const fetchParkingSpots = async (query = "") => {
    setLoading(true);
    try {
      const response = await apiClient.get("/parkingLot/all", {
        params: query ? { address: query } : {},
      });
      setParkingSpots(response.data.items);
    } catch (error) {
      console.error("Error fetching parking spots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  const handleSearch = () => {
    fetchParkingSpots(searchQuery);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
    fetchParkingSpots();
  };

  const totalPages = Math.ceil(parkingSpots.length / SPOTSPERPAGE);
  const displayedSpots = parkingSpots.slice(
    (currentPage - 1) * SPOTSPERPAGE,
    currentPage * SPOTSPERPAGE
  );

  // Modal Logic
  const openModal = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSpot(null);
  };

  const handleReserve = async ({
    startTime,
    endTime,
    paymentMethod,
  }: {
    startTime: string;
    endTime: string;
    paymentMethod: string;
  }) => {
    if (selectedSpot) {
      const reservation = {
        lotId: selectedSpot.id,
        start: new Date(startTime),
        end: new Date(endTime),
        paymentMethod,
      };
      console.log(reservation);
      try {
        await reserveSpot(reservation);
        closeModal();
      } catch (error) {
        console.error("Failed to reserve spot:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search by address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className={`px-4 py-2 ${
                  loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded-md`}
              >
                {loading ? "Loading..." : "Search"}
              </button>
              <button
                onClick={handleReset}
                disabled={loading}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Reset
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("list")}
                className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md ${
                  viewMode === "list"
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                <List className="h-5 w-5 mr-2" />
                List
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md ${
                  viewMode === "map"
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                <MapIcon className="h-5 w-5 mr-2" />
                Map
              </button>
            </div>

            {viewMode === "map" ? (
              <div className="mt-4">
                <ParkingMap spots={parkingSpots} />
              </div>
            ) : (
              <div>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {displayedSpots.map((spot) => (
                      <div
                        key={spot.id}
                        className="relative rounded-lg bg-white px-6 py-5 flex flex-col space-y-3 hover:border-gray-400"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <MapPin className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {spot.address}
                            </p>
                            <p className="text-sm text-gray-500">
                              {spot.type.charAt(0).toUpperCase() +
                                spot.type.slice(1)}{" "}
                              Spot
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            ${spot.ratePerHour.toFixed(2)}/hr
                          </span>
                          <button
                            onClick={() => openModal(spot)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                          >
                            Reserve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                <div className="mt-4 flex justify-center space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReservationModal
        isOpen={modalOpen}
        onClose={closeModal}
        spot={selectedSpot}
        onReserve={handleReserve}
      />
    </div>
  );
}
