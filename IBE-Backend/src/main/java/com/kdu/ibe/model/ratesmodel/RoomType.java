package com.kdu.ibe.model.ratesmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

/**
 * Model class representing a room type.
 */
@Data
public class RoomType {
    /**
     * The ID of the room type.
     */
    @JsonProperty("room_type_id")
    Long roomTypeId;

    /**
     * The name of the room type.
     */
    @JsonProperty("room_type_name")
    String roomTypeName;

    /**
     * The list of room rates associated with this room type.
     */
    @JsonProperty("room_rates")
    List<RoomRate> roomRates;

}
