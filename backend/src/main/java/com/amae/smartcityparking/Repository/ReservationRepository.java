package com.amae.smartcityparking.Repository;

import com.amae.smartcityparking.DTO.ReservationResponseDTO;
import com.amae.smartcityparking.Entity.Reservation;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ReservationRepository {
    private final JdbcTemplate jdbcTemplate;

    public ReservationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Reservation save(Reservation reservation) {
        String sql = "INSERT INTO reservation (user_id, spot_id, amount, payment_method, start, end, status) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                reservation.getUserId(),
                reservation.getSpotId(),
                reservation.getAmount(),
                reservation.getPaymentMethod(),
                reservation.getStart(),
                reservation.getEnd(),
                reservation.getStatus()
        );

        String lastInsertedIdSql = "SELECT LAST_INSERT_ID()";
        int id = jdbcTemplate.queryForObject(lastInsertedIdSql, Integer.class);
        reservation.setId(id);
        return reservation;
    }

    public List<ReservationResponseDTO> findAll() {
        String sql = """
                    SELECT r.*, l.name AS lot_name, l.address AS lot_address\s
                    FROM reservation r
                    INNER JOIN parking_spot s ON r.spot_id = s.id
                    INNER JOIN parking_lot l ON s.parking_lot_id = l.id
                    WHERE l.owner_id = ?
                   \s
               """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            return ReservationResponseDTO.builder()
                    .id(rs.getInt("id"))
                    .userId(rs.getInt("user_id"))
                    .spotId(rs.getInt("spot_id"))
                    .amount(rs.getDouble("amount"))
                    .paymentMethod(rs.getString("payment_method"))
                    .start(rs.getTimestamp("start").toLocalDateTime().toString())
                    .end(rs.getTimestamp("end").toLocalDateTime().toString())
                    .status(rs.getString("status"))
                    .lotName(rs.getString("lot_name"))
                    .lotAddress(rs.getString("lot_address"))
                    .build();
        });
    }

    public Reservation findById(int id) {
        String sql = """
                    SELECT * FROM reservation
                    WHERE id = ?
                    """;
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            return Reservation.builder()
                    .id(rs.getInt("id"))
                    .userId(rs.getInt("user_id"))
                    .spotId(rs.getInt("spot_id"))
                    .amount(rs.getDouble("amount"))
                    .paymentMethod(rs.getString("payment_method"))
                    .start(rs.getTimestamp("start").toLocalDateTime())
                    .end(rs.getTimestamp("end").toLocalDateTime())
                    .status(rs.getString("status"))
                    .build();
        }, id);
    }

    public boolean updateStatus(int id, String status) {
        String sql = """
                    UPDATE reservation
                    SET status = ?
                    WHERE id = ?
                    """;
        return jdbcTemplate.update(sql, status, id) > 0;
    }

    public boolean isSpotReserved(int spotId, LocalDateTime start, LocalDateTime end) {
        String sql = """
                    SELECT COUNT(*) FROM reservation
                    WHERE spot_id = ? AND 
                    status = 'RESERVED' AND
                    ((start BETWEEN ? AND ?) OR (end BETWEEN ? AND ?))
                    """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                spotId, start, start, end, end, start, end
        );
        return count != null && count > 0;
    }


    public List<ReservationResponseDTO> findByUserId(int userId) {
        String sql = """
                SELECT r.*, l.name AS lot_name, l.longitude, l.latitude, l.address AS lot_address, s.spot_number AS spot_number
                FROM reservation r
                INNER JOIN parking_spot s ON r.spot_id = s.id
                INNER JOIN parking_lot l ON s.parking_lot_id = l.id
                WHERE r.user_id = ?
                ORDER BY r.created_at DESC
               \s""";
        return getReservations(userId, sql);
    }

    public List<ReservationResponseDTO> findByManagerId(int managerId) {
        String sql = """
                SELECT r.*, l.name AS lot_name, l.address AS lot_address, l.longitude, l.latitude, s.spot_number AS spot_number, u.first_name, u.last_name
                FROM reservation r
                INNER JOIN parking_spot s ON r.spot_id = s.id
                INNER JOIN parking_lot l ON s.parking_lot_id = l.id
                INNER JOIN User u ON r.user_id = u.user_id
                WHERE l.owner_id = ?
                ORDER BY r.created_at DESC
               \s""";

        return getReservations(managerId, sql);
    }
    public ReservationResponseDTO findByIdWithPenalty(int id) {
        String sql = """
                    SELECT r.*, l.penalty FROM reservation r
                    INNER JOIN parking_spot s ON r.spot_id = s.id
                    INNER JOIN parking_lot l ON s.parking_lot_id = l.id
                    WHERE r.id = ?
                    """;
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            return ReservationResponseDTO.builder()
                    .id(rs.getInt("id"))
                    .userId(rs.getInt("user_id"))
                    .spotId(rs.getInt("spot_id"))
                    .amount(rs.getDouble("amount"))
                    .paymentMethod(rs.getString("payment_method"))
                    .start(rs.getTimestamp("start").toLocalDateTime().toString())
                    .end(rs.getTimestamp("end").toLocalDateTime().toString())
                    .status(rs.getString("status"))
                    .lotName(rs.getString("lot_name"))
                    .lotAddress(rs.getString("lot_address"))
                    .spotNumber(rs.getInt("spot_number"))
                    .latitude(rs.getDouble("latitude"))
                    .longitude(rs.getDouble("longitude"))
                    .penalty(rs.getInt("penalty"))
                    .build();
        }, id);
    }
