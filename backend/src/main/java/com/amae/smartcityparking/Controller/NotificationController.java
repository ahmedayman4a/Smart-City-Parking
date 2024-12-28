package com.amae.smartcityparking.Controller;


import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class NotificationController {

    //client application
    private final SimpMessageSendingOperations messagingTemplate;


    //server application
    @MessageMapping("/sendNotification")
    public void handleSendNotification(String message, SimpMessageHeaderAccessor headerAccessor) {

        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            System.out.println("Username in session: " + username);
            messagingTemplate.convertAndSendToUser(username, "/queue/notification", message);
        } else {
            System.out.println("No username in session attributes.");
        }

    }
}
