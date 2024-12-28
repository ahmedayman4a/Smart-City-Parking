package com.amae.smartcityparking.Service;


import com.amae.smartcityparking.Entity.Notification;
import com.amae.smartcityparking.Enum.NotificationStatus;
import com.amae.smartcityparking.Repository.NotificationRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.message.SimpleMessage;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import static org.springframework.messaging.simp.SimpMessageHeaderAccessor.getSessionAttributes;

@Service
@Data
@RequiredArgsConstructor
public class NotificationService {


    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationRepository notificationRepository;

    // Called when you want to send a notification
    public void sendNotification(String message) {
        // This will send to all subscribers of /topic/notification
        messagingTemplate.convertAndSend("/topic/notification", message);
    }
    public void sendToUser(int id, String message) {

        Notification newNotification = Notification.builder()
                .content(message)
                .status(NotificationStatus.PENDING)
                .userId(id)
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        int notificationId =notificationRepository.saveMessage(newNotification);
        newNotification.setNotificationId(notificationId);
        // Construct the destination manually to match the client's subscription
        String destination = "/queue/notification/" + id;

        // Log for debugging
        System.out.println("Sending message to destination: " + destination);
        System.out.println("Message content: " + message);

        // Send the message to the specific destination
        try {
            messagingTemplate.convertAndSend(destination, newNotification);
        } catch (Exception e) {
            System.out.println("Error sending message to user: " + id);
            e.printStackTrace();
        }
        System.out.println("Message sent to user: " + id);
    }

}
