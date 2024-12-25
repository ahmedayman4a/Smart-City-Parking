package com.example.smart_city_parking_backend.Service;


import com.example.smart_city_parking_backend.Entity.User;
import com.example.smart_city_parking_backend.Repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserService {

    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }
    public int save(User user) {
        return userRepository.save(user);

    }


}
