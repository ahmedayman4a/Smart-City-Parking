package com.example.smart_city_parking_backend.Entity;


import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.stereotype.Component;


@Component
@Data
public class User {

    private int id;
    private String username;
    private String password;
    private String email;
    private String role;
    private String phone;


//    public String getUsername() {
//        return username;
//    }

}
