package com.amae.smartcityparking.Repository;
import com.amae.smartcityparking.Entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;

@Repository
@RequiredArgsConstructor
public class ParkingManagerRepository {

    private final JdbcTemplate jdbcTemplate;

    public void save(User user) {
        // Insert into User table and get the generated user_id
        String insertUserSQL = "INSERT INTO User (first_name, last_name, email, phone, username, password, role, date_of_birth, status, age) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(insertUserSQL, new String[]{"user_id"});
            ps.setString(1, user.getFirstName());
            ps.setString(2, user.getLastName());
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getPhone());
            ps.setString(5, user.getUsername());
            ps.setString(6, user.getPassword());
            ps.setString(7, user.getRole().toString()); // Dynamically set role
            ps.setDate(8, Date.valueOf(user.getDateOfBirth()));
            ps.setString(9, user.getStatus().toString());
            ps.setInt(10, user.getAge());
            return ps;
        }, keyHolder);
        // Get the generated user_id
        Integer userId = keyHolder.getKey().intValue();
        // Insert into Driver table
        String insertParkingManagaerSQL = "INSERT INTO parkingmanager (manager_id) VALUES (?)";
        jdbcTemplate.update(insertParkingManagaerSQL, userId);
    }
}
