package com.example.smart_city_parking_backend.Service;


import com.example.smart_city_parking_backend.DTO.AuthenticationResponse;
import com.example.smart_city_parking_backend.DTO.ResponseDTO;
import com.example.smart_city_parking_backend.DTO.UserDTO;
import com.example.smart_city_parking_backend.Entity.Driver;
import com.example.smart_city_parking_backend.Entity.ParkingManager;
import com.example.smart_city_parking_backend.Entity.User;
import com.example.smart_city_parking_backend.Enum.Role;
import com.example.smart_city_parking_backend.Enum.Status;
import com.example.smart_city_parking_backend.Repository.DriverRepository;
import com.example.smart_city_parking_backend.Repository.ParkingManagerRepository;
import com.example.smart_city_parking_backend.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    private final ParkingManagerRepository parkingManagerRepository;

    public ResponseEntity<Object> driverSignUp(UserDTO userDTO) {
        try {
            saveDriver(userDTO);
            return ResponseEntity.ok("Driver registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Driver registration failed");
        }
    }

    public ResponseEntity<Object> parkingManagerSignUp(UserDTO userDTO) {
        try {
            saveParkingManager(userDTO);
            return ResponseEntity.ok(ResponseDTO.builder().message("Parking Manager registered successfully").success(true).statusCode(200).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.builder().message("Parking Manager registration failed").success(false).statusCode(400).build());
        }

    }
    public ResponseEntity<Object> adminSignUp(UserDTO request) {
        try {
            saveAdmin(request);
            return ResponseEntity.ok(ResponseDTO.builder().message("Admin registered successfully").success(true).statusCode(200).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.builder().message("Admin registration failed").success(false).statusCode(400).build());
        }
    }

    public ResponseEntity<Object> refreshToken(AuthenticationResponse token) {
        try {
            String email = jwtService.extractEmailToken(token.getToken());
            User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
            Map<String, Object> claims = Map.of(
                    "username", user.getUsername(),
                    "role", user.getRole().toString(),
                    "email", user.getEmail()
            );
            return ResponseEntity.ok().body(ResponseDTO.builder().data(jwtService.generateToken(claims, user)).message("Token refresh successful").success(true).statusCode(200).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseDTO.builder().data(null).message("Token refresh failed").success(false).statusCode(404).build());
        }
    }

    //Synchronized method to save a driver so that only one thread can access it at a time
    @Transactional
    public synchronized void saveDriver(UserDTO userDTO) {
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
//        Map<String,Object> extractClaims = Map.of(
//                "username", userDTO.getUsername(),
//                "role", "DRIVER",
//                "email", userDTO.getEmail()
//        );
//        String token = jwtService.generateToken(extractClaims, driver);
    }



    @Transactional
    public synchronized void saveParkingManager(UserDTO userDTO) {
        User manager = User.builder()
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .username(userDTO.getUsername())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .phone(userDTO.getPhoneNumber())
                .createdAt(LocalDateTime.now())
                .dateOfBirth(userDTO.getBirthDate())
                .age(LocalDate.now().getYear() - userDTO.getBirthDate().getYear())
                .role(Role.ParkingManager)
                .status(Status.ACTIVE)
                .build();
        parkingManagerRepository.save(manager);
//        Map<String,Object> extractClaims = Map.of(
//                "username", userDTO.getUsername(),
//                "role", "PARKING_MANAGER",
//                "email", userDTO.getEmail()
//        );
//        return jwtService.generateToken(extractClaims, driver);
    }





    @Transactional
    public synchronized void saveAdmin(UserDTO request) {
        User admin = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .username(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhoneNumber())
                .createdAt(LocalDateTime.now())
                .dateOfBirth(request.getBirthDate())
                .age(LocalDate.now().getYear() - request.getBirthDate().getYear())
                .role(Role.Admin)
                .status(Status.ACTIVE)
                .build();
        userRepository.save(admin);
//        Map<String,Object> extractClaims = Map.of(
//                "username", request.getUsername(),
//                "role", "ADMIN",
//                "email", request.getEmail()
//        );
//        return jwtService.generateToken(extractClaims, admin);
    }
}

