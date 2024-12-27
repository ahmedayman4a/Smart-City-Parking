package com.amae.smartcityparking.Controller;

import com.amae.smartcityparking.DTO.ParkingSpotDTO;
import com.amae.smartcityparking.Service.ParkingSpotService;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parkingLot/{lotId}/spots")
@Getter
@CrossOrigin
public class ParkingSpotController {
    private final ParkingSpotService parkingSpotService;

    public ParkingSpotController(ParkingSpotService parkingSpotService) {
        this.parkingSpotService = parkingSpotService;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> parkingSpotCreation(@PathVariable("lotId") int lotId, @RequestBody ParkingSpotDTO dto, @AuthenticationPrincipal UserDetails token) {
        dto.setLotId(lotId);
        return parkingSpotService.createParkingSpot(dto, token);
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<Object> parkingSpotProfile(@PathVariable("lotId") int lotId, @PathVariable("id") int id, @AuthenticationPrincipal UserDetails token) {
        return parkingSpotService.getParkingSpot(id, token);
    }


    @PutMapping("/{id}/profile")
    public ResponseEntity<Object> parkingSpotUpdate(@PathVariable("lotId") int lotId, @PathVariable("id") int id, @AuthenticationPrincipal UserDetails token, @RequestBody ParkingSpotDTO dto) {
        dto.setLotId(lotId);
        return parkingSpotService.updateParkingSpot(dto, id, token);
    }
}
