package com.kdu.ibe.model.ratesmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * Model class representing details of a room rate.
 */
@Data
public class RoomRateDetail {
    /**
     * The basic nightly rate for the room.
     */
    @JsonProperty("basic_nightly_rate")
    Integer basicNightlyRate;
    /**
     * The date associated with the room rate.
     */

    @JsonProperty("date")
    String date;
}
