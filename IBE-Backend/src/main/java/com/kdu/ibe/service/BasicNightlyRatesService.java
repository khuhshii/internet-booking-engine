package com.kdu.ibe.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.constants.Constants;
import com.kdu.ibe.dto.rates.RatesRequestDto;
import com.kdu.ibe.dto.rates.RoomRateDto;
import com.kdu.ibe.dto.response.RoomRatesResponseDTO;
import com.kdu.ibe.model.ratesmodel.RoomRate;
import com.kdu.ibe.model.ratesmodel.RoomType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;


/**
 * Service class for handling basic nightly rates.
 */
@Service
public class BasicNightlyRatesService {
    @Value("${graphql.url}")
    private String graphqlUrl;

    @Value("${graphql.api-key}")
    private String apiKey;
    @Value("${graphql.x-api-key}")
    private String xApiKey;
    private final RestTemplate restTemplate=new RestTemplate();

    /**
     * Retrieves room rate details from the GraphQL API.
     * @return RoomRatesResponseDTO containing the response data.
     */
    public RoomRatesResponseDTO getRoomRateDetails(){

        HttpHeaders headers=new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey,apiKey);
        String requestBody = "{ \"query\": \"" + Constants.NIGHTLY_RATES_QUERY + "\" }";

        HttpEntity<String> requestEntity=new HttpEntity<>(requestBody,headers);

        ResponseEntity<String> responseEntity=restTemplate.exchange(
                graphqlUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        if(responseEntity.getStatusCode().is2xxSuccessful()){
            try{
                ObjectMapper objectMapper=new ObjectMapper();
                return objectMapper.readValue(responseEntity.getBody(), RoomRatesResponseDTO.class);
            } catch (IOException e){
                e.printStackTrace();
            }
        }
        return null;
    }

    /**
     * Retrieves and calculates the minimum nightly rates.
     * @return Map containing minimum nightly rates mapped by date.
     */
    @Cacheable(value = "minimumNightlyRatesCache")
    public Map<String, Integer> getMinimumNightlyRates() {
        RoomRatesResponseDTO roomRatesResponseDTO= getRoomRateDetails();
        Map<String, Integer> minimumRatesMap = new TreeMap<>();

        if (roomRatesResponseDTO != null && roomRatesResponseDTO.getData() != null
                && roomRatesResponseDTO.getData().getProperty() != null
                && roomRatesResponseDTO.getData().getProperty().getRoomType() != null) {

            List<RoomType> roomTypes = roomRatesResponseDTO.getData().getProperty().getRoomType();

//            Uncomment the below code to send the rates for the next two months as a response
//            LocalDate startDate = LocalDate.now();
//            LocalDate endDate = LocalDate.now().plusMonths(2).plusDays(1); // Adding 2 months and 1 day


            for (RoomType roomType : roomTypes) {
                if (roomType.getRoomRates() != null) {
                    for (RoomRate roomRate : roomType.getRoomRates()) {
//                        LocalDate rateDate = LocalDate.parse(roomRate.getRateDetail().getDate().substring(0, 10));
//                        if (!rateDate.isBefore(startDate) && !rateDate.isAfter(endDate)) {

                            String date = roomRate.getRateDetail().getDate().substring(0, 10);
                            int basicNightlyRate = roomRate.getRateDetail().getBasicNightlyRate();

                            if (!minimumRatesMap.containsKey(date) || basicNightlyRate < minimumRatesMap.get(date)) {
                                minimumRatesMap.put(date, basicNightlyRate);
                            }
//                        }
                    }
                }
            }
        }

        return minimumRatesMap;
    }

    public Map<String, Double> getratesPerDay(RatesRequestDto ratesRequestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey, apiKey);
        String formattedQuery = String.format(Constants.RATESBYDATE,Integer.parseInt(ratesRequestDto.getRoomTypeId()),ratesRequestDto.getEndDate(),ratesRequestDto.getStartDate());
        String requestBody = "{ \"query\": \"" +formattedQuery + "\" }";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<JsonNode> responseEntity = restTemplate.exchange(
                graphqlUrl,
                HttpMethod.POST,
                requestEntity,
                JsonNode.class
        );

        if(responseEntity.getStatusCode().is2xxSuccessful()){
            JsonNode body = responseEntity.getBody();
            if (body != null) {
                JsonNode roomRatesNode = body.get("data").get("listRoomRates");

                Map<String, Double> ratesPerDay = new TreeMap<>();

                for (JsonNode roomRateNode : roomRatesNode) {
                    String date = roomRateNode.get("date").asText().substring(0, 10); // Extract date in "YYYY-MM-DD" format
                    double basicNightlyRate = roomRateNode.get("basic_nightly_rate").asDouble();
                    ratesPerDay.put(date, basicNightlyRate);
                }

                return ratesPerDay;
            }
        }

        return null;
    }
}