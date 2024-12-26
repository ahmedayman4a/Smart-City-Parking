package com.example.smart_city_parking_backend.Service;


import com.example.smart_city_parking_backend.DTO.ResponseDTO;
import com.example.smart_city_parking_backend.DTO.LoginRequestDto;
import com.example.smart_city_parking_backend.Entity.User;
import com.example.smart_city_parking_backend.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;


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
                    "username", user.getUsername()
            )
                    ;
            var token = jwtService.generateToken(claims, user);
            return ResponseEntity.ok(ResponseDTO.builder().data(token).message("Login successful").statusCode(200).success(true).build());

        } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ResponseDTO.builder()
                        .data(null).
                        message("Login failed")
                        .statusCode(401)
                        .success(false)
                        .build());

        }
    }
}
