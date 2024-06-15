package com.kdu.ibe.exception.customExceptions;

public class InvalidZipCodeException extends RuntimeException{

    @Override
    public String toString() {
        return "Invalid Zip code";
    }
}
