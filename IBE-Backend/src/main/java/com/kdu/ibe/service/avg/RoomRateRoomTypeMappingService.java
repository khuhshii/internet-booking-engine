package com.kdu.ibe.service.avg;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.constants.Constants;
import com.kdu.ibe.dto.response.RoomRateRoomTypeMappingResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class RoomRateRoomTypeMappingService {

    @Value("${graphql.url}")
    private String graphqlUrl;

    @Value("${graphql.api-key}")
    private String apiKey;

    @Value("${graphql.x-api-key}")
    private String xApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public RoomRateRoomTypeMappingResponse fetchRoomRateRoomTypeMappings(int propertyId, String startDate, String endDate) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey, apiKey);

        String requestBody = String.format(
                "{ \"query\": \"query RoomRateQuery { listRoomRateRoomTypeMappings(where: {room_rate: {date: {gte: \\\"%s\\\", lte: \\\"%s\\\"}}, room_type: {property_id: {equals: %d}}},take: 10000) { room_rate { basic_nightly_rate date } room_type { room_type_name } } }\" }",
                startDate,
                endDate,
                propertyId);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                graphqlUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        log.info(responseEntity.getBody());
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                return mapper.readValue(responseEntity.getBody(), RoomRateRoomTypeMappingResponse.class);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
