package com.amae.smartcityparking.controllers;

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

    @GetMapping("/")
    public List<ReservationResponseDTO> index() {
        List<Reservation> reservations = reservationService.getUserReservations(1);
        return ReservationResponseDTO.from(reservations);
    }

    @PostMapping("/")
    public Reservation store(@RequestBody ReservationRequestDTO requestDTO, @AuthenticationPrincipal UserDetails userDetails) {
        Reservation reservation = new Reservation();
        // reservation.setUserId(userDetails.getUsername());
        reservation.setSpotId(requestDTO.getSpotId());
        reservation.setAmount(requestDTO.getAmount());
        reservation.setPaymentMethod(requestDTO.getPaymentMethod());
        reservation.setStart(LocalDateTime.parse(requestDTO.getStart()));
        reservation.setEnd(LocalDateTime.parse(requestDTO.getEnd()));
        reservation.setStatus("PENDING"); // Default status

        reservationService.reserveSpot(reservation);

        return reservation;
    }

//    @PutMapping("/{id}")
//    public String update(@PathVariable int id, @RequestBody ReservationRequestDTO requestDTO) {
//        Reservation reservation = new Reservation();
//        reservation.setId(id);
//
//        reservationService.updateReservation(requestDTO);
//        return "Reservation updated";
//    }
}
