package com.amae.smartcityparking.DTO;

import com.amae.smartcityparking.Enum.ParkingSpotStatus;
import lombok.Data;

@Data
public class SensorStatusUpdateRequest {
    private ParkingSpotStatus status;
}
