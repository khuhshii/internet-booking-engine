package com.kdu.ibe.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.dto.bookings.RoomIdRequestDTO;
import com.kdu.ibe.dto.bookings.RoomIdResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class RoomService {

    @Value("${graphql.url}")
    private String graphqlUrl;

    @Value("${graphql.api-key}")
    private String apiKey;
    @Value("${graphql.x-api-key}")
    private String xApiKey;

    public static final String GET_ROOM_IDS_QUERY = "{ listRoomAvailabilities( orderBy: {room_id: ASC}, where: {date: {gte:" +
            " \\\"%1$sT00:00:00.000Z\\\", lte: \\\"%2$sT00:00:00.000Z\\\"}, room: {room_type_id: {equals: %3$d}}," +
            " booking_id: {equals: 0}, property_id: {equals: %4$d}} take: 1000 ) { room_id } }";

    RestTemplate restTemplate;

    public RoomService(RestTemplateBuilder restTemplateBuilder){
        this.restTemplate=restTemplateBuilder.build();
    }

    public RoomIdResponseDTO getRoomIds(RoomIdRequestDTO roomIdRequestDTO) {
        String startDate = roomIdRequestDTO.getStartDate();
        String endDate = roomIdRequestDTO.getEndDate();
        Long roomTypeId = roomIdRequestDTO.getRoomTypeId();
        Long propertyId = roomIdRequestDTO.getPropertyId();
        Long roomCount= roomIdRequestDTO.getRoomCount();

        System.out.println(startDate + "," + endDate + "," + roomTypeId + "," + propertyId + "," + roomCount + ",===================");


        String GET_ROOM_IDS = String.format(GET_ROOM_IDS_QUERY, startDate, endDate, roomTypeId, propertyId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey, apiKey);
        String requestBody = "{ \"query\": \"" + GET_ROOM_IDS + "\" }";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(graphqlUrl, HttpMethod.POST, requestEntity, String.class);

        System.out.println(responseEntity.getBody()+"====================body");

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String jsonResponse = responseEntity.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode root = objectMapper.readTree(jsonResponse);
                JsonNode roomIdData = root.path("data").path("listRoomAvailabilities");

                Map<Integer, Integer> roomIdCountMap = new HashMap<>();
                int currentRoomId = -1;
                int count = 0;

                for (JsonNode roomNode : roomIdData) {
                    int roomId = roomNode.path("room_id").asInt();
                    if (roomId != currentRoomId) {
                        if (currentRoomId != -1) {
                            roomIdCountMap.put(currentRoomId, count);
                        }
                        currentRoomId = roomId;
                        count = 1;
                    } else {
                        count++;
                    }
                }
                if (currentRoomId != -1) {
                    roomIdCountMap.put(currentRoomId, count);
                }

                List<Integer> roomIds = new ArrayList<>();

                LocalDate start = LocalDate.parse(startDate);
                LocalDate end = LocalDate.parse(endDate);
                long numberOfDays = ChronoUnit.DAYS.between(start, end);

                System.out.println("room count map ============"+roomIdCountMap);

                for (Map.Entry<Integer, Integer> entry : roomIdCountMap.entrySet()) {
                    if (entry.getValue() >= numberOfDays) {
                        roomIds.add(entry.getKey());
                    }
                }

                System.out.println(roomIds+"================");

                if (roomIds.size() < roomCount) {
                    return new RoomIdResponseDTO(new ArrayList<>());
                }
                return new RoomIdResponseDTO(roomIds);
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse rooms' ids response.");
            }
        } else {
            throw new RuntimeException("Failed to fetch rooms' ids. Please check the API again.");
        }
    }
}
