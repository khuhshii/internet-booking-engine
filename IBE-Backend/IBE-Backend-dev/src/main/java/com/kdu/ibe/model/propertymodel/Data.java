package com.kdu.ibe.model.propertymodel;


import java.util.List;

/**
 * Model class representing data containing a list of properties.
 */
@lombok.Data
public class Data {
    /**
     * The list of properties.
     */
    private List<Property> listProperties;
}
