package com.amae.smartcityparking.Service;

import com.amae.smartcityparking.DTO.ParkingLotDTO;
import com.amae.smartcityparking.DTO.ParkingSpotDTO;
import com.amae.smartcityparking.Entity.ParkingLot;
import com.amae.smartcityparking.Entity.ParkingSpot;
import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.Repository.ParkingLotRepository;
import com.amae.smartcityparking.Repository.ParkingSpotRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParkingSpotService {
    private final ParkingSpotRepository parkingSpotRepository;
    private final ParkingLotRepository parkingLotRepository;

    public ParkingSpotService(ParkingSpotRepository parkingSpotRepository, ParkingLotRepository parkingLotRepository) {
        this.parkingSpotRepository = parkingSpotRepository;
        this.parkingLotRepository = parkingLotRepository;
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
            parkingSpotRepository.saveParkingSpot(parkingSpot);
            System.out.print("Parking Spot Created: " + parkingSpot);
            return ResponseEntity.ok("Parking spot created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking spot creation failed");
        }
    }

    public ResponseEntity<Object> getParkingSpot(int id, UserDetails token) {
        try {
            int userId = ((User) token).getId();
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
            Optional<ParkingSpot> parkingSpot = parkingSpotRepository.getParkingSpotById(id);

            if (!parkingLot.isPresent()) {
                return ResponseEntity.badRequest().body("Parking Lot not found");
            }
            if (userId != parkingLot.get().getOwnerId()) {
                return ResponseEntity.badRequest().body("Unauthorized access");
            }
            ParkingSpot updatedParkingSpot = createEntityObject(dto, userId);
            updatedParkingSpot.setId(id);
            if (parkingSpot.isPresent()) {
                parkingSpotRepository.update(updatedParkingSpot);
                return ResponseEntity.ok("Parking Spot updated successfully");
            }
            return ResponseEntity.badRequest().body("Parking Spot not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking lot not found");
        }
    }
}