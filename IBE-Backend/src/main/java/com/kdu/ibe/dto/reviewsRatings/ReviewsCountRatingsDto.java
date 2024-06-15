package com.kdu.ibe.dto.reviewsRatings;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewsCountRatingsDto {
    @NotNull(message = "Ratings must not be null")
    Double ratings=0.0;
    @NotNull(message = "Count must not be null")
    Integer count=0;
}
