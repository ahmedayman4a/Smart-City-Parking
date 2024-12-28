package com.amae.smartcityparking.Enum;

public enum ParkingLotType {
    STANDARD,
    HANDICAP,
    ELECTRIC;

    public static ParkingLotType fromString(String type) {
        for (ParkingLotType parkingLotType : ParkingLotType.values()) {
            if (parkingLotType.name().equalsIgnoreCase(type)) {
                return parkingLotType;
            }
        }
        throw new IllegalArgumentException("Unknown ParkingLotType: " + type);
    }
}