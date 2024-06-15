package com.kdu.ibe.exception.customExceptions;

public class ConflictBookingException extends RuntimeException{

    @Override
    public String toString() {
        return "There was a conflict in booking";
    }
}
