package com.amae.smartcityparking.config;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
public class StompChannelInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            // Retrieve the username from handshake attributes
            String username = (String) accessor.getSessionAttributes().get("username");

            if (username != null) {
                // Set the user Principal
                accessor.setUser(new StompPrincipal(username));
                System.out.println("Principal set for username: " + username);
            }
        }

        return message;
    }

    // Simple Principal implementation
    private static class StompPrincipal implements java.security.Principal {
        private final String name;

        public StompPrincipal(String name) {
            this.name = name;
        }

        @Override
        public String getName() {
            return name;
        }
    }
}
