package com.amae.smartcityparking.Controller;


import com.amae.smartcityparking.Repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class ManageNotificationController {

    private final NotificationRepository notificationRepository;

    @PostMapping("/notifications/clear")
    public ResponseEntity<?> clearNotifications(@RequestBody List<Long> notificationIds) {
        try {
            // Log the received IDs for debugging
            System.out.println("Received notification IDs to clear: " + notificationIds);

            // Perform the deletion
            notificationRepository.updateStatus(notificationIds);

            // Respond with success
            return ResponseEntity.ok("Notifications cleared successfully.");
        } catch (Exception e) {
            System.err.println("Error clearing notifications: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to clear notifications.");
        }
    }
}

