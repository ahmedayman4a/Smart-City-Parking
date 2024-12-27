package com.amae.smartcityparking.Service;

import com.amae.smartcityparking.DTO.ParkingLotDTO;
import com.amae.smartcityparking.Entity.ParkingLot;
import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.Repository.ParkingLotRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParkingLotService {
    private final ParkingLotRepository parkingLotRepository;

    public ParkingLotService(ParkingLotRepository parkingLotRepository) {
        this.parkingLotRepository = parkingLotRepository;
    }


    public ParkingLot createEntityObject(ParkingLotDTO dto, int userId) {
        return ParkingLot.builder()
                .name(dto.getName())
                .address(dto.getAddress())
                .ownerId(userId)
                .startPrice(dto.getStartPrice())
                .ratePerHour(dto.getRatePerHour())
                .penalty(dto.getPenalty())
                .totalSpaces(dto.getTotalSpaces())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .type(dto.getType())
                .build();
    }

    public ResponseEntity<Object> createParkingLot(ParkingLotDTO dto, UserDetails token) {
        try {
            int userId = ((User) token).getId();
            ParkingLot parkingLot = createEntityObject(dto, userId);
            parkingLotRepository.saveParkingLot(parkingLot);
            return ResponseEntity.ok("Parking lot created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking lot creation failed");
        }
    }

    public ResponseEntity<Object> getParkingLot(int id, UserDetails token) {
        try {
            int userId = ((User) token).getId();
            Optional<ParkingLot> parkingLot = parkingLotRepository.getParkingLotById(id);
            if (parkingLot.isPresent()) {
                return ResponseEntity.ok(parkingLot.get());
            }
            return ResponseEntity.badRequest().body("Parking lot not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking lot not found");
        }
    }

    public ResponseEntity<Object> updateParkingLot(ParkingLotDTO dto, int id, UserDetails token) {
        try {
            int userId = ((User) token).getId();
            Optional<ParkingLot> parkingLot = parkingLotRepository.getParkingLotById(id);
            ParkingLot updatedParkingLot = createEntityObject(dto, userId);
            updatedParkingLot.setId(id);
            if (parkingLot.isPresent()) {
                if (userId == parkingLot.get().getOwnerId()) {
                    parkingLotRepository.update(updatedParkingLot);
                    return ResponseEntity.ok("Parking lot updated successfully");
                }
                else{
                    return ResponseEntity.badRequest().body("Unauthorized access");
                }
            }
            return ResponseEntity.badRequest().body("Parking lot not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking lot not found");
        }
    }
}