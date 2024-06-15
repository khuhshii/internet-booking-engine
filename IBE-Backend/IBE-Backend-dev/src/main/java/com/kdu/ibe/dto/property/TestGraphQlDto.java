package com.kdu.ibe.dto.property;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;


/**
 * DTO class representing property data for GraphQL testing.
 */
@Data
public class TestGraphQlDto {
    /**
     * The ID of the property.
     */
    @JsonProperty("property_id")
    int propertyId;
    /**
     * The name of the property.
     */
    @JsonProperty("property_name")
    String propertyName;
    /**
     * The address of the property.
     */
    @JsonProperty("property_address")
    String address;
    /**
     * The contact number of the property.
     */
    @JsonProperty("contact_number")
    String contactNumber;
}