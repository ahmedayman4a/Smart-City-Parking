package com.amae.smartcityparking.Service;

import com.amae.smartcityparking.DTO.ParkingLotDTO;
import com.amae.smartcityparking.DTO.ParkingSpotDTO;
import com.amae.smartcityparking.Entity.ParkingLot;
import com.amae.smartcityparking.Entity.ParkingSpot;
import com.amae.smartcityparking.Entity.User;
import com.amae.smartcityparking.Enum.ParkingSpotStatus;
import com.amae.smartcityparking.Repository.ParkingLotRepository;
import com.amae.smartcityparking.Repository.ParkingSpotRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ParkingLotService {
    private final ParkingLotRepository parkingLotRepository;
    private final ParkingSpotRepository parkingSpotRepository;

    public ParkingLotService(ParkingLotRepository parkingLotRepository, ParkingSpotRepository parkingSpotRepository) {
        this.parkingLotRepository = parkingLotRepository;
        this.parkingSpotRepository = parkingSpotRepository;
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
            parkingLot = parkingLotRepository.save(parkingLot);
            for (int i = 0; i < parkingLot.getTotalSpaces(); i++) {
                ParkingSpot new_spot = ParkingSpot.builder()
                        .lotId(parkingLot.getId())
                        .status(ParkingSpotStatus.fromString("AVAILABLE"))
                        .spotNumber(i)
                        .build();
                parkingSpotRepository.save(new_spot);
            }
            return ResponseEntity.ok(parkingLot);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Parking lot creation failed");
        }
    }

    public ResponseEntity<Object> getParkingLot(int id, UserDetails token) {
        try {
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
                    updatedParkingLot = parkingLotRepository.update(updatedParkingLot);
                    return ResponseEntity.ok(updatedParkingLot);
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

    public ResponseEntity<Object> getAllParkingLots(String address) {
        List<ParkingLot> parkingLots;
        parkingLots = parkingLotRepository.searchByAddress(address);
        Map<String, Object> response = new HashMap<>();
        response.put("size", parkingLots.size());
        response.put("items", parkingLots);
        return ResponseEntity.ok(response);
    }

}