public List<ReservationResponseDTO> findBySpotIdStatusEndTime(int spotId, String status, LocalDateTime endTime) {
    String sql = """
                SELECT r.*, l.penalty 
                FROM reservation r
                INNER JOIN parking_spot s ON r.spot_id = s.id
                INNER JOIN parking_lot l ON s.parking_lot_id = l.id
                WHERE r.spot_id = ? AND r.status = ? AND r.end <= ?
                """;

    return jdbcTemplate.query(sql,
        ps -> {
            ps.setInt(1, spotId);
            ps.setString(2, status);
            ps.setTimestamp(3, java.sql.Timestamp.valueOf(endTime)); // Convert LocalDateTime to Timestamp
        },
        (rs, rowNum) -> {
            return ReservationResponseDTO.builder()
                    .id(rs.getInt("id"))
                    .userId(rs.getInt("user_id"))
                    .spotId(rs.getInt("spot_id"))
                    .amount(rs.getDouble("amount"))
                    .paymentMethod(rs.getString("payment_method"))
                    .start(rs.getTimestamp("start").toLocalDateTime().toString())
                    .end(rs.getTimestamp("end").toLocalDateTime().toString())
                    .status(rs.getString("status"))
                    .penalty(rs.getInt("penalty"))
                    .build();
        }
    );
}

    private List<ReservationResponseDTO> getReservations(int userId, String sql) {
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            String firstName = null;
            String lastName = null;
            try {
                firstName = rs.getString("first_name");
                lastName = rs.getString("last_name");
            } catch (SQLException e) {
                // Ignore, as this column might not be present for certain queries
            }
    
            String username = (firstName != null && lastName != null) ? firstName + " " + lastName : null;

            return ReservationResponseDTO.builder()
                    .id(rs.getInt("id"))
                    .userId(rs.getInt("user_id"))
                    .spotId(rs.getInt("spot_id"))
                    .amount(rs.getDouble("amount"))
                    .paymentMethod(rs.getString("payment_method"))
                    .start(rs.getTimestamp("start").toLocalDateTime().toString())
                    .end(rs.getTimestamp("end").toLocalDateTime().toString())
                    .status(rs.getString("status"))
                    .lotName(rs.getString("lot_name"))
                    .lotAddress(rs.getString("lot_address"))
                    .spotNumber(rs.getInt("spot_number"))
                    .latitude(rs.getDouble("latitude"))
                    .longitude(rs.getDouble("longitude"))
                    .username(username)
                    .build();
        }, userId);
    }


    public boolean existsBySpotIdAndTimeRange(int spotId, LocalDateTime start, LocalDateTime end) {
        String sql = """
                    SELECT COUNT(*) FROM reservation
                    WHERE spot_id = ? AND 
                    status = 'RESERVED' AND
                    ((start BETWEEN ? AND ?) OR (end BETWEEN ? AND ?))
                    """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                spotId, start, end, start, end
        );
        return count != null && count > 0;
    }
}
