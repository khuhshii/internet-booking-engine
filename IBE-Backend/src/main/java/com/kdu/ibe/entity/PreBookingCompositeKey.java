package com.kdu.ibe.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreBookingCompositeKey implements Serializable {
    private Long propertyId;
    private Long roomTypeId;
    private Long roomId;
    private LocalDate startDate;
    private LocalDate endDate;
}
