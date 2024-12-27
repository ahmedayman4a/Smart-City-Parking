package com.amae.smartcityparking.Repository;

import com.amae.smartcityparking.DTO.ParkingLotDTO;
import com.amae.smartcityparking.Entity.ParkingLot;
import com.amae.smartcityparking.Enum.ParkingLotType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.util.Optional;

@Repository
public class ParkingLotRepository {

    private final JdbcTemplate jdbcTemplate;

    public ParkingLotRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveParkingLot(ParkingLot parkingLot) {
        String sql = "INSERT INTO parking_lot (owner_id, name, address, longitude, latitude, start_price, rate_per_hour, penalty, total_spaces, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(connection -> {
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setInt(1, parkingLot.getOwnerId());
            stmt.setString(2, parkingLot.getName());
            stmt.setString(3, parkingLot.getAddress());
            stmt.setBigDecimal(4, new BigDecimal(parkingLot.getLongitude().toString()));
            stmt.setBigDecimal(5, new BigDecimal(parkingLot.getLatitude().toString()));
            stmt.setInt(6, parkingLot.getStartPrice());
            stmt.setInt(7, parkingLot.getRatePerHour());
            stmt.setInt(8, parkingLot.getPenalty());
            stmt.setInt(9, parkingLot.getTotalSpaces());
            stmt.setString(10, parkingLot.getType().name().toUpperCase());
            return stmt;
        });
    }

    public Optional<ParkingLot> getParkingLotById(int id) {
        String sql = "SELECT * FROM parking_lot WHERE id = ?";
        return jdbcTemplate.query(sql, new Object[]{id}, rs -> {
            if (rs.next()) {
                return Optional.of(ParkingLot.builder()
                        .id(rs.getInt("id"))
                        .ownerId(rs.getInt("owner_id"))
                        .name(rs.getString("name"))
                        .address(rs.getString("address"))
                        .longitude(rs.getBigDecimal("longitude"))
                        .latitude(rs.getBigDecimal("latitude"))
                        .startPrice(rs.getInt("start_price"))
                        .ratePerHour(rs.getInt("rate_per_hour"))
                        .penalty(rs.getInt("penalty"))
                        .totalSpaces(rs.getInt("total_spaces"))
                        .type(ParkingLotType.fromString(rs.getString("type")))
                        .build());
            } else {
                return Optional.empty();
            }
        });
    }

    public void update(ParkingLot parkingLot) {
        String sql = "UPDATE parking_lot SET name = ?, address = ?, longitude = ?, latitude = ?, start_price = ?, rate_per_hour = ?, penalty = ?, total_spaces = ?, type = ? WHERE id = ?";
        jdbcTemplate.update(connection -> {
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setString(1, parkingLot.getName());
            stmt.setString(2, parkingLot.getAddress());
            stmt.setBigDecimal(3, new BigDecimal(parkingLot.getLongitude().toString()));
            stmt.setBigDecimal(4, new BigDecimal(parkingLot.getLatitude().toString()));
            stmt.setInt(5, parkingLot.getStartPrice());
            stmt.setInt(6, parkingLot.getRatePerHour());
            stmt.setInt(7, parkingLot.getPenalty());
            stmt.setInt(8, parkingLot.getTotalSpaces());
            stmt.setString(9, parkingLot.getType().name().toUpperCase());
            stmt.setInt(10, parkingLot.getId());
            return stmt;
        });
    }
}