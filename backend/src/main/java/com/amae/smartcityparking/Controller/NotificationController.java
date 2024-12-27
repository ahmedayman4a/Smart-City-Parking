package com.amae.smartcityparking.Controller;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {


    //server application
    @MessageMapping("/sendNotification") // the endpoint from the client is /app/sendNotification
    @SendTo("/topic/notification") // the endpoint to the client is /topic/notification
    public String sendNotification(String message) {
        System.out.println("Notification sent"+message);
        return "Notification sent"+message; // Dummy implementation
    }


}
