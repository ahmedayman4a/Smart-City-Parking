package com.amae.smartcityparking.Entity;

import com.amae.smartcityparking.Enum.ParkingLotType;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@SuperBuilder
public class ParkingLot {
    private int id;
    private int ownerId;
    private String name;
    private String address;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private int startPrice;
    private int ratePerHour;
    private int penalty;
    private int totalSpaces;
    private int currentOccupancy;
    private ParkingLotType type;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}