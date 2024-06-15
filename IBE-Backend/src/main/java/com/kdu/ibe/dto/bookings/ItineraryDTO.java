package com.kdu.ibe.dto.bookings;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ItineraryDTO {
    @NotNull(message = "Property ID cannot be null")
    private Integer propertyId;

    @NotNull(message = "Room Type ID cannot be null")
    private Integer roomTypeId;

    @NotBlank(message = "Check-in date cannot be blank")
    private String checkInDate;

    @NotBlank(message = "Check-out date cannot be blank")
    private String checkOutDate;

    private Integer promotionId;

    @NotNull(message = "Total amount cannot be null")
    @Positive(message = "Total amount must be positive")
    private Double total;

    @NotNull(message = "Due now amount cannot be null")
    @Positive(message = "Due now amount must be positive")
    private Double dueNow;

    @NotNull(message = "Due at resort amount cannot be null")
    @Positive(message = "Due at resort amount must be positive")
    private Double dueAtResort;
}
