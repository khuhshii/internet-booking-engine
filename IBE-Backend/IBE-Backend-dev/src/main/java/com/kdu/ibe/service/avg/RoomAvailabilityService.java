package com.kdu.ibe.service.avg;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.dto.response.RoomAvailabilityResponse;
import com.kdu.ibe.dto.roomdetails.RoomDetailWithAverageDTO;
import com.kdu.ibe.dto.roomdetails.RoomTypeDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@Service
public class RoomAvailabilityService {

    @Value("${graphql.url}")
    private String graphqlUrl;

    @Value("${graphql.api-key}")
    private String apiKey;

    @Value("${graphql.x-api-key}")
    private String xApiKey;

    private final RestTemplate restTemplate = new RestTemplate();


    public RoomDetailWithAverageDTO getRoomAvailabilities(int propertyId, String checkInDate, String checkOutDate) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey, apiKey);

        String query = String.format(
                "{ \"query\": \"query MyQuery { listRoomAvailabilities(where: {property_id: {equals: %1$d}, booking_id: {equals: 0},date: {gte: \\\"%2$s\\\", lte: \\\"%3$s\\\"}},take: 10000) { date room { room_id room_type { room_type_name area_in_square_feet double_bed max_capacity room_type_id single_bed} } } }\" }",
                propertyId,
                checkInDate,
                checkOutDate
        );

        HttpEntity<String> requestEntity = new HttpEntity<>(query, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                graphqlUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            try {
                return parseResponse(responseEntity.getBody());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return new RoomDetailWithAverageDTO();
    }

    private RoomDetailWithAverageDTO parseResponse(String responseBody) throws JsonProcessingException {
        List<RoomAvailabilityResponse.RoomAvailability> roomAvailabilities = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode responseJson = mapper.readTree(responseBody);
        JsonNode availabilitiesNode = responseJson.get("data").get("listRoomAvailabilities");

        Map<Integer,String> handleUniqueRooms = new HashMap<>();
        List<RoomTypeDTO> roomDetailsArray = new ArrayList<>();
        if (availabilitiesNode != null) {
        for (JsonNode availabilityNode : availabilitiesNode) {
            String date = availabilityNode.get("date").asText();
            JsonNode roomNode = availabilityNode.get("room");
            int roomID = roomNode.get("room_id").asInt();
            int roomTypeId = roomNode.get("room_type").get("room_type_id").asInt();


            String roomTypeName = roomNode.get("room_type").get("room_type_name").asText();


            if(!handleUniqueRooms.containsKey(roomTypeId)){
                handleUniqueRooms.put(roomTypeId,roomTypeName);
                roomDetailsArray.add(new RoomTypeDTO(roomTypeId,roomTypeName,roomNode.get("room_type").get("area_in_square_feet").asInt(),roomNode.get("room_type").get("single_bed").asInt(),roomNode.get("room_type").get("double_bed").asInt(),roomNode.get("room_type").get("max_capacity").asInt(),0.0,0,0.0,0));
            }

            RoomAvailabilityResponse.RoomType roomType = new RoomAvailabilityResponse.RoomType(roomTypeName);
            RoomAvailabilityResponse.RoomAvailability roomAvailability = new RoomAvailabilityResponse.RoomAvailability(date, new RoomAvailabilityResponse.Room(roomID, roomType));
            roomAvailabilities.add(roomAvailability);
        }



        }
        RoomDetailWithAverageDTO roomDetailWithAverageDTO = new RoomDetailWithAverageDTO(roomAvailabilities,roomDetailsArray);
//        return roomAvailabilities;
        return roomDetailWithAverageDTO;
    }

//    public Map<String, Integer> getMinimumAvailableRooms(int propertyId, String checkInDate, String checkOutDate) {
//        List<RoomAvailabilityResponse.RoomAvailability> availabilities=getRoomAvailabilities(propertyId,checkInDate,checkOutDate);
//        Map<String, Map<String, Integer>> roomsByDateAndType = new HashMap<>();
//
//        // Count the number of rooms available for each room type name on each date
//        for (RoomAvailabilityResponse.RoomAvailability availability : availabilities) {
//            String date = availability.getDate();
//            String roomTypeName = availability.getRoom().getRoomType().getRoomTypeName();
//
//            // Initialize the inner map if it doesn't exist
//            roomsByDateAndType.putIfAbsent(date, new HashMap<>());
//
//            // Increment the count for the room type name on the current date
//            roomsByDateAndType.get(date).put(roomTypeName, roomsByDateAndType.get(date).getOrDefault(roomTypeName, 0) + 1);
//        }
//
//        // Find the minimum number of available rooms for each room type name
//        Map<String, Integer> minAvailableRooms = new HashMap<>();
//        for (Map<String, Integer> roomsByType : roomsByDateAndType.values()) {
//            for (Map.Entry<String, Integer> entry : roomsByType.entrySet()) {
//                String roomTypeName = entry.getKey();
//                    int count = entry.getValue();
//                    minAvailableRooms.put(roomTypeName, Math.min(minAvailableRooms.getOrDefault(roomTypeName, Integer.MAX_VALUE), count));
//            }
//        }
//
//        return minAvailableRooms;
//    }
}
