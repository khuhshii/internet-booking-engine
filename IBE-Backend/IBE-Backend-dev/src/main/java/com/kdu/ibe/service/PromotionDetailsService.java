package com.kdu.ibe.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.constants.Constants;
import com.kdu.ibe.dto.promotion.PromotionTypeDTO;
import com.kdu.ibe.dto.request.PromotionRequestDto;
import com.kdu.ibe.exception.customExceptions.WrongDatesError;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PromotionDetailsService {
    @Value("${graphql.url}")
    private String graphqlUrl;

    @Value("${graphql.api-key}")
    private String apiKey;
    @Value("${graphql.x-api-key}")
    private String xApiKey;

    private final String DATE_FORMAT ="yyyy-MM-dd";
    private final RestTemplate restTemplate=new RestTemplate();
    public List<PromotionTypeDTO> getPromotionDetails(){

        HttpHeaders headers=new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey,apiKey);
        String requestBody = "{ \"query\": \"" + Constants.PROMOTIONS_QUERY + "\" }";

        HttpEntity<String> requestEntity=new HttpEntity<>(requestBody,headers);

        ResponseEntity<String> responseEntity=restTemplate.exchange(
                graphqlUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        if(responseEntity.getStatusCode().is2xxSuccessful()){
            try{
                return parseGraphQLResponse(responseEntity.getBody());
            } catch (Exception e){
                e.printStackTrace();
            }
        }
        return null;
    }


    public static boolean isValidDateFormat(String dateStr, String dateFormat) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(dateFormat);
            LocalDate.parse(dateStr, formatter);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }

    public static boolean isValidDateRange(String checkInDateStr, String checkOutDateStr, String dateFormat) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(dateFormat);
        LocalDate checkInDate = LocalDate.parse(checkInDateStr, formatter);
        LocalDate checkOutDate = LocalDate.parse(checkOutDateStr, formatter);

        // Check if check-in date is before check-out date
        return !checkOutDate.isBefore(checkInDate);
    }

    private int calculateStayDuration(String checkInDateStr, String checkOutDateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        LocalDate checkInDate = LocalDate.parse(checkInDateStr, formatter);
        LocalDate checkOutDate = LocalDate.parse(checkOutDateStr, formatter);

        return (int) checkInDate.until(checkOutDate).getDays();
    }

    private boolean isValidLongWeekend(String checkInDateStr, String checkOutDateStr) {
        // Check if the stay duration includes a long weekend (Friday, Saturday, Sunday)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        LocalDate checkInDate = LocalDate.parse(checkInDateStr, formatter);
        LocalDate checkOutDate = LocalDate.parse(checkOutDateStr, formatter);

        // Calculate the stay duration
        int stayDuration = (int) checkInDate.until(checkOutDate).getDays();

        // Check if stay duration is at least 3 days
        if (stayDuration >= 3) {
            LocalDate current = checkInDate;

            while (!current.isAfter(checkOutDate)) {
                if (current.getDayOfWeek() == DayOfWeek.FRIDAY && current.plusDays(2).isBefore(checkOutDate)) {
                    return true; // Long weekend found
                }
                current = current.plusDays(1);
            }
        }
        return false;
    }

    private boolean isValidWeekend(String checkInDateStr, String checkOutDateStr) {
        // Check if the stay duration includes a weekend (Saturday, Sunday)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        LocalDate checkInDate = LocalDate.parse(checkInDateStr, formatter);
        LocalDate checkOutDate = LocalDate.parse(checkOutDateStr, formatter);
        LocalDate current = checkInDate;

        while (!current.isAfter(checkOutDate)) {
            if (current.getDayOfWeek() == DayOfWeek.SATURDAY || current.getDayOfWeek() == DayOfWeek.SUNDAY) {
                return true; // Weekend found
            }
            current = current.plusDays(1);
        }
        return false;
    }

    public PromotionTypeDTO getBestPromotion(PromotionRequestDto promotionRequestDto){
        List<PromotionTypeDTO> validPromotions =  getValidatedPromotionDetails(promotionRequestDto);
        Double priceFactor = Double.MAX_VALUE;

        PromotionTypeDTO promotionTypeDTO=null;

        for(int i =0;i<validPromotions.size();i++){
            if(validPromotions.get(i).getPriceFactor()<priceFactor){
                priceFactor=validPromotions.get(i).getPriceFactor();
                promotionTypeDTO=validPromotions.get(i);
            }
        }

        return promotionTypeDTO;
    }


    public List<PromotionTypeDTO> getValidatedPromotionDetails(PromotionRequestDto promotionRequestDto){


        String dateFormat = DATE_FORMAT;
        if (isValidDateFormat(promotionRequestDto.getCheckInDate(), dateFormat) && isValidDateFormat(promotionRequestDto.getCheckOutDate(), dateFormat)) {
            if (isValidDateRange(promotionRequestDto.getCheckInDate(), promotionRequestDto.getCheckOutDate(), dateFormat)) {
                HttpHeaders headers=new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.set(xApiKey,apiKey);
                String requestBody = "{ \"query\": \"" + Constants.PROMOTIONS_QUERY + "\" }";

                HttpEntity<String> requestEntity=new HttpEntity<>(requestBody,headers);

                ResponseEntity<String> responseEntity=restTemplate.exchange(
                        graphqlUrl,
                        HttpMethod.POST,
                        requestEntity,
                        String.class
                );

                if(responseEntity.getStatusCode().is2xxSuccessful()){
                    try{
                        List<PromotionTypeDTO> parsedResponse = parseGraphQLResponse(responseEntity.getBody());

                        List<PromotionTypeDTO> validPromotions = new ArrayList<>();
                        int stayDuration = calculateStayDuration(promotionRequestDto.getCheckInDate(), promotionRequestDto.getCheckOutDate());
                        for (PromotionTypeDTO promotion : parsedResponse) {

                            if(!promotion.isDeactivated()) {
                                if(promotion.getPromotionTitle().equals("SENIOR_CITIZEN_DISCOUNT")){
                                    if(promotion.getMinimumDaysOfStay() <= stayDuration && promotionRequestDto.getSeniorCitizen()>0){
                                        validPromotions.add(promotion);
                                    }
                                }
                                else if (promotion.getPromotionTitle().equals("Long weekend discount")) {
                                    if (promotion.getMinimumDaysOfStay() <= stayDuration && isValidLongWeekend(promotionRequestDto.getCheckInDate(), promotionRequestDto.getCheckOutDate())) {
                                            validPromotions.add(promotion);
                                    }
                                } else if (promotion.getPromotionTitle().equals("Weekend discount")) {
                                    if (promotion.getMinimumDaysOfStay() <= stayDuration && isValidWeekend(promotionRequestDto.getCheckInDate(), promotionRequestDto.getCheckOutDate())) {
                                        validPromotions.add(promotion);
                                    }
                                } else if (promotion.getMinimumDaysOfStay() <= stayDuration) {
                                    validPromotions.add(promotion);
                                }
                            }
                        }

                        return validPromotions;
                    } catch (Exception e){
                        e.printStackTrace();
                    }
                }
            } else {
               throw new WrongDatesError();
            }
        } else {
            throw new WrongDatesError();
        }

        return null;
    }
    public static List<PromotionTypeDTO> parseGraphQLResponse(String graphQLResponse) {
        List<PromotionTypeDTO> promotions = new ArrayList<>();
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(graphQLResponse);
            JsonNode promotionsNode = rootNode.path("data").path("listPromotions");
            for (JsonNode promotionNode : promotionsNode) {
                PromotionTypeDTO promotion = mapper.treeToValue(promotionNode, PromotionTypeDTO.class);
                promotions.add(promotion);
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return promotions;
    }
}
