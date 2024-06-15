package com.kdu.ibe.dto.custompromotions;


import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CustomPromoRequestDto {
    @NotBlank(message = "Promo code must not be blank")
    private String promoCode;

    @NotBlank(message = "Room type ID must not be blank")
    private String roomTypeId;


    boolean isDeactivated;

    @NotNull(message = "Minimum days of stay must not be null")
    @Positive(message = "Minimum days of stay must be positive")
    private Integer minimumDaysOfStay;

    @NotNull(message = "Price factor must not be null")
    @Positive(message = "Price factor must be positive")
    private Double priceFactor;

    @NotBlank(message = "Promotion description must not be blank")
    private String promotionDescription;

    @NotBlank(message = "Promotion title must not be blank")
    private String promotionTitle;

    @NotBlank(message = "Valid date must not be blank")
    private String validDate;
}
