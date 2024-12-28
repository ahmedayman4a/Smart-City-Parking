package com.amae.smartcityparking.DTO;


import com.amae.smartcityparking.Enum.NotificationStatus;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class NotificationDTO {
    private int userId;
    private NotificationStatus status;
    private String content;
    private Timestamp createdAt;

}
