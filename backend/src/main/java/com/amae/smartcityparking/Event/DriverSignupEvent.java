package com.amae.smartcityparking.Event;

import com.amae.smartcityparking.Entity.Driver;
import com.amae.smartcityparking.Entity.ParkingManager;
import org.springframework.context.ApplicationEvent;



public class DriverSignupEvent extends ApplicationEvent {

    public final Driver driver;
    public DriverSignupEvent(Object source, Driver driver) {
        super(source);
        this.driver = driver;
    }
    public Driver getDriver() {
        return driver;
    }

}
