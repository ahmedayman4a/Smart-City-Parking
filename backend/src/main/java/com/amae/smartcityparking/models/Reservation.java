package com.amae.smartcityparking.models;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Reservation {
    private int id;
    private int userId;
    private int spotId;
    private double amount;
    private String paymentMethod;
    private LocalDateTime start;
    private LocalDateTime end;
    private String status;

}
