package com.amae.smartcityparking.controllers;

import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.dtos.requests.ReservationRequestDTO;
import com.amae.smartcityparking.dtos.responses.ReservationResponseDTO;
import com.amae.smartcityparking.models.Reservation;
import com.amae.smartcityparking.services.ReservationService;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
        Reservation reservation = Reservation.builder()
                        .spotId(requestDTO.getLotId())
                        .start(LocalDateTime.parse(requestDTO.getStart()))
                        .end(LocalDateTime.parse(requestDTO.getEnd()))
                        .paymentMethod(requestDTO.getPaymentMethod())
                        .build();
        reservationService.reserveSpot(reservation, (User) userDetails);
        return reservation;
    }

}
