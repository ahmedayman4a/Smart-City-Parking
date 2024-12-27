package com.amae.smartcityparking.Repository;

import com.amae.smartcityparking.Entity.ParkingLot;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;

@Repository
public class ParkingLotRepository {

    private final JdbcTemplate jdbcTemplate;

    public ParkingLotRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveParkingLot(ParkingLot parkingLot) {
        String sql = "INSERT INTO ParkingLot (lot_id, owner_id, address, park_name, start_price, rate_per_hour, total_slots, penalty, latitude, longitude, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(connection -> {
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setInt(1, parkingLot.getId());
            stmt.setInt(2, parkingLot.getOwnerId());
            stmt.setString(3, parkingLot.getAddress());
            stmt.setString(4, parkingLot.getName());
            stmt.setInt(5, parkingLot.getStartPrice());
            stmt.setInt(6, parkingLot.getRatePerHour());
            stmt.setInt(7, parkingLot.getTotalSpaces());
            stmt.setInt(8, parkingLot.getPenalty());
            stmt.setBigDecimal(9, parkingLot.getLatitude());
            stmt.setBigDecimal(10, parkingLot.getLongitude());
            stmt.setString(11, parkingLot.getType().name().toLowerCase());
            return stmt;
        });
    }
}