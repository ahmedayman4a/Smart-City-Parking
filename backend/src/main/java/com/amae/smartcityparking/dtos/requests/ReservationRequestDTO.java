package com.amae.smartcityparking.dtos.requests;

import lombok.Data;

@Data
public class ReservationRequestDTO {
    private int id;
    private int userId;
    private int spotId;
    private int lotId;
    private double amount;
    private String paymentMethod;
    private String start;
    private String end;
}
