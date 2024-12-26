package com.example.smart_city_parking_backend.Repository;

import com.example.smart_city_parking_backend.DTO.UserDTO;
import com.example.smart_city_parking_backend.Entity.Driver;
import com.example.smart_city_parking_backend.Entity.User;
import com.example.smart_city_parking_backend.Enum.Role;
import com.example.smart_city_parking_backend.Enum.Status;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;
    private User user;

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

    }



    public List<User> findAll() {
        String sql = "SELECT * FROM User"; // SQL table name is case-sensitive in some databases

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> User.builder()
                        .id(rs.getInt("user_id")) // Match column name in the schema
                        .username(rs.getString("username"))
                        .password(rs.getString("password"))
                        .email(rs.getString("email"))
                        .role(Role.valueOf(rs.getString("role"))) // Enum conversion
                        .phone(rs.getString("phone"))
                        .age(rs.getInt("age")) // Age field should exist in User class
                        .createdAt(rs.getTimestamp("created_at").toLocalDateTime()) // Correct column name and conversion
                        .dateOfBirth(rs.getDate("date_of_birth").toLocalDate()) // Correct column name
                        .status(Status.valueOf(rs.getString("status")))
                        .firstName(rs.getString("first_name")) // Correct column name
                        .lastName(rs.getString("last_name")) // Correct column name
                        .build()
        );
    }


//    public Optional<User> findByUsername(String username) {
//        String sql = "SELECT * FROM user WHERE username = ?";
//        try {
//            User user = jdbcTemplate.queryForObject(sql, new Object[]{username}, (rs, rowNum) -> {
//                User u = User.builder()
//                        .id(rs.getInt("user_id"))
//                        .username(rs.getString("username"))
//                        .password(rs.getString("password"))
//                        .email(rs.getString("email"))
//                        .role(Role.valueOf(rs.getString("role")))
//                        .phone(rs.getString("phone"))
//                        .age(rs.getInt("age"))
//                        .createdAt(rs.getTimestamp("created_at").toLocalDateTime())
//                        .dateOfBirth(rs.getDate("date_of_birth").toLocalDate())
//                        .status(Status.valueOf(rs.getString("status")))
//                        .firstName(rs.getString("first_name"))
//                        .lastName(rs.getString("last_name"))
//                        .build();
//                return u;
//            });
//            return Optional.of(user);
//        } catch (Exception e) {
//            return Optional.empty();
//        }
//    }

    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM user WHERE LOWER(email) = LOWER(?)";
        try {
            return Optional.of(
                    jdbcTemplate.queryForObject(sql, new Object[]{email.trim()}, (rs, rowNum) ->
                            User.builder()
                                    .id(rs.getInt("user_id"))
                                    .username(rs.getString("username"))
                                    .password(rs.getString("password"))
                                    .email(rs.getString("email"))
                                    .role(rs.getString("role") != null ? Role.valueOf(rs.getString("role")) : null)
                                    .phone(rs.getString("phone"))
                                    .age(rs.getObject("age") != null ? rs.getInt("age") : 0)
                                    .createdAt(rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null)
                                    .dateOfBirth(rs.getDate("date_of_birth") != null ? rs.getDate("date_of_birth").toLocalDate() : null)
                                    .status(Status.valueOf(rs.getString("status").toUpperCase()))
                                    .firstName(rs.getString("first_name"))
                                    .lastName(rs.getString("last_name"))
                                    .build()
                    )
            );
        } catch (Exception e) {
            System.err.println("Error executing query: " + sql + " with email: " + email);
            e.printStackTrace();
            return Optional.empty();
        }
    }

}
