package com.kdu.ibe.dto.property;

import com.kdu.ibe.model.propertymodel.Data;

/**
 * DTO class representing the response for property data.
 */
@lombok.Data
public class PropertyResponseDto {
    /**
     * The property data.
     */
    private Data data;
}
