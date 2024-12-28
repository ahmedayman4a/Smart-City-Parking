package com.amae.smartcityparking.Enum;

public enum ReservationStatus {
    PENDING,    // Reserved but not yet active
    ACTIVE,     // Currently in use
    COMPLETED,  // Finished normally
    MISSED,      // No-show
    CANCELLED;  // Cancelled by user


    public static ReservationStatus fromString(String status) {
        for (ReservationStatus reservationStatus : ReservationStatus.values()) {
            if (reservationStatus.name().equalsIgnoreCase(status)) {
                return reservationStatus;
            }
        }
        throw new IllegalArgumentException("Unknown ReservationStatus: " + status);
    }
}
