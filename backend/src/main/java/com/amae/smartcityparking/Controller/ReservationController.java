package com.amae.smartcityparking.Controller;

import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.DTO.ReservationRequestDTO;
import com.amae.smartcityparking.DTO.ReservationResponseDTO;
import com.amae.smartcityparking.Entity.Reservation;
import com.amae.smartcityparking.Service.ReservationService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/all")
    public List<ReservationResponseDTO> all() {
        return reservationService.getAll();
    }


    @GetMapping("/")
    public List<ReservationResponseDTO> allReservations(@AuthenticationPrincipal UserDetails userDetails) {
        return reservationService.getUserReservations((User) userDetails);
    }

    @PostMapping("/reserve")
    public Reservation reserve(@RequestBody ReservationRequestDTO requestDTO, @AuthenticationPrincipal UserDetails userDetails) {
        return reservationService.reserveSpot(requestDTO, (User) userDetails);
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<Object> cancel(@PathVariable int id, @AuthenticationPrincipal UserDetails userDetails) {
        reservationService.cancelReservation(id, (User) userDetails);
        return ResponseEntity.ok("Reservation cancelled successfully");

    }

}
