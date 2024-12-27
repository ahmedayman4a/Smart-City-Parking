package com.amae.smartcityparking.dtos.requests;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationRequestDTO {
//    private int id;
//    private int userId;
//    private int spotId;
    private int lotId;
//    private double amount;
    private String paymentMethod;
    private LocalDateTime start;
    private LocalDateTime end;
}