package com.kdu.ibe.service;

import com.kdu.ibe.dto.reviewsRatings.*;
import com.kdu.ibe.entity.ReviewRatingEntity;
import com.kdu.ibe.exception.customExceptions.FeedbackAlreadyGivenException;
import com.kdu.ibe.exception.customExceptions.PropertyNotFoundException;
import com.kdu.ibe.exception.customExceptions.RoomTypeNotFoundException;
import com.kdu.ibe.exception.customExceptions.TenantNotFoundexception;
import com.kdu.ibe.repository.RoomRatingRepository;
import com.kdu.ibe.repository.TokenValidatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RoomRatingService {

    private final RoomRatingRepository roomRatingRepository;

    private final AverageRatingService averageRatingService;


    private final TokenValidationService tokenValidationService;

    private final TokenValidatorRepository tokenValidatorRepository;
    @Autowired
    public RoomRatingService(RoomRatingRepository roomRatingRepository, AverageRatingService averageRatingService, TokenValidationService tokenValidationService, TokenValidatorRepository tokenValidatorRepository){
        this.roomRatingRepository=roomRatingRepository;
        this.averageRatingService = averageRatingService;
        this.tokenValidationService = tokenValidationService;
        this.tokenValidatorRepository = tokenValidatorRepository;
    }


//    public ReviewsCountRatingsDto getReviewCount(RatingRequestDto ratingRequestDto){
//        List<RoomTypeDto> ratings = getRatings(ratingRequestDto);
//        ReviewsCountRatingsDto reviewsCountRatingsDto = new ReviewsCountRatingsDto();
//        if(ratings!=null) {
//            reviewsCountRatingsDto.setCount(ratings.size());
//            double count = 0.0;
//            for (RoomTypeDto rating : ratings) {
//                count += rating.getRating();
//            }
//            if (!ratings.isEmpty()) {
//                reviewsCountRatingsDto.setRatings(count / (ratings.size() * 1.0));
//            } else {
//                reviewsCountRatingsDto.setRatings(0.0);
//            }
//        }
//
//        return reviewsCountRatingsDto;
//    }

    public ReviewsCountRatingsDto getReviewCount(RatingRequestDto ratingRequestDto){
        return averageRatingService.getRatings(ratingRequestDto.getRoomTypeId());
    }

    public List<RoomTypeDto> getRatings(RatingRequestDto ratingRequestDto){
        ReviewRatingEntity reviewRatingEntity = roomRatingRepository.findById(ratingRequestDto.getTenantId()).orElse(null);
        if(reviewRatingEntity == null || reviewRatingEntity.toTenantRatings()==null || reviewRatingEntity.toTenantRatings().getProperties()==null || reviewRatingEntity.toTenantRatings().getProperties().get(ratingRequestDto.getPropertyId())==null || reviewRatingEntity.toTenantRatings().getProperties().get(ratingRequestDto.getPropertyId()).getRoomTypes()==null || reviewRatingEntity.toTenantRatings().getProperties().get(ratingRequestDto.getPropertyId()).getRoomTypes().get(ratingRequestDto.getRoomTypeId())==null){
            return null;
        }
        return reviewRatingEntity.toTenantRatings().getProperties().get(ratingRequestDto.getPropertyId()).getRoomTypes().get(ratingRequestDto.getRoomTypeId());
    }

    public void addReview(AddReviewRatingDto addReviewRatingDto){

        String token = addReviewRatingDto.getToken();
        boolean validity = tokenValidationService.checkValidityOfToken(token);

        if(!validity){
            throw new FeedbackAlreadyGivenException();
        }

        ReviewRatingEntity reviewRatingEntity = roomRatingRepository.findById(addReviewRatingDto.getTenantId()).orElse(null);

        if(reviewRatingEntity==null){
            throw new TenantNotFoundexception();
        }

        RoomTypeDto roomTypeDto = new RoomTypeDto();
        roomTypeDto.setRating(addReviewRatingDto.getRating());
        roomTypeDto.setReview(addReviewRatingDto.getReview());

        TenantRatingsDto tenantRatingsDto1= reviewRatingEntity.toTenantRatings();


        Map<String,PropertyDto> properties = tenantRatingsDto1.getProperties();
        PropertyDto propertyDto = properties.get(addReviewRatingDto.getPropertyId());

        if(propertyDto ==null){
            throw new PropertyNotFoundException();
        }
        Map<String, List<RoomTypeDto>> roomTypes = propertyDto.getRoomTypes();
        List<RoomTypeDto> ratings = roomTypes.get(addReviewRatingDto.getRoomTypeId());

        if(ratings==null){
            throw new RoomTypeNotFoundException();
        }

        ratings.add(roomTypeDto);
        roomTypes.put(addReviewRatingDto.getRoomTypeId(),ratings);
        propertyDto.setRoomTypes(roomTypes);
        properties.put(addReviewRatingDto.getPropertyId(),propertyDto);
        tenantRatingsDto1.setProperties(properties);

        reviewRatingEntity.fromTenantRatingsDto(tenantRatingsDto1);

        averageRatingService.addRatings(addReviewRatingDto.getRoomTypeId(),addReviewRatingDto.getRating());

        roomRatingRepository.save(reviewRatingEntity);

        tokenValidationService.makeTokenInvalid(token);

    }
    public void saveRatings(TenantRatingsDto tenantRatingsDto){
        ReviewRatingEntity reviewRatingEntity = new ReviewRatingEntity();
        reviewRatingEntity.setTenantId(tenantRatingsDto.getTenantId());
        reviewRatingEntity.fromTenantRatingsDto(tenantRatingsDto);
        roomRatingRepository.save(reviewRatingEntity);
//        System.out.println(reviewRatingEntity);
//        System.out.println("==========================================");
//
//        RoomTypeDto roomTypeDto = new RoomTypeDto();
//        roomTypeDto.setRating(5);
//        roomTypeDto.setReview("Testing reviews");
//        TenantRatingsDto tenantRatingsDto1= reviewRatingEntity.toTenantRatings();
//
//
//        Map<String,PropertyDto> properties = tenantRatingsDto1.getProperties();
//        PropertyDto propertyDto = properties.get("15");
//        Map<String, List<RoomTypeDto>> roomTypes = propertyDto.getRoomTypes();
//        List<RoomTypeDto> ratings = roomTypes.get("85");
//        ratings.add(roomTypeDto);
//        roomTypes.put("85",ratings);
//        propertyDto.setRoomTypes(roomTypes);
//        properties.put("15",propertyDto);
//        tenantRatingsDto1.setProperties(properties);
//
//        reviewRatingEntity.fromTenantRatingsDto(tenantRatingsDto1);
//        System.out.println(reviewRatingEntity.toTenantRatings().getProperties().get("15").getRoomTypes().get("85"));

    }


}
