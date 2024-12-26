package com.example.smart_city_parking_backend.DTO;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data

public class LoginRequestDto {
    String email;
    String password;
}
