package com.kdu.ibe.service.avg;

import com.kdu.ibe.dto.response.RoomAvailabilityResponse;
import com.kdu.ibe.dto.response.RoomRateRoomTypeMappingResponse;
import com.kdu.ibe.dto.roomdetails.RoomAverageMinRoomsDTO;
import com.kdu.ibe.dto.roomdetails.RoomDetailWithAverageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
public class RoomRateAverageService {

    private final RoomRateRoomTypeMappingService roomRateRoomTypeMappingService;
    private final RoomAvailabilityService roomAvailabilityService;

    Map<String, Integer> minRoomsCount;

    @Autowired
    public RoomRateAverageService(RoomRateRoomTypeMappingService roomRateRoomTypeMappingService, RoomAvailabilityService roomAvailabilityService) {
        this.roomRateRoomTypeMappingService = roomRateRoomTypeMappingService;
        this.roomAvailabilityService = roomAvailabilityService;
    }

    public RoomAverageMinRoomsDTO calculateRoomRateAverages(
            int propertyId,
            String checkInDate,
            String checkOutDate) {
        Map<String, Double> roomTypeAverages = new HashMap<>();

        ExecutorService executorService = Executors.newFixedThreadPool(2);


        Future<List<RoomRateRoomTypeMappingResponse.RoomRateRoomTypeMapping>> roomRateFuture = executorService.submit(() -> {
            return roomRateRoomTypeMappingService.fetchRoomRateRoomTypeMappings(propertyId, checkInDate, checkOutDate)
                    .getListRoomRateRoomTypeMappings();
        });

        // Future for room availabilities
        Future<RoomDetailWithAverageDTO> availabilityFuture = executorService.submit(() -> {
            return roomAvailabilityService.getRoomAvailabilities(propertyId, checkInDate, checkOutDate);
        });

        try {
            // Wait for both tasks to complete
            List<RoomRateRoomTypeMappingResponse.RoomRateRoomTypeMapping> roomRateRoomTypeMappings = roomRateFuture.get();
//            List<RoomAvailabilityResponse.RoomAvailability> roomAvailabilities = availabilityFuture.get();
            RoomDetailWithAverageDTO roomDetailWithAverageDTO = availabilityFuture.get();
            List<RoomAvailabilityResponse.RoomAvailability> roomAvailabilities=roomDetailWithAverageDTO.getAvailabilities();



//        // Fetch room rate room type mappings
//        List<RoomRateRoomTypeMappingResponse.RoomRateRoomTypeMapping> roomRateRoomTypeMappings =
//                roomRateRoomTypeMappingService.fetchRoomRateRoomTypeMappings(propertyId,checkInDate,checkOutDate)
//                        .getListRoomRateRoomTypeMappings();
//
//        // Fetch room availabilities
//        List<RoomAvailabilityResponse.RoomAvailability> roomAvailabilities =
//                roomAvailabilityService.getRoomAvailabilities(propertyId,checkInDate,checkOutDate);

        // Collect unique room types
        Set<String> uniqueRoomTypes = new HashSet<>();
        for (RoomRateRoomTypeMappingResponse.RoomRateRoomTypeMapping mapping : roomRateRoomTypeMappings) {
            uniqueRoomTypes.add(mapping.getRoomType().getRoomTypeName());
        }

        // Calculate minimum rates for each date and room type
        Map<LocalDate, Map<String, Double>> minimumRatesByDateAndRoomType = new HashMap<>();
        for (RoomRateRoomTypeMappingResponse.RoomRateRoomTypeMapping mapping : roomRateRoomTypeMappings) {
            LocalDate date = LocalDate.parse(mapping.getRoomRate().getDate().substring(0, 10));
            String roomTypeName = mapping.getRoomType().getRoomTypeName();
            double rate = mapping.getRoomRate().getBasicNightlyRate();

            if (!minimumRatesByDateAndRoomType.containsKey(date)) {
                minimumRatesByDateAndRoomType.put(date, new HashMap<>());
            }
            if (!minimumRatesByDateAndRoomType.get(date).containsKey(roomTypeName) || rate < minimumRatesByDateAndRoomType.get(date).get(roomTypeName)) {
                minimumRatesByDateAndRoomType.get(date).put(roomTypeName, rate);
            }
        }

        // Check room availability for each room type
        for (RoomAvailabilityResponse.RoomAvailability availability : roomAvailabilities) {
            String roomTypeName = availability.getRoom().getRoomType().getRoomTypeName();
            LocalDate date = LocalDate.parse(availability.getDate().substring(0, 10));

            // Check if the room ID is available for the given date
            if (!minimumRatesByDateAndRoomType.containsKey(date)) {
                minimumRatesByDateAndRoomType.put(date, new HashMap<>());
            }
            if (!minimumRatesByDateAndRoomType.get(date).containsKey(roomTypeName)) {
                minimumRatesByDateAndRoomType.get(date).put(roomTypeName, null); // Room is not available
            }
        }

        // Calculate averages
        Map<String, Double> totalRates = new HashMap<>();
        Map<String, Integer> roomTypeCount = new HashMap<>();
        for (Map.Entry<LocalDate, Map<String, Double>> entry : minimumRatesByDateAndRoomType.entrySet()) {
            LocalDate date = entry.getKey();
            Map<String, Double> ratesByRoomType = entry.getValue();

            for (Map.Entry<String, Double> rateEntry : ratesByRoomType.entrySet()) {
                String roomTypeName = rateEntry.getKey();
                Double rate = rateEntry.getValue();

                // Skip if room is not available
                if (rate == null) {
                    continue;
                }

                totalRates.put(roomTypeName, totalRates.getOrDefault(roomTypeName, 0.0) + rate);
                roomTypeCount.put(roomTypeName, roomTypeCount.getOrDefault(roomTypeName, 0) + 1);
            }
        }

        // Calculate averages
        for (String roomTypeName : uniqueRoomTypes) {
            double averageRate = totalRates.getOrDefault(roomTypeName, 0.0) / roomTypeCount.getOrDefault(roomTypeName, 1);
            roomTypeAverages.put(roomTypeName, averageRate);
        }


        Map<String, Map<String, Integer>> roomsByDateAndType = new HashMap<>();

        // Count the number of rooms available for each room type name on each date
        for (RoomAvailabilityResponse.RoomAvailability availability : roomAvailabilities) {
            String date = availability.getDate();
            String roomTypeName = availability.getRoom().getRoomType().getRoomTypeName();

            // Initialize the inner map if it doesn't exist
            roomsByDateAndType.putIfAbsent(date, new HashMap<>());

            // Increment the count for the room type name on the current date
            roomsByDateAndType.get(date).put(roomTypeName, roomsByDateAndType.get(date).getOrDefault(roomTypeName, 0) + 1);
        }




        // Find the minimum number of available rooms for each room type name
        Map<String, Integer> minAvailableRooms = new HashMap<>();
        Map<String,Integer> roomTypeCountDay = new HashMap<>();
        for (Map<String, Integer> roomsByType : roomsByDateAndType.values()) {
            for (Map.Entry<String, Integer> entry : roomsByType.entrySet()) {
                String roomTypeName = entry.getKey();
                roomTypeCountDay.put(roomTypeName, roomTypeCountDay.getOrDefault(roomTypeName,0)+1);
                int count = entry.getValue();
                minAvailableRooms.put(roomTypeName, Math.min(minAvailableRooms.getOrDefault(roomTypeName, Integer.MAX_VALUE), count));
            }
        }

        for(Map.Entry<String, Integer> entry : roomTypeCountDay.entrySet()){
            if(entry.getValue()< roomsByDateAndType.size()){
                minAvailableRooms.put(entry.getKey(), 0);
            }
        }


        RoomAverageMinRoomsDTO roomAverageMinRoomsDTO = new RoomAverageMinRoomsDTO();
        roomAverageMinRoomsDTO.setRoomTypeAverages(roomTypeAverages);
        roomAverageMinRoomsDTO.setMinAvailableRooms(minAvailableRooms);
        roomAverageMinRoomsDTO.setRoomTypeDetails(roomDetailWithAverageDTO.getRoomDetailsArray());



        return roomAverageMinRoomsDTO;

        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions
            e.printStackTrace();
            RoomAverageMinRoomsDTO roomAverageMinRoomsDTO = new RoomAverageMinRoomsDTO();
            return roomAverageMinRoomsDTO;
        } finally {
            // Shutdown the executor service
            executorService.shutdown();
        }


    }

}