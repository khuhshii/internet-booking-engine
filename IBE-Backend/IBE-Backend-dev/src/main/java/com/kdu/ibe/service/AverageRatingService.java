package com.kdu.ibe.service;

import com.kdu.ibe.dto.reviewsRatings.ReviewsCountRatingsDto;
import com.kdu.ibe.entity.AverageRatingEntity;
import com.kdu.ibe.repository.AverageRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AverageRatingService {

    public final AverageRatingRepository averageRatingRepository;

    @Autowired
    public AverageRatingService(AverageRatingRepository averageRatingRepository){
        this.averageRatingRepository=averageRatingRepository;
    }
    public void addRatings(String roomTypeId,Integer ratings){
        AverageRatingEntity averageRatingEntity = averageRatingRepository.findById(roomTypeId).orElse(null);

        if(averageRatingEntity == null){
            AverageRatingEntity averageRatingEntity1 = new AverageRatingEntity();
            averageRatingEntity1.setRoomTypeId(roomTypeId);
            averageRatingEntity1.setAvgRatings(ratings*1.0);
            averageRatingEntity1.setCount(1);
            averageRatingRepository.save(averageRatingEntity1);
        }else{
            averageRatingEntity.setAvgRatings(((averageRatingEntity.getAvgRatings()* averageRatingEntity.getCount()) + (ratings*1.0))/ (averageRatingEntity.getCount()+1));
            averageRatingEntity.setCount(averageRatingEntity.getCount()+1);
            averageRatingRepository.save(averageRatingEntity);
        }
    }

    public ReviewsCountRatingsDto getRatings(String roomTypeId){
        ReviewsCountRatingsDto reviewsCountRatingsDto = new ReviewsCountRatingsDto();
        AverageRatingEntity averageRatingEntity = averageRatingRepository.findById(roomTypeId).orElse(null);
        if(averageRatingEntity==null){
            return reviewsCountRatingsDto;
        }
        else{
            reviewsCountRatingsDto.setRatings(averageRatingEntity.getAvgRatings());
            reviewsCountRatingsDto.setCount(averageRatingEntity.getCount());

            return reviewsCountRatingsDto;
        }
    }
}
