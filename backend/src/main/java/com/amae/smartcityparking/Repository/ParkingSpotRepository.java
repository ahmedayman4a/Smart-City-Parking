package com.amae.smartcityparking.Repository;

import com.amae.smartcityparking.Entity.ParkingSpot;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;

@Repository
public class ParkingSpotRepository {

    private final JdbcTemplate jdbcTemplate;

    public ParkingSpotRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveParkingSpot(ParkingSpot parkingSpot) {
        String sql = "INSERT INTO ParkingSpot (id, lot_id, spot_number, status) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(connection -> {
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setInt(1, parkingSpot.getId());
            stmt.setInt(2, parkingSpot.getLotId());
            stmt.setInt(3, parkingSpot.getSpotNumber());
            stmt.setString(4, parkingSpot.getStatus().name().toLowerCase());
            return stmt;
        });
    }
}
