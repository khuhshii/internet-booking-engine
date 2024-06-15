package com.kdu.ibe.dto.reviewsRatings;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddReviewRatingDto {

    @NotBlank(message = "Tenant ID must not be blank")
    private String tenantId;

    @NotBlank(message = "Property ID must not be blank")
    private String propertyId;

    @NotBlank(message = "Room Type ID must not be blank")
    private String roomTypeId;

    @NotBlank(message = "Token must not be blank")
    private String token;

    @NotNull(message = "Rating must not be null")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    @NotBlank(message = "Review must not be blank")
    private String review;
}
