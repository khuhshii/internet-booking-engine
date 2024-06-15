package com.kdu.ibe.model.propertymodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * Model class representing a property.
 */
@Data
public class Property {
    /**
     * The ID of the property.
     */
    @JsonProperty("property_id")
    private int propertyId;

    /**
     * The name of the property.
     */
    @JsonProperty("property_name")
    private String propertyName;

}
