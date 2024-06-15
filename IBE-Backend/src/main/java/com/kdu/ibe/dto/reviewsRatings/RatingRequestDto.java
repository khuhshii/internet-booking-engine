package com.kdu.ibe.dto.reviewsRatings;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RatingRequestDto {
    @NotBlank(message = "Tenant ID must not be blank")
    private String tenantId;
    @NotBlank(message = "Property ID must not be blank")
    private String propertyId;
    @NotBlank(message = "Room Type ID must not be blank")
    private String roomTypeId;
}
