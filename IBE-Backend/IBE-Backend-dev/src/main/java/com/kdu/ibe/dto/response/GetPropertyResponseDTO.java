package com.kdu.ibe.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kdu.ibe.model.ratesmodel.RoomType;
import lombok.Data;

import java.util.List;

/**
 * DTO class representing the response for retrieving property details.
 */
@Data
public class GetPropertyResponseDTO {
    /**
     * The ID of the property.
     */
    @JsonProperty("property_id")
    private Long propertyId;

    /**
     * The list of room types associated with the property.
     */
    @JsonProperty("room_type")
    private List<RoomType> roomType;
}
