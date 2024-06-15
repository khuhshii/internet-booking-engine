package com.kdu.ibe.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDetailsRequestDTO {

    @NotNull(message = "Property ID must not be null")
    private int propertyId=15;

    @NotBlank(message = "Check-in date must not be blank")
    private String checkInDate;

    @NotBlank(message = "Check-out date must not be blank")
    private String checkOutDate;

    @DecimalMax(value = "1.7976931348623157E308", message = "Maximum rate must be less than or equal to maximum double value")
    private double maxRate=Double.MAX_VALUE;

    @DecimalMin(value = "0", message = "Minimum rate must be greater than or equal to minimum double value")
    private double minRate=Double.MIN_VALUE;
    private String []roomType=null;
    private String []bedType=null;

    @NotBlank(message = "Price type must not be blank")
    private String priceType="none";

    @NotBlank(message = "Room count must not be blank")
    private String roomCount;

    @NotBlank(message = "Guest count must not be blank")
    private String guestCount;

    @Min(value = 1, message = "Bed count must be at least 1")
    private int bedCount=3;
}
