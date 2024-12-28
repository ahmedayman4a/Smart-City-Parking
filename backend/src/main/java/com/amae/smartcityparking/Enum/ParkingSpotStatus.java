package com.amae.smartcityparking.Enum;

public enum ParkingSpotStatus {
    OCCUPIED,
    RESERVED,
    AVAILABLE;


    public static ParkingSpotStatus fromString(String status) {
        for (ParkingSpotStatus parkingSpotStatus : ParkingSpotStatus.values()) {
            if (parkingSpotStatus.name().equalsIgnoreCase(status)) {
                return parkingSpotStatus;
            }
        }
        throw new IllegalArgumentException("Unknown ParkingSpotStatus: " + status);
    }
}
