package com.kdu.ibe.model.ratesmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * Model class representing a room rate.
 */
@Data
public class RoomRate {
    /**
     * The room rate details.
     */
    @JsonProperty("room_rate")
    RoomRateDetail rateDetail;

}
