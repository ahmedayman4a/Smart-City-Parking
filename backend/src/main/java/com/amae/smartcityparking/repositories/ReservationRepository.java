package com.amae.smartcityparking.repositories;

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

    public List<Reservation> findAll() {
        String sql = "SELECT * FROM reservation";
        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {
                    Reservation reservation = new Reservation();
                    reservation.setId(rs.getInt("id"));
                    reservation.setUserId(rs.getInt("user_id"));
                    reservation.setSpotId(rs.getInt("spot_id"));
                    reservation.setAmount(rs.getDouble("amount"));
                    reservation.setPaymentMethod(rs.getString("payment_method"));
                    reservation.setStart(rs.getTimestamp("start").toLocalDateTime());
                    reservation.setEnd(rs.getTimestamp("end").toLocalDateTime());
                    reservation.setStatus(rs.getString("status"));
                    return reservation;
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

    public List<Reservation> findByUserId(int userId) {
        String sql = "SELECT * FROM reservation WHERE user_id = ?";
        return getReservations(userId, sql);
    }

    public List<Reservation> findByManagerId(int managerId) {
        String sql = """
                SELECT * FROM reservation WHERE
                lot_id IN (SELECT id FROM parking_lot WHERE owner_id = ?)
                """;


        return getReservations(managerId, sql);

    }

    private List<Reservation> getReservations(int userId, String sql) {
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Reservation reservation = new Reservation();
            reservation.setId(rs.getInt("id"));
            reservation.setUserId(rs.getInt("user_id"));
            reservation.setSpotId(rs.getInt("spot_id"));
            reservation.setAmount(rs.getDouble("amount"));
            reservation.setPaymentMethod(rs.getString("payment_method"));
            reservation.setStart(rs.getTimestamp("start").toLocalDateTime());
            reservation.setEnd(rs.getTimestamp("end").toLocalDateTime());
            reservation.setStatus(rs.getString("status"));
            return reservation;
        }, userId);
    }


}
