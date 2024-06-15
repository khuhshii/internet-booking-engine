package com.kdu.ibe.dto.request;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PromotionRequestDto {
    @NotNull(message = "Property ID must not be null")
    private int propertyId=15;

    @NotNull(message = "Room type ID must not be null")
    private int roomTypeId;

    @NotBlank(message = "Check-in date must not be blank")
    private String checkInDate;

    @NotBlank(message = "Check-out date must not be blank")
    private String checkOutDate;

    @Min(value = 0, message = "Senior citizen count must not be negative")
    private Integer seniorCitizen=0;
}
