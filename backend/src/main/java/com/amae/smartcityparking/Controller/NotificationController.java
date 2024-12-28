package com.amae.smartcityparking.Controller;


import com.amae.smartcityparking.DTO.NotificationDTO;
import com.amae.smartcityparking.Entity.Notification;
import com.amae.smartcityparking.Repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class NotificationController {

    //client application
    private final NotificationRepository notificationRepository;


    //server application
    @MessageMapping("/sendNotification")
    public void handleSendNotification(NotificationDTO notification) {
        System.out.println("Received notification: " + notification.getContent());
    }
}
