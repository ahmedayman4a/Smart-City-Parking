package com.example.smart_city_parking_backend.Service;


import com.example.smart_city_parking_backend.DTO.UserDTO;
import com.example.smart_city_parking_backend.Entity.Driver;
import com.example.smart_city_parking_backend.Enum.Role;
import com.example.smart_city_parking_backend.Enum.Status;
import com.example.smart_city_parking_backend.Repository.DriverRepository;
import com.example.smart_city_parking_backend.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor

public class SignUpService {

    private final UserRepository userRepository;
    private final DriverRepository driverRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<Object> driverSignUp(UserDTO userDTO) {
        try {
            saveDriver(userDTO);
            return ResponseEntity.ok("Driver registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Driver registration failed");
        }
    }


    //Synchronized method to save a driver so that only one thread can access it at a time
    @Transactional
    public synchronized String saveDriver(UserDTO userDTO) {
        Driver driver = Driver.builder()
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .username(userDTO.getUsername())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .phone(userDTO.getPhoneNumber())
                .licensePlateNumber(userDTO.getLicensePlateNumber())
                .carModel(userDTO.getCarModel())
                .createdAt(LocalDateTime.now())
                .dateOfBirth(userDTO.getBirthDate())
                .age(LocalDate.now().getYear() - userDTO.getBirthDate().getYear())
                .role(Role.Driver)
                .status(Status.ACTIVE)
                .build();
        driverRepository.saveDriver(driver);
        Map<String,Object> extractClaims = Map.of(
                "username", userDTO.getUsername(),
                "role", "DRIVER",
                "email", userDTO.getEmail()
        );
        String token = jwtService.generateToken(extractClaims, driver);
        return token;


    }
}
