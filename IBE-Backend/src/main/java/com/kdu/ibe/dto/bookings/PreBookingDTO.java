package com.kdu.ibe.dto.bookings;

import lombok.Data;

import java.sql.Date;

@Data
public class PreBookingDTO {
    Integer propertyId;
    Integer roomTypeId;
    Integer roomId;
    String checkInDate;
    String checkOutDate;
}
