package com.kdu.ibe.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kdu.ibe.model.ratesmodel.GetPropertyResponse;
import lombok.Data;

/**
 * DTO class representing the response for room rates.
 */
@Data
public class RoomRatesResponseDTO {
    /**
     * The data response containing property details.
     */
    @JsonProperty("data")
    public DataResponse data;

    /**
     * Inner class representing the data response.
     */
    @Data
    public static class DataResponse {

        /**
         * The property response DTO containing property details.
         */
        @JsonProperty("getProperty")
        public GetPropertyResponse property;
    }
}