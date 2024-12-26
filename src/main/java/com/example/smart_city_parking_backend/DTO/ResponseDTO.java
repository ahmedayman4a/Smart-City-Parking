package com.example.smart_city_parking_backend.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseDTO {
    private String message;
    private int statusCode;
    private Object data;
    private boolean success;

}
