package com.amae.smartcityparking.services;

import com.amae.smartcityparking.models.User;
import com.amae.smartcityparking.repositories.UserRepository;

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
