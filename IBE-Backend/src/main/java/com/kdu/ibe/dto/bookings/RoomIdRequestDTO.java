package com.kdu.ibe.dto.bookings;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomIdRequestDTO {
    String startDate;
    String endDate;
    Long roomTypeId;
    Long propertyId;
    Long roomCount;
}
