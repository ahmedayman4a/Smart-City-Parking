package com.amae.smartcityparking.DTO;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data

public class LoginRequestDto {
    String email;
    String password;
}
