package com.amae.smartcityparking.Listener;


import com.amae.smartcityparking.Event.DriverSignupEvent;
import com.amae.smartcityparking.Event.ParkingManagerSignupEvent;
import com.amae.smartcityparking.Service.NotificationService;
import com.amae.smartcityparking.config.WebSocketConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.security.Principal;

@Component
@RequiredArgsConstructor
public class UserSignupListener {
    private final NotificationService notificationService;

    @EventListener
    public void handleDriverSignupEvent(DriverSignupEvent driverSignupEvent) {
        notificationService.sendNotification("Driver " + driverSignupEvent.getDriver().getUsername() + " has signed up");
    }

    @EventListener
    public void handleParkingManagerSignupEvent(ParkingManagerSignupEvent parkingManagerSignupEvent) {

        notificationService.sendToUser(1, "Parking Manager " + parkingManagerSignupEvent.getParkingManager().getUsername() + " has signed up");

    }



}
