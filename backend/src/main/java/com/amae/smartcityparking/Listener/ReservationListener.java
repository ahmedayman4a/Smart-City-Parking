package com.amae.smartcityparking.Listener;

import com.amae.smartcityparking.Event.ReservationEvent;
import com.amae.smartcityparking.Repository.ReservationRepository;
import com.amae.smartcityparking.Service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class ReservationListener {
    private final NotificationService notificationService;
    private final ReservationRepository reservationRepository;

    @EventListener
    public void handleReservationEvent(ReservationEvent reservationEvent) {
        int parkingManagerId = reservationRepository.getParkingManagerId(reservationEvent.getReservation().getId());
        notificationService.sendToUser(parkingManagerId, "New reservation made" + reservationEvent.getReservation().getId());
    }


}
