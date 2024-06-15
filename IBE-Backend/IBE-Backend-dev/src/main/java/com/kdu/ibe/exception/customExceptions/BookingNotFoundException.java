package com.kdu.ibe.exception.customExceptions;

public class BookingNotFoundException extends RuntimeException {
    @Override
    public String toString() {
        return "No bookings found with the given id";
    }
}
