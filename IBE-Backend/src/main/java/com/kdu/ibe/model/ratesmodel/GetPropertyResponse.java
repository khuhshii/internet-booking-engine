package com.kdu.ibe.model.ratesmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class GetPropertyResponse {
    @JsonProperty("property_id")
    Long propertyId;

    @JsonProperty("room_type")
    List<RoomType> roomType;

}
