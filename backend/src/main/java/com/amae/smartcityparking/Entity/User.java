package com.amae.smartcityparking.Entity;


import com.amae.smartcityparking.Enum.Role;
import com.amae.smartcityparking.Enum.Status;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;


@Data
@SuperBuilder
public class User implements UserDetails {

    private int id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private Role role;
    private String phone;
    private LocalDateTime createdAt;
    private LocalDate dateOfBirth;
    private int age;
    private Status status;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return role.getAuthorities();
    }

    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }


}
