package com.amae.smartcityparking.Event;

import com.amae.smartcityparking.Entity.ParkingManager;
import com.amae.smartcityparking.Entity.User;
import org.springframework.context.ApplicationEvent;

public class ParkingManagerSignupEvent extends ApplicationEvent {
    public final User parkingManager;

    public ParkingManagerSignupEvent(Object source, User parkingManager) {
        super(source);
        this.parkingManager = parkingManager;
    }

    public User getParkingManager() {
        return parkingManager;
    }

}
