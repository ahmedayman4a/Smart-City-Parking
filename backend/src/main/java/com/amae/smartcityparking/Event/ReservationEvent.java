package com.amae.smartcityparking.Event;


import com.amae.smartcityparking.Entity.Reservation;
import org.springframework.context.ApplicationEvent;

public class ReservationEvent extends ApplicationEvent {
    private final Reservation reservation;
    public ReservationEvent(Object source, Reservation reservation) {
        super(source);
        this.reservation = reservation;
    }
    public Reservation getReservation() {
        return reservation;
    }


}

// add this in Reservation service
// private final ApplicationEventPublisher eventPublisher;
//and after every reservation is made add this line
//eventPublisher.publishEvent(new ReservationEvent(reservation));

