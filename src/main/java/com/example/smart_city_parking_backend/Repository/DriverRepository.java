package com.example.smart_city_parking_backend.Repository;

import com.example.smart_city_parking_backend.Entity.Driver;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;

@Repository
public class DriverRepository {

    private final JdbcTemplate jdbcTemplate;

    public DriverRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveDriver(Driver driver) {
        // Insert into User table and get the generated user_id
        String insertUserSQL = "INSERT INTO User (first_name, last_name, email, phone, username, password, role, date_of_birth, status, age) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(insertUserSQL, new String[]{"user_id"});
            ps.setString(1, driver.getFirstName());
            ps.setString(2, driver.getLastName());
            ps.setString(3, driver.getEmail());
            ps.setString(4, driver.getPhone());
            ps.setString(5, driver.getUsername());
            ps.setString(6, driver.getPassword());
            ps.setString(7, driver.getRole().toString()); // Dynamically set role
            ps.setDate(8, Date.valueOf(driver.getDateOfBirth()));
            ps.setString(9, driver.getStatus().toString());
            ps.setInt(10, driver.getAge());
            return ps;
        }, keyHolder);
        // Get the generated user_id
        Integer userId = keyHolder.getKey().intValue();

        // Insert into Driver table
        String insertDriverSQL = "INSERT INTO Driver (driver_id, license_plate_number, car_model) VALUES (?, ?, ?)";
        jdbcTemplate.update(insertDriverSQL, userId, driver.getLicensePlateNumber(), driver.getCarModel());
    }
}
