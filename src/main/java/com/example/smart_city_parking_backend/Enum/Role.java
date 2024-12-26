package com.example.smart_city_parking_backend.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum Role {
    Admin(Set.of(
            Permission.USER_READ,
            Permission.USER_WRITE,
            Permission.PARKING_READ,
            Permission.PARKING_WRITE,
            Permission.ADMIN_READ,
            Permission.ADMIN_WRITE)),
    Driver(Set.of(
            Permission.USER_READ,
            Permission.PARKING_READ)),
    ParkingManager(Set.of(
            Permission.PARKING_READ,
            Permission.PARKING_WRITE));

    @Getter
    private final Set<Permission> permissions;
    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
