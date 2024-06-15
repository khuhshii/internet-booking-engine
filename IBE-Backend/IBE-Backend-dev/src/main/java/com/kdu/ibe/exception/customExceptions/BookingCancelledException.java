package com.kdu.ibe.exception.customExceptions;

public class BookingCancelledException extends RuntimeException{
    @Override
    public String toString() {
        return "Booking already cancelled";
    }
}
