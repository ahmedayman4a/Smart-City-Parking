package com.example.smart_city_parking_backend.DTO;

import com.example.smart_city_parking_backend.Enum.Role;
import lombok.*;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private int id;
    private String username;
    private String password;
    private String email;
    private Role role;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String LicensePlateNumber;
    private String carModel;
    private LocalDate birthDate;
}
