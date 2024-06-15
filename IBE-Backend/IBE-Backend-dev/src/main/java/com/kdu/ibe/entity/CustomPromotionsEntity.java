package com.kdu.ibe.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

@Entity
@Data
public class CustomPromotionsEntity {

    @Id
    @Column(name = "promo_code")
    private String promoCode;

    private String roomTypeId;

    boolean isDeactivated;

    private Integer minimumDaysOfStay;

    private Double priceFactor;

    @Lob
    private String promotionDescription;

    @Column(columnDefinition = "TEXT")
    private String promotionTitle;

    private String validDate;
}
