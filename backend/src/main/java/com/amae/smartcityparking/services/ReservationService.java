package com.amae.smartcityparking.services;

import com.amae.smartcityparking.Entity.ParkingLot;
import com.amae.smartcityparking.Entity.ParkingSpot;
import com.amae.smartcityparking.Enum.Role;
import com.amae.smartcityparking.Repository.ParkingLotRepository;
import com.amae.smartcityparking.Repository.ParkingSpotRepository;
import com.amae.smartcityparking.Repository.UserRepository;
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
    private final ParkingLotRepository parkingLotRepository;
    private final ParkingSpotRepository parkingSpotRepository;
    private final UserRepository userRepository;

    public ReservationService(ReservationRepository reservationRepository, ParkingSpotService parkingSpotService, ParkingLotRepository parkingLotRepository, ParkingSpotRepository parkingSpotRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.parkingSpotService = parkingSpotService;
        this.parkingLotRepository = parkingLotRepository;
        this.parkingSpotRepository = parkingSpotRepository;
        this.userRepository = userRepository;
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

        ParkingSpot spot = availableSpots.get(0); // Get the first available spot

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
        int lot_id = parkingSpotRepository.getParkingSpotById(reservation.getSpotId()).get().getLotId();
        ParkingLot parkingLot = parkingLotRepository.getParkingLotById(lot_id).get();
        float pricePerHour = parkingLot.getStartPrice();
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

    public void cancelReservation(int id, User user) {
        ReservationResponseDTO reservation = reservationRepository.findByIdWithPenalty(id);
        if (reservation == null) {
            throw new IllegalArgumentException("Reservation not found.");
        }

        if (reservation.getUserId() != user.getId()) {
            throw new IllegalArgumentException("You are not authorized to cancel this reservation.");
        }
        if (reservation.getStatus().equals("CANCELLED")) {
            throw new IllegalArgumentException("Reservation already cancelled.");
        }

        reservationRepository.updateStatus(id, "CANCELLED");
        applyPenalty(reservation);
    }

    public void updateStatus(int id, String status) {
        if (status == null || status.isEmpty()) {
            throw new IllegalArgumentException("Status cannot be null or empty.");
        }
        reservationRepository.updateStatus(id, status);
    }

    private void validateReservation(ReservationResponseDTO reservation, String requiredStatus) {
        if (reservation == null) {
            throw new IllegalArgumentException("Reservation not found.");
        }
        if (!reservation.getStatus().equals(requiredStatus)) {
            throw new IllegalArgumentException(String.format("Reservation is not in %s status.", requiredStatus));
        }
    }

    public void applyPenalty(ReservationResponseDTO reservation) {
        validateReservation(reservation, "PENDING");

        User user = userRepository.findById(reservation.getUserId());
        if (user == null) {
            throw new IllegalArgumentException("User not found.");
        }

        double penalty = reservation.getPenalty();
        if (penalty > 0) {
            user.setBalance(user.getBalance() - penalty);
            userRepository.update(user); // Persist balance update
        }
    }

    public void bulkMissedReservations(int spotId) {
        List<ReservationResponseDTO> reservations = reservationRepository.findBySpotIdStatusEndTime(
            spotId, "PENDING", LocalDateTime.now()
        );

        if (reservations.isEmpty()) {
            return; // No pending reservations, nothing to update
        }

        for (ReservationResponseDTO reservation : reservations) {
            updateStatus(reservation.getId(), "MISSED");
            applyPenalty(reservation);
        }
    }

    public void cancelReservation(ReservationResponseDTO reservation) {
        validateReservation(reservation, "PENDING");

        updateStatus(reservation.getId(), "CANCELLED");

        // No penalty for normal users upon cancellation
        User user = userRepository.findById(reservation.getUserId());
        if (user != null && reservation.getPenalty() > 0) {
            // Refund the penalty amount if already deducted (optional logic)
            user.setBalance(user.getBalance() + reservation.getPenalty());
            userRepository.update(user);
        }
    }

}
