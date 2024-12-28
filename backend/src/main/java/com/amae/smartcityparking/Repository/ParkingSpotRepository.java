package com.amae.smartcityparking.Repository;

import com.amae.smartcityparking.Entity.ParkingLot;
import com.amae.smartcityparking.Entity.ParkingSpot;
import com.amae.smartcityparking.Enum.ParkingLotType;
import com.amae.smartcityparking.Enum.ParkingSpotStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ParkingSpotRepository {

    private final JdbcTemplate jdbcTemplate;

    public ParkingSpotRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public ParkingSpot save(ParkingSpot parkingSpot) {
        String sql = "INSERT INTO parking_spot (parking_lot_id, spot_number, status) VALUES (?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, parkingSpot.getLotId());
            stmt.setInt(2, parkingSpot.getSpotNumber());
            stmt.setString(3, parkingSpot.getStatus().name().toUpperCase());
            return stmt;
        }, keyHolder);

        parkingSpot.setId(keyHolder.getKey().intValue());
        return parkingSpot;
    }

    public Optional<ParkingSpot> getParkingSpotById(int id) {
        String sql = "SELECT * FROM parking_spot WHERE id = ?";
        return jdbcTemplate.query(sql, new Object[]{id}, rs -> {
            if (rs.next()) {
                return Optional.of(ParkingSpot.builder()
                        .id(rs.getInt("id"))
                        .lotId(rs.getInt("parking_lot_id"))
                        .spotNumber(rs.getInt("spot_number"))
                        .status(ParkingSpotStatus.fromString(rs.getString("status")))
                        .build());
            } else {
                return Optional.empty();
            }
        });
    }

    public ParkingSpot update(ParkingSpot parkingSpot) {
        String sql = "UPDATE parking_spot SET spot_number = ?, status = ? WHERE id = ?";
        jdbcTemplate.update(connection -> {
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setString(1, String.valueOf(parkingSpot.getSpotNumber()));
            stmt.setString(2, parkingSpot.getStatus().name().toUpperCase());
            stmt.setInt(3, parkingSpot.getId());
            return stmt;
        });
        return parkingSpot;
    }
    
public List<ParkingSpot> findByLotIdAndTime(int lotId, LocalDateTime start, LocalDateTime end) {
    String sql = """
                SELECT * 
                FROM parking_spot ps
                WHERE ps.parking_lot_id = ?
                  AND NOT EXISTS (
                    SELECT 1
                    FROM reservation r
                    WHERE r.spot_id = ps.id
                        AND r.status != 'CANCELLED'
                        AND ( (? BETWEEN r.start AND r.end)
                            OR (? BETWEEN r.start AND r.end)
                            OR (r.start BETWEEN ? AND ?)
                            OR (r.end BETWEEN ? AND ?)
                        )
                  )
                """;
    return jdbcTemplate.query(
            sql,
            (rs, rowNum) -> ParkingSpot.builder()
                    .id(rs.getInt("id"))
                    .lotId(rs.getInt("parking_lot_id"))
                    .spotNumber(rs.getInt("spot_number"))
                    .build(),
            lotId, start, end, start, end, start, end
    );
}

}
