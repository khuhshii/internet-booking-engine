package com.kdu.ibe.dto.roomdetails;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomTypeDTO {
    @JsonProperty("room_type_id")
    private int roomTypeId;
    @JsonProperty("room_type_name")
    private String roomTypeName;
    @JsonProperty("area_in_square_feet")
    private int area;
    @JsonProperty("single_bed")
    private int singleBed;
    @JsonProperty("double_bed")
    private int doubleBed;
    @JsonProperty("max_capacity")
    private int maxCapacity;
    private double minRates;
    private int minRoomCount;
    private Double ratings=0.0;
    private int count=0;
}
