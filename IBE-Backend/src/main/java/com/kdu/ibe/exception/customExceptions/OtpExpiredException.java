package com.kdu.ibe.exception.customExceptions;

public class OtpExpiredException extends RuntimeException{
    @Override
    public String toString() {
        return "Otp expired";
    }
}
