package com.amae.smartcityparking.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class PrivateMessageController {

    @MessageMapping("/privateMessage")
    @SendToUser("/queue/notification")
    public String processPrivateMessage(String payload, Principal principal) {
        // `principal.getName()` is the authenticated username
        // Some processing...
        System.out.println("Hello " + principal.getName() + ", your private message was: " + payload);
        return "Hello " + principal.getName() + ", your private message was: " + payload;
    }
}
