//package com.amae.smartcityparking.Listener;
//
//import com.amae.smartcityparking.Event.ReservationEvent;
//import com.amae.smartcityparking.Service.NotificationService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.event.EventListener;
//import org.springframework.stereotype.Component;
//
//
//@Component
//@RequiredArgsConstructor
//public class ReservationListener {
//    private final NotificationService notificationService;
//
//    @EventListener
//    public void handleReservationEvent(ReservationEvent reservationEvent) {
//        notificationService.sendNotification("Reservation " + reservationEvent.getReservation().getUsername() + " has been made");
//    }
//
//
//}
