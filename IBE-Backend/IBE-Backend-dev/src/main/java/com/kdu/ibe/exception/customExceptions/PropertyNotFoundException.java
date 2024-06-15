package com.kdu.ibe.exception.customExceptions;

public class PropertyNotFoundException extends RuntimeException{

    @Override
    public String toString() {
        return "Property not found";
    }
}
