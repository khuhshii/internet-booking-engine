package com.kdu.ibe.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class AverageRatingEntity {

    @Id
    String roomTypeId;

    Double avgRatings;

    Integer count;
}
