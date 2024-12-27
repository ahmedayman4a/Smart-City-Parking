package com.amae.smartcityparking.DTO;


import com.amae.smartcityparking.Enum.Role;
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
