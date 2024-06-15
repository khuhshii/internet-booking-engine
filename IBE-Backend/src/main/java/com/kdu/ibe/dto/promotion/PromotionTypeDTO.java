package com.kdu.ibe.dto.promotion;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionTypeDTO {
    @JsonProperty("promotion_id")
    private int promotionId;
    @JsonProperty("promotion_title")
    private String promotionTitle;
    @JsonProperty("promotion_description")
    private String promotionDescription;
    @JsonProperty("minimum_days_of_stay")
    private int minimumDaysOfStay;
    @JsonProperty("is_deactivated")
    private boolean isDeactivated;
    @JsonProperty("price_factor")
    private double priceFactor;
}