package com.amae.smartcityparking.DTO;

import com.amae.smartcityparking.Entity.Reservation;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReservationResponseDTO {
    private int id;
    private int userId;
    private int spotId;
    private double amount;
    private String paymentMethod;
    private String status;
    private String lotName;
    private String lotAddress;
    private int spotNumber;
    private String username;
    private String start;
    private String end;
    private double latitude;
    private double longitude;
    private int penalty;

    public static ReservationResponseDTO from(Reservation reservation) {
        return ReservationResponseDTO.builder()
                .userId(reservation.getUserId())
                .spotId(reservation.getSpotId())
                .amount(reservation.getAmount())
                .paymentMethod(reservation.getPaymentMethod())
                .start(reservation.getStart().toString())
                .end(reservation.getEnd().toString())
                .build();
    }

    public static List<ReservationResponseDTO> from(List<Reservation> reservations) {
        return reservations.stream().map(ReservationResponseDTO::from).toList();
    }

}
