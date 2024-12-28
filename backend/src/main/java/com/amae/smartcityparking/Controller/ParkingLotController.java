package com.amae.smartcityparking.Controller;


import com.amae.smartcityparking.DTO.ParkingLotDTO;

import com.amae.smartcityparking.Service.ParkingLotService;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parkingLot")
@Getter
@CrossOrigin
public class ParkingLotController {

    private final ParkingLotService parkingLotService;

    public ParkingLotController(ParkingLotService parkingLotService) {
        this.parkingLotService = parkingLotService;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> parkingLotCreation(@RequestBody ParkingLotDTO dto, @AuthenticationPrincipal UserDetails token) {
        return parkingLotService.createParkingLot(dto, token);
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<Object> parkingLotProfile(@PathVariable int id, @AuthenticationPrincipal UserDetails token) {
        return parkingLotService.getParkingLot(id, token);
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<Object> parkingLotUpdate(@PathVariable int id, @AuthenticationPrincipal UserDetails token, @RequestBody ParkingLotDTO dto) {
        return parkingLotService.updateParkingLot(dto, id, token);
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getAllParkingLots(@RequestParam(value = "address", required = false) String address) {
        return parkingLotService.getAllParkingLots(address);
    }

    @GetMapping("/user_all")
    public ResponseEntity<Object> getAllUserParkingLots(@AuthenticationPrincipal UserDetails token) {
        return parkingLotService.getParkingLotsByUserId(token);
    }
}
