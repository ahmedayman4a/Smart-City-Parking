package com.amae.smartcityparking.services;

import com.amae.smartcityparking.models.Reservation;
import com.amae.smartcityparking.models.User;
import com.amae.smartcityparking.repositories.ReservationRepository;
import com.amae.smartcityparking.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.time.Duration;
import java.util.Objects;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
        public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getAvailableSpots() {
        return null;
    }

    public Reservation reserveSpot(Reservation reservation){
        // TODO: Depend on the parking slot component
//        boolean isValidSpot = parkingSlotRepository.isSpotAvailable(reservation.getSpotId());
        boolean isValidSpot = true;
        if(!isValidSpot) {
            throw new IllegalArgumentException("Invalid or non-existent parking spot.");
        }

        boolean isAlreadyReserved = reservationRepository.isSpotReserved(reservation.getSpotId(), reservation.getStart(), reservation.getEnd());

        if(isAlreadyReserved) {
            throw new IllegalArgumentException("Parking spot is already reserved.");
        }

        double amount = priceCalculator(reservation);
        reservation.setAmount(amount);

        return reservationRepository.save(reservation);
    }

    public double priceCalculator(Reservation reservation) {
        ParkingLot parkingLot = parkingLotRepository.findBySpotId(reservation.getSpotId());
        int pricePerHour = parkingLot.getPrice();
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

    public List<Reservation> getUserReservations(int userId) {
        User user = UserRepository.findById(userId);
        if(user == null) {
            throw new IllegalArgumentException("User not found.");
        }

        if(Objects.equals(user.getRole(), "ADMIN")) {
            return reservationRepository.findAll();
        }

        if(Objects.equals(user.getRole(), "MANAGER")) {
            return reservationRepository.findByManagerId(userId);
        }

        return reservationRepository.findByUserId(userId);
    }
}
