package com.kdu.ibe.service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kdu.ibe.dto.bookings.BookingFinalRequestDTO;
import com.kdu.ibe.dto.bookings.RoomIdRequestDTO;
import com.kdu.ibe.entity.GuestUserEntity;
import com.kdu.ibe.entity.PreBookingCompositeKey;
import com.kdu.ibe.entity.TemporaryPreBookingEntity;
import com.kdu.ibe.entity.bookings.BookingEntity;
import com.kdu.ibe.entity.bookings.LogInUsers;
import com.kdu.ibe.entity.bookings.OtpEntity;
import com.kdu.ibe.entity.bookings.SubscribedUsersEntity;
import com.kdu.ibe.exception.customExceptions.*;
import com.kdu.ibe.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
@Slf4j
public class ConcurrentBookingService {


    public static final String CREATE_BOOKING_QUERY = "mutation { createBooking(data: {check_in_date: \\\"%1$sT00:00:00.000Z\\\", check_out_date: \\\"%2$sT00:00:00.000Z\\\", adult_count: %3$d, child_count: %4$d, total_cost: %5$d, amount_due_at_resort: %6$d, booking_status: {connect: {status_id: %7$d}}, guest: {connect: {guest_id: %8$d}}, promotion_applied: {connect: {promotion_id: %9$d}}, property_booked: {connect: {property_id: %10$d}}, room_booked: {connect: {availability_id: %11$d}}}) { booking_id } }";
    public static final String CREATE_GUEST_QUERY = "mutation { createGuest(data: {guest_name: \\\"%s\\\"}) { guest_id } }";
    public static final String GET_SELECTED_ROOM_AVAILABILITIES_QUERY = "{ listRoomAvailabilities( where: {date: {gte: \\\"%sT00:00:00.000Z\\\", lte: \\\"%sT00:00:00.000Z\\\"}, property_id: {equals: %d}, room_id: {equals: %d}, booking_id: {equals: 0}} ) { availability_id } }";
    public static final String UPDATE_ROOM_AVAILABILITY_QUERY = "mutation{updateRoomAvailability(where: {availability_id: %1$d} data: {booking: {connect: {booking_id: %2$d}, update: {booking_id: %3$d}}}) { booking_id }}";

    public static final String CREATE_BOOKING_WITHOUT_PROMO = "mutation { createBooking(data: {check_in_date: \\\"%1$sT00:00:00.000Z\\\", check_out_date: \\\"%2$sT00:00:00.000Z\\\", adult_count: %3$d, child_count: %4$d, total_cost: %5$d, amount_due_at_resort: %6$d, booking_status: {connect: {status_id: %7$d}}, guest: {connect: {guest_id: %8$d}}, property_booked: {connect: {property_id: %9$d}}, room_booked: {connect: {availability_id: %10$d}}}) { booking_id } }";

    public static final String UPDATE_BOOKING_QUERY = "mutation { updateBooking(where: {booking_id: %1$d} data: {booking_status: {connect: {status_id: 2}, update: {status_id: 2}}}){ booking_id } }";

    public static final String GET_AVAILABILITIES_BY_BOOKING_ID_QUERY = " { listRoomAvailabilities(where: {booking_id: {equals: %d}}) { availability_id } }";
    private final RestTemplate restTemplate = new RestTemplate();
    private final TemporaryPreBookingRepository bookingCheckRepository;
    private final GuestUserService guestUserService;

    @Value("${graphql.url}")
    private String graphqlUrl;

    @Value("${graphql.api-key}")
    private String apiKey;

    @Value("${graphql.x-api-key}")
    private String xApiKey;
    private final RoomService roomService;

    private final StoreBookingService storeBookingService;

    private final EmailService emailService;

    private final BookingRepository bookingRepository;

    private static final int OTP_LENGTH = 6;

    private final OtpRepository otpRepository;

    private final LogInUsersRepository logInUsersRepository;

    private final SubscribedUserRepository subscribedUserRepository;

    private final TokenValidationService tokenValidationService;

