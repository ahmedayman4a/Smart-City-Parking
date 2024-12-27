package com.amae.smartcityparking.DTO;

import com.amae.smartcityparking.Enum.ParkingLotType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ParkingLotDTO {
    private String name;
    private String address;
    private int startPrice;
    private int ratePerHour;
    private int penalty;
    private int totalSpaces;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private ParkingLotType type;
}
