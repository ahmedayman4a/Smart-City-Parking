package com.amae.smartcityparking.Entity;

import com.amae.smartcityparking.Enum.NotificationStatus;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@Data
@Builder
public class Notification {
    private int id;
    private int userId;
    private NotificationStatus status;
    private String content;
    private Timestamp createdAt;

    public void setNotificationId(int notificationId) {
        this.id = notificationId;
    }
}
