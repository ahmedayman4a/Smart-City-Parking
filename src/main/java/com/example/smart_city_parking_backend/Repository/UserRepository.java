package com.example.smart_city_parking_backend.Repository;

import com.example.smart_city_parking_backend.Entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    private JdbcTemplate jdbcTemplate;
    private User user;

    public int save(User user) {

        String sql = "INSERT INTO user (username, password, email, role, phone) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(
                sql, user.getUsername()
                , user.getPassword()
                , user.getEmail()
                , user.getRole()
                , user.getPhone());

    }

    public List<User> findAll() {
        String sql = "SELECT * FROM user";
        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {
                    User user = new User();
                    user.setId(rs.getInt("id"));
                    user.setUsername(rs.getString("username"));
                    user.setPassword(rs.getString("password"));
                    user.setEmail(rs.getString("email"));
                    user.setRole(rs.getString("role"));
                    user.setPhone(rs.getString("phone"));
                    return user;
                });
    }
}
