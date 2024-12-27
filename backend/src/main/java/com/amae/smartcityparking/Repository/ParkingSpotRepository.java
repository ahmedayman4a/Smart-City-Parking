package com.amae.smartcityparking.Repository;

import com.amae.smartcityparking.Entity.ParkingSpot;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.time.LocalDateTime;
import java.util.List;

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

public List<ParkingSpot> findByLotIdAndTime(int lotId, LocalDateTime start, LocalDateTime end) {
    String sql = """
                SELECT * 
                FROM parking_spot ps
                WHERE ps.parking_lot_id = ?
                  AND NOT EXISTS (
                    SELECT 1
                    FROM reservation r
                    WHERE r.spot_id = ps.id
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
