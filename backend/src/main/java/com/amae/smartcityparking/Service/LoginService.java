package com.amae.smartcityparking.Service;


import com.amae.smartcityparking.DTO.ResponseDTO;
import com.amae.smartcityparking.DTO.LoginRequestDto;
import com.amae.smartcityparking.Entity.Notification;
import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.Repository.NotificationRepository;
import com.amae.smartcityparking.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final NotificationRepository notificationRepository;


    public ResponseEntity<Object> login(LoginRequestDto request) {
        try {
            User user;
            user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())

            );
            Map<String, Object> claims = Map.of("role", user.getRole().toString(),
                    "email", user.getEmail(),
                    "username", user.getUsername(),
                    "userId", user.getId()
            );
            List<Notification> notifications =  notificationRepository.getNotifications(user.getId());
            var token = jwtService.generateToken(claims, user);
            return ResponseEntity.ok(ResponseDTO.builder().data(token).message("Login successful").statusCode(200).success(true).notifications(notifications).build());

        } catch (Exception e) {
            if (e.getMessage().equals("User not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ResponseDTO.builder()
                                .data(null).
                                message("User not found")
                                .statusCode(404)
                                .success(false)
                                .build());
            } else if (e.getMessage().equals("Bad credentials")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ResponseDTO.builder()
                                .data(null).
                                message("Login failed")
                                .statusCode(401)
                                .success(false)
                                .build());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ResponseDTO.builder()
                                .data(null).
                                message("Login failed")
                                .statusCode(400)
                                .success(false)
                                .build());
            }
        }
    }

}
