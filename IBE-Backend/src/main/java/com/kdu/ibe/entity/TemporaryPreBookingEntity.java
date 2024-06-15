package com.kdu.ibe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "booking_check")
@IdClass(PreBookingCompositeKey.class)
public class TemporaryPreBookingEntity {
    @Id
    private Long propertyId;
    @Id
    private Long roomTypeId;
    @Id
    private Long roomId;
    @Id
    private LocalDate startDate;
    @Id
    private LocalDate endDate;
}