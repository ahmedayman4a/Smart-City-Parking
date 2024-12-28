package com.amae.smartcityparking.Repository;

import com.amae.smartcityparking.Entity.ParkingLot;
import com.amae.smartcityparking.Entity.ParkingSpot;
import com.amae.smartcityparking.Enum.ParkingLotType;
import com.amae.smartcityparking.Enum.ParkingSpotStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class ParkingLotRepository {

    private final JdbcTemplate jdbcTemplate;

    public ParkingLotRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public ParkingLot save(ParkingLot parkingLot) {
        String sql = "INSERT INTO parking_lot (owner_id, name, address, longitude, latitude, start_price, rate_per_hour, penalty, total_spaces, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, parkingLot.getOwnerId());
            stmt.setString(2, parkingLot.getName());
            stmt.setString(3, parkingLot.getAddress());
            stmt.setBigDecimal(4, new BigDecimal(parkingLot.getLongitude().toString()));
            stmt.setBigDecimal(5, new BigDecimal(parkingLot.getLatitude().toString()));
            stmt.setBigDecimal(6, BigDecimal.valueOf(parkingLot.getStartPrice()));
            stmt.setBigDecimal(7, BigDecimal.valueOf(parkingLot.getRatePerHour()));
            stmt.setBigDecimal(8, BigDecimal.valueOf(parkingLot.getPenalty()));
            stmt.setInt(9, parkingLot.getTotalSpaces());
            stmt.setString(10, parkingLot.getType().name().toUpperCase());
            return stmt;
        }, keyHolder);

        parkingLot.setId(keyHolder.getKey().intValue());
        return parkingLot;
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

    public ParkingLot update(ParkingLot parkingLot) {
        String sql = "UPDATE parking_lot SET name = ?, address = ?, longitude = ?, latitude = ?, start_price = ?, rate_per_hour = ?, penalty = ?, total_spaces = ?, type = ? WHERE id = ?";
        jdbcTemplate.update(connection -> {
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setString(1, parkingLot.getName());
            stmt.setString(2, parkingLot.getAddress());
            stmt.setBigDecimal(3, new BigDecimal(parkingLot.getLongitude().toString()));
            stmt.setBigDecimal(4, new BigDecimal(parkingLot.getLatitude().toString()));
            stmt.setBigDecimal(5, BigDecimal.valueOf(parkingLot.getStartPrice()));
            stmt.setBigDecimal(6, BigDecimal.valueOf(parkingLot.getRatePerHour()));
            stmt.setBigDecimal(7, BigDecimal.valueOf(parkingLot.getPenalty()));
            stmt.setInt(8, parkingLot.getTotalSpaces());
            stmt.setString(9, parkingLot.getType().name().toUpperCase());
            stmt.setInt(10, parkingLot.getId());
            return stmt;
        });
        return parkingLot;
    }


    public List<ParkingLot> searchByAddress(String addressFragment) {
        String sql;
        String searchPattern = null;
        if (addressFragment == null || addressFragment.isEmpty()) {
            sql = "SELECT * FROM parking_lot";
            return jdbcTemplate.query(sql, parkingLotRowMapper());
        }
        else {
            sql = "SELECT * FROM parking_lot WHERE address LIKE ?";
            searchPattern = "%" + addressFragment + "%";
            return jdbcTemplate.query(sql, new Object[]{searchPattern}, parkingLotRowMapper());
        }
    }

    private RowMapper<ParkingLot> parkingLotRowMapper() {
        return (rs, rowNum) -> ParkingLot.builder()
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
                .build();
    }

    public List<ParkingSpot> getParkingSpotsByLotId(int lotId) {
        String sql = "SELECT * FROM parking_spot WHERE parking_lot_id = ?";
        return jdbcTemplate.query(sql, new Object[]{lotId}, parkingSpotRowMapper());
    }

    private RowMapper<ParkingSpot> parkingSpotRowMapper() {
        return (rs, rowNum) -> ParkingSpot.builder()
                .id(rs.getInt("id"))
                .lotId(rs.getInt("parking_lot_id"))
                .spotNumber(rs.getInt("spot_number"))
                .status(ParkingSpotStatus.fromString(rs.getString("status")))
                .build();
    }

    public List<ParkingLot> getParkingLotsByUserId(int userId) {
        String sql = "SELECT * FROM parking_lot WHERE owner_id = ?";
        return jdbcTemplate.query(sql, new Object[]{userId}, parkingLotRowMapper());
    }
}