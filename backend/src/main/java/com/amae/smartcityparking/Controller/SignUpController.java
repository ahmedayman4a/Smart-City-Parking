package com.amae.smartcityparking.Controller;


import com.amae.smartcityparking.DTO.AuthenticationResponse;
import com.amae.smartcityparking.DTO.LoginRequestDto;
import com.amae.smartcityparking.DTO.UserDTO;

import com.amae.smartcityparking.Service.LoginService;
import com.amae.smartcityparking.Service.SignUpService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authenticate")
@RequiredArgsConstructor //lombok annotation to create a constructor with all the required fields
@Getter
@CrossOrigin
public class SignUpController {

    private final SignUpService signUpService;
    private final LoginService loginService;
    @PostMapping("/signUp/driver")
    public ResponseEntity<Object> driverSignUp(@RequestBody UserDTO request) {
        System.out.println("request = " + request);
        return signUpService.driverSignUp(request);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequestDto request) {
        return loginService.login(request);
    }

    @PostMapping("/signUp/parkingOwner")
    public ResponseEntity<Object> parkingManagerSignUp(@RequestBody UserDTO request) {
        System.out.println("request = " + request);
        return signUpService.parkingManagerSignUp(request);
    }



    @PostMapping("/signUp/admin")
    public ResponseEntity<Object> adminSignUp(@RequestBody UserDTO request) {
        return signUpService.adminSignUp(request);
    }


//
//     if the user is logged in and its token is expired,
//     this endpoint will be called to refresh the token
    @GetMapping("/refresh-token")
    public ResponseEntity<Object> refreshToken(@RequestBody AuthenticationResponse token) {
        System.out.println(token);
        return signUpService.refreshToken(token);
    }


}