package com.kdu.ibe.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.kdu.ibe.dto.bookings.BookingRequestDTO;
import com.kdu.ibe.dto.bookings.PreBookingDTO;
import com.kdu.ibe.entity.PreBookingEntity;
import com.kdu.ibe.exception.customExceptions.InvalidZipCodeException;
import com.kdu.ibe.repository.PreBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {



    private final RestTemplate restTemplate;

    private final PreBookingRepository preBookingRepository;
    @Autowired
    public BookingService(RestTemplateBuilder restTemplateBuilder,PreBookingRepository preBookingRepository){
        this.restTemplate = restTemplateBuilder.build();
        this.preBookingRepository=preBookingRepository;
    }
    private String buildUrlWithParams(String url, Map<String, String> params) {
        StringBuilder sb = new StringBuilder(url);
        sb.append("?");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            sb.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
        }
        sb.deleteCharAt(sb.length() - 1); // Remove the last "&"
        return sb.toString();
    }

//    public boolean validateZipCode(String zipCode, String city, String state){
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("X-RapidAPI-Key", API_KEY);
//        headers.add("X-RapidAPI-Host","global-zip-codes-with-lat-and-lng.p.rapidapi.com");
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // Build query parameters
//        Map<String, String> queryParams = new HashMap<>();
//        queryParams.put("code", zipCode);
//
//        ResponseEntity<JsonNode> responseEntity = restTemplate.exchange(
//                buildUrlWithParams(API_URL, queryParams),
//                HttpMethod.GET,
//                new org.springframework.http.HttpEntity<>(headers),
//                JsonNode.class
//        );
//        JsonNode body = responseEntity.getBody();
//        if (body == null || !body.isArray() || body.size() == 0) {
//            return false;
//        }
//
//        JsonNode firstResult = body.get(0);
//        if (firstResult == null) {
//            return false;
//        }
//
//        String stateFromResponse = (firstResult.get("state").asText());
//        String cityFromResponse = (firstResult.get("district").asText());
//
//        return stateFromResponse.equalsIgnoreCase(state) && cityFromResponse.equalsIgnoreCase(city);
//    }

    public void makeBooking(BookingRequestDTO bookingRequestDTO){
        String city= bookingRequestDTO.getBillingInfo().getCity();
        String state= bookingRequestDTO.getBillingInfo().getState();
        String zip = bookingRequestDTO.getBillingInfo().getZipCode();

//        if(!validateZipCode(zip,city,state)){
//            throw new InvalidZipCodeException();
//        }

        // Validate check-in and check-out dates
        String checkInDateStr = bookingRequestDTO.getItineraryInfo().getCheckInDate();
        String checkOutDateStr = bookingRequestDTO.getItineraryInfo().getCheckOutDate();

        try {
            LocalDate checkInDate = LocalDate.parse(checkInDateStr);
            LocalDate checkOutDate = LocalDate.parse(checkOutDateStr);

            if (checkInDate.isAfter(checkOutDate)) {
                throw new IllegalArgumentException("Check-out date must be after check-in date");
            }
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format for check-in or check-out date");
        }

        
    }

    public String testBooking(PreBookingDTO preBookingDTO){
        List<PreBookingEntity> preBookingEntities = preBookingRepository.findByRoomTypeId(preBookingDTO.getRoomTypeId());

            Date preBookingCheckInDate = Date.valueOf(preBookingDTO.getCheckInDate());
            Date preBookingCheckOutDate = Date.valueOf(preBookingDTO.getCheckOutDate());

            for (PreBookingEntity preBookingEntity : preBookingEntities) {
                Date checkInDate = preBookingEntity.getCheckInDate();
                Date checkOutDate = preBookingEntity.getCheckOutDate();

                // Check for overlap
                if (!(preBookingCheckOutDate.before(checkInDate) || preBookingCheckInDate.after(checkOutDate))) {
                    // Overlap found
                    return "Booking failed";
                }
            }
            // No overlap found
        PreBookingEntity preBookingEntity = new PreBookingEntity();
            preBookingEntity.setCheckInDate(preBookingCheckInDate);
            preBookingEntity.setCheckOutDate(preBookingCheckOutDate);
            preBookingEntity.setRoomTypeId(preBookingDTO.getRoomTypeId());
            preBookingEntity.setPropertyId(preBookingDTO.getPropertyId());
            preBookingEntity.setRoomId(1);
            preBookingRepository.save(preBookingEntity);
            return "Booking accepted";
    }
}
