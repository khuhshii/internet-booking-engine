package com.kdu.ibe.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

/**
 * Entity class representing properties.
 */
@Entity
@Data
public class Properties {
    /**
     * The ID of the property.
     */
    @Id
    @Column(name = "property_id")
    Integer propertyId;

    /**
     * The name of the property.
     */

    @Column(name = "property_name")
    String propertyName;
}
