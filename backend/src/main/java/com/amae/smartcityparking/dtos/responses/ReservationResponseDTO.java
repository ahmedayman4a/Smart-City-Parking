package com.amae.smartcityparking.dtos.responses;

import com.amae.smartcityparking.models.Reservation;
import lombok.Data;

import java.util.List;

@Data
public class ReservationResponseDTO {
    private int userId;
    private int spotId;
    private double amount;
    private String paymentMethod;
    private String start;
    private String end;

    public static ReservationResponseDTO from(Reservation reservation) {
        ReservationResponseDTO reservationResponseDTO = new ReservationResponseDTO();
        reservationResponseDTO.setUserId(reservation.getUserId());
        reservationResponseDTO.setSpotId(reservation.getSpotId());
        reservationResponseDTO.setAmount(reservation.getAmount());
        reservationResponseDTO.setPaymentMethod(reservation.getPaymentMethod());
        reservationResponseDTO.setStart(reservation.getStart().toString());
        reservationResponseDTO.setEnd(reservation.getEnd().toString());
        return reservationResponseDTO;
    }

    public static List<ReservationResponseDTO> from(List<Reservation> reservations) {
        return reservations.stream().map(ReservationResponseDTO::from).toList();
    }

}
