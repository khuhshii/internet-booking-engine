package com.kdu.ibe.controller;


import com.kdu.ibe.dto.reviewsRatings.*;
import com.kdu.ibe.entity.ReviewRatingEntity;
import com.kdu.ibe.service.RoomRatingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class ReviewRatingController {

    private final RoomRatingService roomRatingService;

    @Autowired
    public ReviewRatingController(RoomRatingService roomRatingService){
        this.roomRatingService=roomRatingService;
    }

    @PostMapping("/rating")
    public ResponseEntity<String> addReviewsrating(@RequestBody TenantRatingsDto tenantRatingsDto){
        System.out.println(tenantRatingsDto);
        roomRatingService.saveRatings(tenantRatingsDto);
        return ResponseEntity.ok("Reviews added successfully");
    }

    @PostMapping("/ratingById")
    public ResponseEntity<List<RoomTypeDto>> getReviews(@RequestBody RatingRequestDto ratingRequestDto){
        return ResponseEntity.ok(roomRatingService.getRatings(ratingRequestDto));
    }

    @PostMapping("/addRating")
    public ResponseEntity<String> addReview(@Valid @RequestBody AddReviewRatingDto addReviewRatingDto){
        roomRatingService.addReview(addReviewRatingDto);
        return ResponseEntity.ok("Review added successful");
    }

    @PostMapping("/getRatingCount")
    public ResponseEntity<ReviewsCountRatingsDto> getratingsCount(@Valid @RequestBody RatingRequestDto ratingRequestDto) {
        return ResponseEntity.ok(roomRatingService.getReviewCount(ratingRequestDto));
    }
}