    @Autowired
    public ConcurrentBookingService(TemporaryPreBookingRepository bookingCheckRepository, GuestUserService guestUserService, RoomService roomService, StoreBookingService storeBookingService, EmailService emailService,BookingRepository bookingRepository,OtpRepository otpRepository, LogInUsersRepository logInUsersRepository,SubscribedUserRepository subscribedUserRepository, TokenValidationService tokenValidationService) {
        this.bookingCheckRepository = bookingCheckRepository;
        this.guestUserService = guestUserService;
        this.roomService = roomService;
        this.storeBookingService=storeBookingService;
        this.emailService = emailService;
        this.bookingRepository = bookingRepository;
        this.otpRepository = otpRepository;
        this.logInUsersRepository=logInUsersRepository;
        this.subscribedUserRepository=subscribedUserRepository;
        this.tokenValidationService=tokenValidationService;
    }

    public static String generateToken(int length) {
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder token = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(charset.length());
            token.append(charset.charAt(randomIndex));
        }

        return token.toString();
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


    public void cancelBooking(Long bookingId) {
        updateBooking(bookingId);
        List<Long> availabilityIdsForBookingId = getAvailabilityIdsForBookingId(bookingId);

        if(availabilityIdsForBookingId.isEmpty()){
            throw new BookingCancelledException();
        }

        for(Long availabilityId: availabilityIdsForBookingId){
            updateRoomAvailability(availabilityId, 0L);
        }
        BookingEntity bookingEntity = bookingRepository.findById(bookingId).orElse(null);
        if(bookingEntity!=null){
            bookingEntity.setCancelled(true);
            System.out.println(bookingEntity.isCancelled());
            bookingRepository.save(bookingEntity);
        }
    }

    private List<Long> getAvailabilityIdsForBookingId(Long bookingId) {
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", apiKey);

        String GET_AVAILABILITIES_BY_BOOKING_ID = String.format(GET_AVAILABILITIES_BY_BOOKING_ID_QUERY, bookingId);
        String requestBody = "{ \"query\": \"" + GET_AVAILABILITIES_BY_BOOKING_ID + "\" }";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);



        ResponseEntity<String> responseEntity = restTemplate.exchange(graphqlUrl, HttpMethod.POST, requestEntity, String.class);
        List<Long> roomAvailabilities = new ArrayList<>();
        System.out.println(responseEntity);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String jsonResponse = responseEntity.getBody();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode root = objectMapper.readTree(jsonResponse);
                JsonNode roomAvailabilitiesData = root.path("data").path("listRoomAvailabilities");

