package com.amae.smartcityparking.Repository;

import com.amae.smartcityparking.DTO.UserDTO;
import com.amae.smartcityparking.Entity.Driver;
import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.Enum.Role;
import com.amae.smartcityparking.Enum.Status;
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

    }

    public User findById(int id) {
        String sql = "SELECT * FROM User WHERE user_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            return User.builder()
                    .id(rs.getInt("user_id"))
                    .username(rs.getString("username"))
                    .password(rs.getString("password"))
                    .email(rs.getString("email"))
                    .role(Role.valueOf(rs.getString("role")))
                    .phone(rs.getString("phone"))
                    .age(rs.getInt("age"))
                    .createdAt(rs.getTimestamp("created_at").toLocalDateTime())
                    .dateOfBirth(rs.getDate("date_of_birth").toLocalDate())
                    .status(Status.valueOf(rs.getString("status").toUpperCase())) // Ensure matching
                    .firstName(rs.getString("first_name"))
                    .lastName(rs.getString("last_name"))
                    .build();
        });
    }

    public User update(User user) {
        String sql = "UPDATE User SET first_name = ?, last_name = ?, email = ?, phone = ?, username = ?, password = ?, role = ?, date_of_birth = ?, status = ?, age = ?, balance = ? WHERE user_id = ?";
        jdbcTemplate.update(sql, user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhone(), user.getUsername(), user.getPassword(), user.getRole().toString(), user.getDateOfBirth(), user.getStatus().toString(), user.getAge(), user.getBalance(), user.getId());
        return user;
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
        String sql = "SELECT * FROM User WHERE LOWER(email) = LOWER(?)";
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
