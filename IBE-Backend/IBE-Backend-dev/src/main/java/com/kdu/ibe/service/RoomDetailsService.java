package com.kdu.ibe.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.constants.Constants;
import com.kdu.ibe.dto.request.RoomDetailsRequestDTO;
import com.kdu.ibe.dto.response.GetFilterRoomsWithSizeResponseDTO;
import com.kdu.ibe.dto.response.GraphQLResponse;
import com.kdu.ibe.dto.reviewsRatings.RatingRequestDto;
import com.kdu.ibe.dto.reviewsRatings.ReviewsCountRatingsDto;
import com.kdu.ibe.dto.reviewsRatings.RoomTypeDto;
import com.kdu.ibe.dto.roomdetails.RoomAverageMinRoomsDTO;
import com.kdu.ibe.dto.roomdetails.RoomTypeDTO;
import com.kdu.ibe.service.avg.RoomAvailabilityService;
import com.kdu.ibe.service.avg.RoomRateAverageService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class RoomDetailsService {
    @Value("${graphql.url}")
    private String graphqlUrl;

    @Value("${graphql.api-key}")
    private String apiKey;

    @Value("${graphql.x-api-key}")
    private String xApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final RoomRateAverageService roomRateAverageService;
    private final RoomAvailabilityService roomAvailabilityService;

    private final RoomRatingService roomRatingService;

    @Autowired
    public RoomDetailsService(RoomRateAverageService roomRateAverageService, RoomAvailabilityService roomAvailabilityService, RoomRatingService roomRatingService) {
        this.roomRateAverageService = roomRateAverageService;
        this.roomAvailabilityService = roomAvailabilityService;
        this.roomRatingService = roomRatingService;
    }

    public List<RoomTypeDTO> getRoomDetails(){

        HttpHeaders headers=new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey,apiKey);
        String requestBody = "{ \"query\": \"" + Constants.ROOM_DETAILS_QUERY + "\" }";

        HttpEntity<String> requestEntity=new HttpEntity<>(requestBody,headers);

        ResponseEntity<String> responseEntity=restTemplate.exchange(
                graphqlUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        if(responseEntity.getStatusCode().is2xxSuccessful()){
            try{
                return parseRoomTypes(responseEntity.getBody());
//                return null;
            } catch (Exception e){
                e.printStackTrace();
            }
        }
        return null;
    }

    public static List<RoomTypeDTO> parseRoomTypes(String graphqlResponse) {
        List<RoomTypeDTO> roomTypes = new ArrayList<>();
        try {
            GraphQLResponse response = new ObjectMapper().readValue(graphqlResponse, GraphQLResponse.class);
            if (response != null && response.getData() != null && response.getData().getListRoomTypes() != null) {
                roomTypes = response.getData().getListRoomTypes();
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return roomTypes;
    }


    public GetFilterRoomsWithSizeResponseDTO parseAndFilterRoomTypes(String graphqlResponse,
                                                     int page,
                                                     int pageSize,
                                                     int propertyId,
                                                     String checkInDate,
                                                     String checkOutDate,
                                                     RoomDetailsRequestDTO request) {
        // Parse GraphQL response and filter room types based on the request
        List<RoomTypeDTO> roomTypes = parseRoomTypes(graphqlResponse, propertyId, checkInDate, checkOutDate, request);

        if(request.getPriceType().equals("low")){
            roomTypes.sort((room1, room2) -> Double.compare(room1.getMinRates(), room2.getMinRates()));
        }
        else if(request.getPriceType().equals("high")){
            roomTypes.sort((room1, room2) -> Double.compare(room2.getMinRates(), room1.getMinRates()));
        }
        // Apply pagination on the filtered room types
        int startIndex = (page - 1) * pageSize;
        int endIndex = Math.min(startIndex + pageSize, roomTypes.size());

        GetFilterRoomsWithSizeResponseDTO getFilterRoomsWithSizeResponseDTO = new GetFilterRoomsWithSizeResponseDTO(roomTypes.size(),roomTypes.subList(startIndex, endIndex));
        return getFilterRoomsWithSizeResponseDTO;
    }

    public GetFilterRoomsWithSizeResponseDTO getRoomDetailsPag(int page, int pageSize, int propertyId, String checkInDate, String checkOutDate, RoomDetailsRequestDTO request) {
        // Fetch GraphQL response
//        String graphqlResponse = fetchRoomDetailsFromGraphQL(propertyId, pageSize, page);

        // Filter and paginate room types
        return parseAndFilterRoomTypes("",page,pageSize, propertyId, checkInDate, checkOutDate, request);
    }

    private String fetchRoomDetailsFromGraphQL(int propertyId, int pageSize, int page) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey, apiKey);

        // Calculate skip based on page and pageSize
        int skip = (page - 1) * pageSize;

        // Construct GraphQL query with pagination parameters
        String requestBody = String.format("{ \"query\": \"{ listRoomTypes(where: {property_id: {equals: %d}}) { room_type_id room_type_name area_in_square_feet single_bed double_bed max_capacity } }\" }", propertyId);
        log.info("Request Body : {}", requestBody);
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Make REST call to GraphQL endpoint
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                graphqlUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        // Return GraphQL response body
        return responseEntity.getBody();
    }

    private List<RoomTypeDTO> parseRoomTypes(String graphqlResponse, int propertyId, String checkInDate, String checkOutDate, RoomDetailsRequestDTO request) {
        // Parse GraphQL response and filter room types based on the request
        RoomAverageMinRoomsDTO roomAverageMinRoomsDTO = roomRateAverageService.calculateRoomRateAverages(propertyId, checkInDate, checkOutDate);
        Map<String, Double> roomTypeAverages = roomAverageMinRoomsDTO.getRoomTypeAverages();
        Map<String, Integer> minRoomsCount = roomAverageMinRoomsDTO.getMinAvailableRooms();

        List<RoomTypeDTO> roomTypes = new ArrayList<>();
        double maxRate = request.getMaxRate();
        log.info("Max Rate: {}", maxRate);
        double minRate = request.getMinRate();
        log.info("Max Rate: {}", minRate);
        String[] roomFilter = request.getRoomType();
        log.info("Rooms {}", roomFilter);
        String[] bedType = request.getBedType();
        log.info("Bed {}", bedType);
        log.info(request.getRoomCount());
        log.info(request.getGuestCount());
//        try {
//            GraphQLResponse response = new ObjectMapper().readValue(graphqlResponse, GraphQLResponse.class);
//            if (response != null && response.getData() != null && response.getData().getListRoomTypes() != null) {
//                roomTypes = response.getData().getListRoomTypes();
                roomTypes = roomAverageMinRoomsDTO.getRoomTypeDetails();
                log.info("Before Filtering: {}", roomTypes);

                if(Integer.parseInt(request.getRoomCount())==0 || Integer.parseInt(request.getGuestCount())==0){
                    return new ArrayList<>();
                }

                if(Integer.parseInt(request.getRoomCount())!=0 && Integer.parseInt(request.getGuestCount())!=0){
                    int ceilValue = Integer.parseInt(request.getGuestCount())/Integer.parseInt(request.getRoomCount());
                    roomTypes.removeIf(roomTypeDTO -> roomTypeDTO.getMaxCapacity()<ceilValue);
                }

                if (maxRate != Double.MAX_VALUE) {
                    roomTypes.removeIf(roomTypeDTO -> roomTypeAverages.getOrDefault(roomTypeDTO.getRoomTypeName(), 0.0) > maxRate);
                }
                if (maxRate != Double.MIN_VALUE) {
                    roomTypes.removeIf(roomTypeDTO -> roomTypeAverages.getOrDefault(roomTypeDTO.getRoomTypeName(), 0.0) < minRate);
                }
                if (roomFilter != null && roomFilter.length != 2 && roomFilter.length!=0) {
                    roomTypes = roomTypes.stream()
                            .filter(roomTypeDTO -> Arrays.stream(roomFilter).anyMatch(roomType ->
                                    roomTypeDTO.getRoomTypeName().toUpperCase().contains(roomType.toUpperCase())))
                            .collect(Collectors.toList());
                }
                if (bedType != null && bedType.length != 0) {
                    roomTypes = roomTypes.stream()
                            .filter(roomTypeDTO -> Arrays.asList(bedType).stream().anyMatch(bed ->
                                    roomTypeDTO.getSingleBed() > 0 && bed.equalsIgnoreCase("Queen") ||
                                            roomTypeDTO.getDoubleBed() > 0 && bed.equalsIgnoreCase("King")))
                            .collect(Collectors.toList());
                }
                // Filter room types based on request criteria
                // Apply filters as per your existing logic here

                // Update minRates and minRoomCount for each room type
                // This part can be moved to a separate method if needed
//                for (RoomTypeDTO roomType : roomTypes) {
//                    double minRatesPerNight = roomTypeAverages.getOrDefault(roomType.getRoomTypeName(), 0.0);
//                    roomType.setMinRates(minRatesPerNight);
//
//                    int count = minRoomsCount.getOrDefault(roomType.getRoomTypeName(), 0);
//                    roomType.setMinRoomCount(count);
//
//                    RatingRequestDto ratingRequestDto = new RatingRequestDto();
//                    ratingRequestDto.setTenantId("1");
//                    ratingRequestDto.setPropertyId(String.valueOf(propertyId));
//                    ratingRequestDto.setRoomTypeId(String.valueOf(roomType.getRoomTypeId()));
//
//                    ReviewsCountRatingsDto reviewsCountRatingsDto = roomRatingService.getReviewCount(ratingRequestDto);
//                    if(reviewsCountRatingsDto!=null) {
//                        roomType.setRatings(reviewsCountRatingsDto.getRatings());
//                        roomType.setCount(reviewsCountRatingsDto.getCount());
//                    }
//                }

        List<Callable<Void>> ratingTasks = new ArrayList<>();

        for (RoomTypeDTO roomType : roomTypes) {
            Callable<Void> ratingTask = () -> {
                double minRatesPerNight = roomTypeAverages.getOrDefault(roomType.getRoomTypeName(), 0.0);
                roomType.setMinRates(minRatesPerNight);

                int count = minRoomsCount.getOrDefault(roomType.getRoomTypeName(), 0);
                roomType.setMinRoomCount(count);

                RatingRequestDto ratingRequestDto = new RatingRequestDto();
                ratingRequestDto.setTenantId("1");
                ratingRequestDto.setPropertyId(String.valueOf(propertyId));
                ratingRequestDto.setRoomTypeId(String.valueOf(roomType.getRoomTypeId()));

                ReviewsCountRatingsDto reviewsCountRatingsDto = roomRatingService.getReviewCount(ratingRequestDto);
                if(reviewsCountRatingsDto != null) {
                    roomType.setRatings(reviewsCountRatingsDto.getRatings());
                    roomType.setCount(reviewsCountRatingsDto.getCount());
                }

                return null;
            };
            ratingTasks.add(ratingTask);
        }

// Create ExecutorService with a number of threads equal to the number of room types
        ExecutorService executorService = Executors.newFixedThreadPool(roomTypes.size());

        try {
            // Submit tasks for execution
            List<Future<Void>> futures = executorService.invokeAll(ratingTasks);

            // Wait for all tasks to complete
            for (Future<Void> future : futures) {
                future.get(); // This waits for the task to complete
            }

        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions
            e.printStackTrace();
        } finally {
            // Shut down the executor service
            executorService.shutdown();
        }


        if(request.getRoomCount()!=null && Integer.parseInt((request.getRoomCount()))!=0){
                    roomTypes.removeIf(roomTypeDTO -> roomTypeDTO.getMinRoomCount()<Integer.parseInt(request.getRoomCount()));
                }

                if(request.getBedCount()<4){
                    roomTypes.removeIf(roomTypeDTO -> roomTypeDTO.getDoubleBed()+roomTypeDTO.getSingleBed()<request.getBedCount());
                }


                log.info("After Filtering: {}", roomTypes);
//            }
//        } catch (JsonProcessingException e) {
//            log.error("Error parsing GraphQL response: {}", e.getMessage());
//            e.printStackTrace();
//        }
        return roomTypes;
    }


}