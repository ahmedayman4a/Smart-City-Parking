package com.amae.smartcityparking.Service;


import com.amae.smartcityparking.DTO.AuthenticationResponse;
import com.amae.smartcityparking.DTO.ResponseDTO;
import com.amae.smartcityparking.DTO.UserDTO;
import com.amae.smartcityparking.Entity.Driver;
import com.amae.smartcityparking.Entity.ParkingManager;
import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.Enum.Role;
import com.amae.smartcityparking.Enum.Status;
import com.amae.smartcityparking.Event.DriverSignupEvent;
import com.amae.smartcityparking.Event.ParkingManagerSignupEvent;
import com.amae.smartcityparking.Repository.DriverRepository;
import com.amae.smartcityparking.Repository.ParkingManagerRepository;
import com.amae.smartcityparking.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
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

    private final ApplicationEventPublisher eventPublisher;

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
            User user = User.builder()
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
            Map<String, Object> claims = Map.of("role", user.getRole().toString(),
                    "email", user.getEmail(),
                    "username", user.getUsername()
            );
            String token = jwtService.generateToken(claims, user);
            System.out.println(token);
            return ResponseEntity.ok(ResponseDTO.builder().message("Parking Manager registered successfully").success(true).statusCode(200).data(token).build());
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

        eventPublisher.publishEvent(new DriverSignupEvent(this, driver));


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

        eventPublisher.publishEvent(new ParkingManagerSignupEvent(this, manager));
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

