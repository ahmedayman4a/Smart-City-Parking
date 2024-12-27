package com.amae.smartcityparking.Entity;

import com.amae.smartcityparking.Enum.ParkingSpotStatus;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@SuperBuilder
public class ParkingSpot {
    private int id;
    private int lotId;
    private ParkingSpotStatus status;
    private int spotNumber;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}