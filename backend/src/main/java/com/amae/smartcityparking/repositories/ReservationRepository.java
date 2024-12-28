package com.amae.smartcityparking.repositories;

import com.amae.smartcityparking.dtos.responses.ReservationResponseDTO;
import com.amae.smartcityparking.models.Reservation;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
                SELECT r.*, l.name AS lot_name, l.address AS lot_address\s
                FROM reservation r
                INNER JOIN parking_spot s ON r.spot_id = s.id
                INNER JOIN parking_lot l ON s.parking_lot_id = l.id
                WHERE r.user_id = ?
               \s""";
        return getReservations(userId, sql);
    }

    public List<ReservationResponseDTO> findByManagerId(int managerId) {
        String sql = """
                SELECT r.*, l.name AS lot_name, l.address AS lot_address\s
                FROM reservation r
                INNER JOIN parking_spot s ON r.spot_id = s.id
                INNER JOIN parking_lot l ON s.parking_lot_id = l.id
                WHERE l.owner_id = ?
               \s""";

        return getReservations(managerId, sql);
    }

    private List<ReservationResponseDTO> getReservations(int userId, String sql) {
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
