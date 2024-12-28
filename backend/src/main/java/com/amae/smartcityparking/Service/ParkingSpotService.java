package com.amae.smartcityparking.Service;

import com.amae.smartcityparking.DTO.ParkingLotDTO;
import com.amae.smartcityparking.DTO.ParkingSpotDTO;
import com.amae.smartcityparking.DTO.SensorStatusUpdateRequest;
import com.amae.smartcityparking.Entity.ParkingLot;
import com.amae.smartcityparking.Entity.ParkingSpot;
import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.Enum.ParkingSpotStatus;
import com.amae.smartcityparking.Repository.ParkingLotRepository;
import com.amae.smartcityparking.Repository.ParkingSpotRepository;
import com.amae.smartcityparking.services.ReservationService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ParkingSpotService {
    private final ParkingSpotRepository parkingSpotRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final ReservationService reservationService;

    public ParkingSpotService(ParkingSpotRepository parkingSpotRepository, ParkingLotRepository parkingLotRepository,@Lazy ReservationService reservationService) {
        this.parkingSpotRepository = parkingSpotRepository;
        this.parkingLotRepository = parkingLotRepository;
        this.reservationService = reservationService;
    }

    public List<ParkingSpot> getAvailableSpots(int lotId, LocalDateTime start, LocalDateTime end) {
        return parkingSpotRepository.findByLotIdAndTime(lotId, start, end);
    }


    public ParkingSpot createEntityObject(ParkingSpotDTO dto, int userId) {
        return ParkingSpot.builder()
                .lotId(dto.getLotId())
                .spotNumber(dto.getSpotNumber())
                .status(dto.getStatus())
                .build();
    }

    public ResponseEntity<Object> createParkingSpot(ParkingSpotDTO dto, UserDetails token) {
        try {
            int userId = ((User) token).getId();
            ParkingSpot parkingSpot = createEntityObject(dto, userId);
            parkingSpot = parkingSpotRepository.save(parkingSpot);
            return ResponseEntity.ok(parkingSpot);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking spot creation failed");
        }
    }

    public ResponseEntity<Object> getParkingSpot(int id) {
        try {
            Optional<ParkingSpot> parkingSpot = parkingSpotRepository.getParkingSpotById(id);
            if (parkingSpot.isPresent()) {
                return ResponseEntity.ok(parkingSpot.get());
            }
            return ResponseEntity.badRequest().body("Parking Spot not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking Spot not found");
        }
    }

    public ResponseEntity<Object> updateParkingSpot(ParkingSpotDTO dto, int id, UserDetails token) {
        try {
            int userId = ((User) token).getId();
            Optional<ParkingLot> parkingLot = parkingLotRepository.getParkingLotById(dto.getLotId());
            if (!parkingLot.isPresent()) {
                return ResponseEntity.badRequest().body("Parking Lot not found");
            }
            if (userId != parkingLot.get().getOwnerId()) {
                return ResponseEntity.badRequest().body("Unauthorized access");
            }
            Optional<ParkingSpot> parkingSpot = parkingSpotRepository.getParkingSpotById(id);
            ParkingSpot updatedParkingSpot = createEntityObject(dto, userId);
            updatedParkingSpot.setId(id);
            if (parkingSpot.isPresent()) {
                updatedParkingSpot = parkingSpotRepository.update(updatedParkingSpot);
                return ResponseEntity.ok(updatedParkingSpot);
            }
            return ResponseEntity.badRequest().body("Parking Spot not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking lot not found");
        }
    }
    public ResponseEntity<Object> updateParkingSpotStatus(ParkingSpotStatus status, int id) {
        try {
            Optional<ParkingSpot> parkingSpot = parkingSpotRepository.getParkingSpotById(id);
            if (parkingSpot.isPresent()) {
                ParkingSpot updatedParkingSpot = parkingSpot.get();
                updatedParkingSpot.setStatus(status);
                updatedParkingSpot = parkingSpotRepository.update(updatedParkingSpot);
                if(status == ParkingSpotStatus.AVAILABLE) {
                    reservationService.bulkMissedReservations(updatedParkingSpot.getId());
                }
                return ResponseEntity.ok(updatedParkingSpot);
            }
            return ResponseEntity.badRequest().body("Parking Spot not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking lot not found");
        }
    }
}
