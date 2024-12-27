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
    private String name;
    private String address;
    private int ownerId;
    private int startPrice;
    private int ratePerHour;
    private int penalty;
    private int totalSpaces;
    private int currentOccupancy;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private ParkingLotType type;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}