package com.amae.smartcityparking.DTO;

import com.amae.smartcityparking.Enum.ParkingSpotStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ParkingSpotDTO {
    private int lotId;
    private ParkingSpotStatus status;
    private int spotNumber;
}
