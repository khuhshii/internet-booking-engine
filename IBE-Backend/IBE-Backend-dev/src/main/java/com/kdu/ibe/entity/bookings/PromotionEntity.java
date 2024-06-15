package com.kdu.ibe.entity.bookings;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "promotion")
public class PromotionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promotionIdGenerated;

    private Long promotionId;
    private String promotionTitle;
    private String priceFactor;
    private String promotionDescription;


}
