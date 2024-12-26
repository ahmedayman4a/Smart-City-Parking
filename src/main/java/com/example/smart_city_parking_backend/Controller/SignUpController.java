package com.example.smart_city_parking_backend.Controller;


import com.example.smart_city_parking_backend.DTO.LoginRequestDto;
import com.example.smart_city_parking_backend.DTO.UserDTO;
import com.example.smart_city_parking_backend.Service.LoginService;
import com.example.smart_city_parking_backend.Service.SignUpService;
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
    public ResponseEntity<Object> DriverSignUp(@RequestBody UserDTO request) {
        System.out.println("request = " + request);
        return signUpService.driverSignUp(request);
    }
//
//    @PostMapping("/register/doctor")
//    public ResponseEntity<Object> ParkingManagerSignUp(@RequestBody UserDTO request) {
//
//        return signUpService.doctorSignUp(request);
//    }
//
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequestDto request) {
        return loginService.login(request);
    }



    // if the user is logged in and its token is expired,
    // this endpoint will be called to refresh the token
//    @GetMapping("/refresh-token")
//    public ResponseEntity<Object> refreshToken(@RequestBody AuthenticationResponse token) {
//        System.out.println(token);
//        return authenticateService.refreshToken(token.getRefreshToken());
//    }

//    @PostMapping("/register/admin")
//    public ResponseEntity<Object> registerAdmin(@RequestBody ClinicAdminDTO request) {
//        return signUpService.adminSignUp(request);
//    }


}
