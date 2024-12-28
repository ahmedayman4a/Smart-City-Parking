package com.amae.smartcityparking.Controller;

import com.amae.smartcityparking.DTO.SensorStatusUpdateRequest;
import com.amae.smartcityparking.Service.ParkingSpotService;
import com.amae.smartcityparking.Service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sensors")
public class ParkingSensorController {
    private final ParkingSpotService spotService;
    private final ReservationService reservationService;

    public ParkingSensorController(ParkingSpotService spotService, ReservationService reservationService) {
        this.spotService = spotService;
        this.reservationService = reservationService;
    }

    @PutMapping("/{spotId}/status")
    public ResponseEntity<Object> updateSensorStatus(
            @PathVariable int spotId,
            @RequestBody SensorStatusUpdateRequest request) {
        return spotService.updateParkingSpotStatus(request.getStatus(), spotId);
    }
}
