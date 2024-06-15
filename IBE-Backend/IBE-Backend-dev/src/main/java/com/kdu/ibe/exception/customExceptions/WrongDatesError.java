package com.kdu.ibe.exception.customExceptions;

public class WrongDatesError extends RuntimeException{
    @Override
    public String toString() {
        return "Error wrong dates input";
    }
}
