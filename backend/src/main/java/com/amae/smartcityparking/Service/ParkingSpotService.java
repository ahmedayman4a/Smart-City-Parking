package com.amae.smartcityparking.Service;

import java.time.LocalDateTime;
import java.util.List;
import com.amae.smartcityparking.Entity.ParkingSpot;
import com.amae.smartcityparking.Repository.ParkingSpotRepository;
import org.springframework.stereotype.Service;

@Service
public class ParkingSpotService {
    private final ParkingSpotRepository parkingSpotRepository;

    public ParkingSpotService(ParkingSpotRepository parkingSpotRepository) {
        this.parkingSpotRepository = parkingSpotRepository;
    }

    public List<ParkingSpot> getAvailableSpots(int lotId, LocalDateTime start, LocalDateTime end) {
        return parkingSpotRepository.findByLotIdAndTime(lotId, start, end);
    }
}
