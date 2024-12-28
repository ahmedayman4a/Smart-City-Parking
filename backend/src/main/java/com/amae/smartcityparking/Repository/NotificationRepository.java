package com.amae.smartcityparking.Repository;

import com.amae.smartcityparking.Entity.Notification;
import com.amae.smartcityparking.Enum.NotificationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class NotificationRepository {

    private final JdbcTemplate jdbcTemplate;


    public int saveMessage(Notification notification) {

        String sql = "INSERT INTO notification (status,created_at,content,user_id) VALUES (?, ?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(sql, new String[]{"notification_id"});
            ps.setString(1, notification.getStatus().toString());
            ps.setTimestamp(2, notification.getCreatedAt());
            ps.setString(3, notification.getContent());
            ps.setInt(4, notification.getUserId());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().intValue();
    }

    public List<Notification> getNotifications(int userId) {
        String sql = "SELECT * FROM notification WHERE user_id = ? and status = 'PENDING'";
        return jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) -> Notification.builder()
                .status(NotificationStatus.valueOf(rs.getString("status")))
                .createdAt(rs.getTimestamp("created_at"))
                .content(rs.getString("content"))
                .userId(rs.getInt("user_id"))
                .build());
    }

    public void updateStatus(List<Long> notificationIds) {
        String sql = "UPDATE notification SET status = ? WHERE id = ?";
        for (Long id : notificationIds) {
            int idInt = id.intValue();
            jdbcTemplate.update(sql,"READ",idInt);
        }
    }
}
