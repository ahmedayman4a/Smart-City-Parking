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
    public void sendToUser(String username, String message) {
        // Construct the destination manually to match the client's subscription
        String destination = "/queue/notification/" + username;

        // Log for debugging
        System.out.println("Sending message to destination: " + destination);
        System.out.println("Message content: " + message);

        // Send the message to the specific destination
        messagingTemplate.convertAndSend(destination, message);

        System.out.println("Message sent to user: " + username);
    }

}
