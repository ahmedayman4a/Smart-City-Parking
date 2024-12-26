package com.example.smart_city_parking_backend.Enum;

public enum Permission {
    USER_READ("user:read"),
    USER_WRITE("user:write"),
    PARKING_READ("parking:read"),
    PARKING_WRITE("parking:write"),
    ADMIN_READ("admin:read"),
    ADMIN_WRITE("admin:write");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
