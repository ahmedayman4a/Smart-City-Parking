package com.amae.smartcityparking.services;

import com.amae.smartcityparking.Entity.ParkingSpot;
import com.amae.smartcityparking.Enum.Role;
import com.amae.smartcityparking.Service.ParkingSpotService;
import com.amae.smartcityparking.dtos.requests.ReservationRequestDTO;
import com.amae.smartcityparking.dtos.responses.ReservationResponseDTO;
import com.amae.smartcityparking.exception.NoAvailableSpotsException;
import com.amae.smartcityparking.exception.SpotNotAvailableException;
import com.amae.smartcityparking.models.Reservation;
import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.repositories.ReservationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;
import java.time.Duration;
import java.util.Objects;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ParkingSpotService parkingSpotService;
    public ReservationService(ReservationRepository reservationRepository, ParkingSpotService parkingSpotService) {
        this.reservationRepository = reservationRepository;
        this.parkingSpotService = parkingSpotService;
    }

    public List<ReservationResponseDTO> getAll() {
        return reservationRepository.findAll();
    }


    @Transactional
    public Reservation reserveSpot(ReservationRequestDTO requestDTO, User user) {
        // Fetch available spots
        List<ParkingSpot> availableSpots = parkingSpotService.getAvailableSpots(
            requestDTO.getLotId(),
            requestDTO.getStart(),
            requestDTO.getEnd()
        );

        if (availableSpots.isEmpty()) {
            throw new NoAvailableSpotsException("No available parking spots for the selected time range.");
        }

        ParkingSpot spot = availableSpots.getFirst(); // Get the first available spot

        boolean isReserved = reservationRepository.existsBySpotIdAndTimeRange(
            spot.getId(),
            requestDTO.getStart(),
            requestDTO.getEnd()
        );
        if (isReserved) {
            throw new SpotNotAvailableException("Spot is no longer available.");
        }

        Reservation reservation = Reservation.builder()
            .spotId(spot.getId())
            .start(requestDTO.getStart())
            .end(requestDTO.getEnd())
            .paymentMethod(requestDTO.getPaymentMethod())
            .build();

        double amount = priceCalculator(reservation);

        reservation.setAmount(amount);
        reservation.setUserId(user.getId());
        reservation.setSpotId(spot.getId());
        reservation.setStatus("PENDING");

        return reservationRepository.save(reservation);
    }

    public double priceCalculator(Reservation reservation) {
//        ParkingLot parkingLot = parkingLotRepository.findBySpotId(reservation.getSpotId());
//        int pricePerHour = parkingLot.getPrice();
        int pricePerHour = 10;
        double hours = (Duration.between(reservation.getStart(), reservation.getEnd()).toMinutes()) / 60.0;

        int peakStartHour = 8;
        int peakEndHour = 18;
        double peakFactor = 1.5;

        double totalCost = 0.0;
        LocalDateTime start = reservation.getStart();
        LocalDateTime end = reservation.getEnd();

        while (start.isBefore(end)) {
            int currentHour = start.getHour();
            if (currentHour >= peakStartHour && currentHour < peakEndHour) {
                totalCost += pricePerHour * peakFactor;
            } else {
                totalCost += pricePerHour;
            }
            start = start.plusHours(1);
        }

        return totalCost;
    }
    public Reservation updateReservation(Reservation reservation) {
        return null;
    }

    public List<ReservationResponseDTO> getUserReservations(User user) {
        if(user == null) {
            throw new IllegalArgumentException("User not found.");
        }

        if(Objects.equals(user.getRole(), Role.Admin)){
            return reservationRepository.findAll();
        }

        if(Objects.equals(user.getRole(), Role.ParkingManager)){
            return reservationRepository.findByManagerId(user.getId());
        }

        return reservationRepository.findByUserId(user.getId());
    }
}