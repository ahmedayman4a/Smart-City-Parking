package com.amae.smartcityparking.Service;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.message.SimpleMessage;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import static org.springframework.messaging.simp.SimpMessageHeaderAccessor.getSessionAttributes;

@Service

public class NotificationService {


    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Called when you want to send a notification
    public void sendNotification(String message) {
        // This will send to all subscribers of /topic/notification
        messagingTemplate.convertAndSend("/topic/notification", message);
    }
}