                for (JsonNode availability : roomAvailabilitiesData) {
                    long availabilityId = availability.path("availability_id").asLong();
                    roomAvailabilities.add(availabilityId);
                }
            } catch (IOException e) {
                throw new RuntimeException("error");
            }
        } else {
            throw new RuntimeException("error");
        }
        System.out.println("Room availabilities for selected booking id: " + roomAvailabilities);
        return roomAvailabilities;
    }

    private void updateBooking(Long bookingId) {
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", apiKey);

        String UPDATE_BOOKING = String.format(UPDATE_BOOKING_QUERY,bookingId);
        System.out.println(UPDATE_BOOKING);
        String requestBody = "{ \"query\": \"" + UPDATE_BOOKING + "\" }";
        System.out.println(requestBody);
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(graphqlUrl, HttpMethod.POST, requestEntity, String.class);
        System.out.println(responseEntity);
    }


    public Long createBookingCheck(BookingFinalRequestDTO bookingRequestDTO) {
        LocalDate startDate = LocalDate.parse(bookingRequestDTO.getStartDate());
        LocalDate endDate = LocalDate.parse(bookingRequestDTO.getEndDate());
        Long roomTypeId = bookingRequestDTO.getRoomTypeId();
        Long propertyId = bookingRequestDTO.getPropertyId();
        Long roomCount = bookingRequestDTO.getRoomCount();
        Long tenantId = bookingRequestDTO.getTenantId();

        String city= bookingRequestDTO.getBillingInfo().getCity();
        String state= bookingRequestDTO.getBillingInfo().getState();
        String zip = bookingRequestDTO.getBillingInfo().getZipcode();


        // Validate check-in and check-out dates
        String checkInDateStr = bookingRequestDTO.getStartDate();
        String checkOutDateStr = bookingRequestDTO.getEndDate();

        try {
            LocalDate checkInDate = LocalDate.parse(checkInDateStr);
            LocalDate checkOutDate = LocalDate.parse(checkOutDateStr);

            if (checkInDate.isAfter(checkOutDate)) {
                throw new IllegalArgumentException("Check-out date must be after check-in date");
            }
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format for check-in or check-out date");
        }

        List<Integer> availableRoomIds = roomService.getRoomIds(new RoomIdRequestDTO(bookingRequestDTO.getStartDate(), bookingRequestDTO.getEndDate(), roomTypeId,propertyId,roomCount)).getListRoomIds();
        log.info("Available room ids: "+availableRoomIds);
        List<Integer> selectedRoomIds = new ArrayList<>();
        for(Integer availableRoomId : availableRoomIds){
            try {
                bookingCheckRepository.insertBookingCheck(startDate, roomTypeId, availableRoomId.longValue(), propertyId, endDate);
                log.info("Inserted into temporary repository for concurrency handling");
                selectedRoomIds.add(availableRoomId);
            }
            catch (DataIntegrityViolationException e) {
                log.info("Transaction failed: Constraint violation, the room id is already in queue for booking");
            } catch (Exception e) {
                log.info("Transaction failed: " + e.getMessage());
            }
            if(selectedRoomIds.size() >= roomCount){
                break;
            }
        }
        if(selectedRoomIds.size() < roomCount){
            log.info("Roll back occurred due to incomplete booking, less rooms available");
            for(Integer roomId: selectedRoomIds){
                PreBookingCompositeKey bookingCheckId = new PreBookingCompositeKey(propertyId,roomTypeId,roomId.longValue(),startDate,endDate);
                TemporaryPreBookingEntity bookingCheck = bookingCheckRepository.findById(bookingCheckId).orElse(null);
                if (!Objects.isNull(bookingCheck)){
                    bookingCheckRepository.delete(bookingCheck);
                }
            }
            throw new ConflictBookingException();
        }

        List<Long> availabilityIds = new ArrayList<>();
        Long finalBookingId=0L;
        if(selectedRoomIds.size() >= roomCount){
            Long guestId = checkGuestInfo(bookingRequestDTO.getGuestInfo(),tenantId);
            if(guestId != -1L){
                for(Integer selectedRoomId: selectedRoomIds){
                    List<Long> availabilityIdsForSelectedRoom = getAvailabilityIdsForSelectedRoom(selectedRoomId,propertyId,bookingRequestDTO.getStartDate(),bookingRequestDTO.getEndDate());
                    availabilityIds.addAll(availabilityIdsForSelectedRoom);
                }
                log.info("Availability id's: "+availabilityIds);
                Long availabilityId1 = availabilityIds.get(0);
                System.out.println("create booking called==========================================");
                Long bookingId = createBooking(availabilityId1,bookingRequestDTO, guestId);
                finalBookingId=bookingId;
                log.info("Booking created for the user");
                if(bookingId != -1L){
                    ExecutorService executorService = Executors.newFixedThreadPool(availabilityIds.size());
                    List<Future<?>> updateFutures = new ArrayList<>();
                    for(int i = 1; i < availabilityIds.size(); i++){
                        final Long availabilityId = availabilityIds.get(i);
                        final Long finalBookingIdCopy = bookingId;
                        Future<?> updateFuture = executorService.submit(() -> updateRoomAvailability(availabilityId, finalBookingIdCopy));
                        updateFutures.add(updateFuture);
//                        updateRoomAvailability(availabilityIds.get(i), bookingId);
                    }
                    for (Future<?> future : updateFutures) {
                        try {
                            future.get(); // This waits for the task to complete
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        } catch (ExecutionException e) {
                            throw new RuntimeException(e);
                        }
                    }

                    storeBookingService.saveBookingForUser(guestId,bookingRequestDTO,bookingId);
                }
            }
        }

        ExecutorService deleteExecutorService = Executors.newFixedThreadPool(selectedRoomIds.size());
        List<Future<?>> deleteFutures = new ArrayList<>();
        for(Integer roomId: selectedRoomIds){
//            PreBookingCompositeKey bookingCheckId = new PreBookingCompositeKey(propertyId,roomTypeId,roomId.longValue(),startDate,endDate);
//            TemporaryPreBookingEntity bookingCheck = bookingCheckRepository.findById(bookingCheckId).orElse(null);
//            if (!Objects.isNull(bookingCheck)){
//                bookingCheckRepository.delete(bookingCheck);
//            }
            Future<?> deleteFuture = deleteExecutorService.submit(() -> {
                PreBookingCompositeKey bookingCheckId = new PreBookingCompositeKey(propertyId, roomTypeId, roomId.longValue(), startDate, endDate);
                TemporaryPreBookingEntity bookingCheck = bookingCheckRepository.findById(bookingCheckId).orElse(null);
                if (!Objects.isNull(bookingCheck)) {
                    bookingCheckRepository.delete(bookingCheck);
                }
            });
            deleteFutures.add(deleteFuture);
        }
        try{
        for (Future<?> future : deleteFutures) {
            future.get(); // This waits for the task to complete
        }
    } catch (InterruptedException | ExecutionException e) {
        // Handle exceptions
        e.printStackTrace();
    } finally {
        // Shut down the executor service
        deleteExecutorService.shutdown();
    }


        log.info("Added to pre booking table successfully");

        String subscribedEmail=bookingRequestDTO.getGuestInfo().getEmailId();

        if(bookingRequestDTO.getGuestInfo().isHasSubscribed()){
            if(subscribedUserRepository.findByEmail(subscribedEmail).isEmpty()){
                SubscribedUsersEntity subscribedUsersEntity = new SubscribedUsersEntity();
                subscribedUsersEntity.setEmail(subscribedEmail);
                subscribedUserRepository.save(subscribedUsersEntity);
            }
        }

        return finalBookingId;
    }

    public void updateRoomAvailability(Long availabilityId, Long bookingId){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey, apiKey);

        String UPDATE_ROOM_AVAILABILITY = String.format(UPDATE_ROOM_AVAILABILITY_QUERY, availabilityId, bookingId, bookingId);
        String requestBody = "{ \"query\": \"" + UPDATE_ROOM_AVAILABILITY + "\" }";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(graphqlUrl, HttpMethod.POST, requestEntity, String.class);
        log.info("Updating room availability response: "+ responseEntity.getBody());
    }
    public Long createBooking(Long availabilityId, BookingFinalRequestDTO bookingRequestDTO, Long guestId){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey, apiKey);

        log.info("Booking creation initiated");

        String CREATE_BOOKING;

        if(bookingRequestDTO.getPromotionInfo().getPromotionId()==0){
            CREATE_BOOKING = String.format(CREATE_BOOKING_WITHOUT_PROMO, bookingRequestDTO.getStartDate(), bookingRequestDTO.getEndDate(), bookingRequestDTO.getAdultCount(), bookingRequestDTO.getKidCount(), bookingRequestDTO.getCostInfo().getTotalCost().intValue(), bookingRequestDTO.getCostInfo().getAmountDueAtResort().intValue(), 1, guestId, bookingRequestDTO.getPropertyId(), availabilityId);
        }
        else {
            CREATE_BOOKING = String.format(CREATE_BOOKING_QUERY, bookingRequestDTO.getStartDate(), bookingRequestDTO.getEndDate(), bookingRequestDTO.getAdultCount(), bookingRequestDTO.getKidCount(), bookingRequestDTO.getCostInfo().getTotalCost().intValue(), bookingRequestDTO.getCostInfo().getAmountDueAtResort().intValue(), 1, guestId, bookingRequestDTO.getPromotionInfo().getPromotionId(), bookingRequestDTO.getPropertyId(), availabilityId);
        }
        log.info("Booking creation done");
        String requestBody = "{ \"query\": \"" + CREATE_BOOKING + "\" }";
        log.info(requestBody);
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        log.info(requestEntity.getBody());

        ResponseEntity<String> responseEntity = restTemplate.exchange(graphqlUrl, HttpMethod.POST, requestEntity, String.class);

        log.info("Create booking response: " + responseEntity.getBody());
        Long bookingId = -1L;
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String jsonResponse = responseEntity.getBody();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode root = objectMapper.readTree(jsonResponse);
                JsonNode bookingData = root.path("data").path("createBooking");
                bookingId = bookingData.path("booking_id").asLong();
            } catch (IOException e) {
                throw new RuntimeException("Failed to parse listRoomAvailabilities response.");
            }
        } else {
            throw new RuntimeException("Failed to parse listRoomAvailabilities response.");
        }
        return bookingId;
    }

    public List<Long> getAvailabilityIdsForSelectedRoom(Integer roomId, Long propertyId, String startDate, String endDate){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(xApiKey, apiKey);

        String GET_SELECTED_ROOM_AVAILABILITIES = String.format(GET_SELECTED_ROOM_AVAILABILITIES_QUERY, startDate, endDate, propertyId, roomId);
        String requestBody = "{ \"query\": \"" + GET_SELECTED_ROOM_AVAILABILITIES + "\" }";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(graphqlUrl, HttpMethod.POST, requestEntity, String.class);
        List<Long> roomAvailabilities = new ArrayList<>();
        log.info(responseEntity.getBody());
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String jsonResponse = responseEntity.getBody();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode root = objectMapper.readTree(jsonResponse);
                JsonNode roomAvailabilitiesData = root.path("data").path("listRoomAvailabilities");

                for (JsonNode availability : roomAvailabilitiesData) {
                    long availabilityId = availability.path("availability_id").asLong();
                    roomAvailabilities.add(availabilityId);
                }
            } catch (IOException e) {
                throw new RuntimeException("Failed to parse listRoomAvailabilities response.");
            }
        } else {
            throw new RuntimeException("Failed to parse listRoomAvailabilities response.");
        }
        log.info("Room availabilities for selected room: " + roomAvailabilities);
        return roomAvailabilities;
    }
    public Long checkGuestInfo(BookingFinalRequestDTO.GuestDTO guestDTO,Long tenantId){
        List<GuestUserEntity> guestUsers = guestUserService.getAllUsers();
        Long guestId = -1L;
        boolean guestExists = false;
        log.info("Guest users: "+guestUsers);
        for(GuestUserEntity guestUser: guestUsers){
            if(guestUser.getEmailId().equals(guestDTO.getEmailId())){
                guestExists = true;
                guestId = guestUser.getUserId();
                break;
            }
        }
        if(!guestExists){
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set(xApiKey, apiKey);

            String CREATE_GUEST = String.format(CREATE_GUEST_QUERY, guestDTO.getFirstName());
            log.info("Guest creation response: "+CREATE_GUEST);
            String requestBody = "{ \"query\": \"" + CREATE_GUEST + "\" }";
            log.info(requestBody);
            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> responseEntity = restTemplate.exchange(graphqlUrl, HttpMethod.POST, requestEntity, String.class);
            log.info(responseEntity.getBody());
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                String jsonResponse = responseEntity.getBody();
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    JsonNode root = objectMapper.readTree(jsonResponse);
                    JsonNode guestData = root.path("data").path("createGuest");
                    guestId = guestData.path("guest_id").asLong();
                } catch (IOException e) {
                    throw new RuntimeException("Failed to parse guests response.");
                }
            } else {
                throw new RuntimeException("Failed to parse guests response.");
            }

        }
        guestUserService.createUser(new GuestUserEntity(guestId,guestDTO.getEmailId(), false,guestDTO.getFirstName(),guestDTO.getLastName(),guestDTO.getPhone(),tenantId));
        log.info("Guest Id: "+guestId);
        return guestId;
    }

    public static String generateOTP() {
        // Possible characters in the OTP
        String characters = "0123456789";

        // Create a StringBuilder to store the OTP
        StringBuilder otp = new StringBuilder();

        // Create a Random object
        Random random = new Random();

        // Generate OTP of specified length
        for (int i = 0; i < OTP_LENGTH; i++) {
            // Get a random index from characters
            int index = random.nextInt(characters.length());

            // Append the character at the random index to the OTP
            otp.append(characters.charAt(index));
        }

        // Return the OTP as a string
        return otp.toString();
    }


    public String sendEmailForCancelation(Long bookingID){
        BookingEntity bookingEntity = bookingRepository.findById(bookingID).orElse(null);

        if(bookingEntity==null){
            throw new BookingNotFoundException();
        }
        OtpEntity otpEntity = otpRepository.findById(bookingID).orElse(null);
        String otp = generateOTP();
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, 15);
        Timestamp expiryTime = new Timestamp(cal.getTimeInMillis());
        if(otpEntity==null){
            OtpEntity otpEntity1 = new OtpEntity();
            otpEntity1.setBookingId(bookingID);
            otpEntity1.setOtpCode(otp);
            otpEntity1.setExpiryTime(expiryTime);
            otpRepository.save(otpEntity1);
        }
        else{
            otpEntity.setOtpCode(otp);
            otpEntity.setExpiryTime(expiryTime);
            otpRepository.save(otpEntity);
        }

        String htmlContent = """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Cancellation OTP</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            border: 1px solid #ccc;
                            border-radius: 10px;
                        }
                        .logo {
                            text-align: center;
                        }
                        .logo img {
                            max-width: 200px;
                        }
                        .message {
                            margin-top: 20px;
                        }
                        .otp {
                            background-color: #f0f0f0;
                            padding: 10px;
                            border-radius: 5px;
                            text-align: center;
                            font-size: 20px;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="logo">
                            <img src="https://ibeteam15blobcontainer.blob.core.windows.net/landingimages/hotel1.jpg" alt="Logo">
                        </div>
                        <div class="message">
                            <p>Dear %s,</p>
                            <p>Your cancellation OTP for your booking is:</p>
                            <div class="otp">%s</div>
                            <p>Please use this OTP to confirm your cancellation.</p>
                            <p>If you have not initiated this cancellation, please contact us immediately.</p>
                            <p>Thank you for choosing our hotel.</p>
                            <p>Sincerely,</p>
                            <p>The KDU Hotels Team</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(bookingEntity.getUser().getFirstName(),otp);

        String emailId = bookingEntity.getUser().getEmailId();
        emailService.scheduleEmail(emailId,htmlContent, Duration
                .ofSeconds(2),String.format("Booking Cancellation Confirmation and OTP: %d", bookingID));

//        emailService.sendEmail(emailId, htmlContent, String.format("Booking Cancellation Confirmation and OTP: %d", bookingID));

        return "Email send successfully";
    }

    public String cancelBookingViaOtp(Long bookingId,String otp){
        BookingEntity bookingEntity = bookingRepository.findById(bookingId).orElse(null);

        if(bookingEntity==null){
            throw new BookingNotFoundException();
        }
        OtpEntity otpEntity = otpRepository.findById(bookingId).orElse(null);
        if(otpEntity==null){
            throw new OtpExpiredException();
        }

        if(otpEntity.getOtpCode().equals(otp)){
            cancelBooking(bookingId);
        }
        else{
            throw new InvalidOtpException();
        }

        return "Booking cancelled Successfully";
    }

    public void cancelBookingViaEmail(Long bookingId,String emailId,String jwtToken){
        LogInUsers logInUsers=logInUsersRepository.findById(emailId).orElse(null);

        if(logInUsers==null){
            throw new UserNotFoundException();
        }

        if(!logInUsers.getJwtToken().equals(jwtToken)){
            throw new UnAuthorizedException();
        }

        List<BookingEntity> bookings = logInUsers.getBookings();

        boolean bookingFound = false;

        for(BookingEntity booking:bookings){
            if(booking.getBookingId().equals(bookingId)){
                bookingFound = true;
                break;
            }
        }

        if(bookingFound==false){
            throw new BookingNotFoundException();
        }

        cancelBooking(bookingId);
    }

}
