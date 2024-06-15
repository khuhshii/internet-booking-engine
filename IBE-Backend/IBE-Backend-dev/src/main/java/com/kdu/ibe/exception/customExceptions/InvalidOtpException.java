package com.kdu.ibe.exception.customExceptions;

public class InvalidOtpException extends RuntimeException{

    @Override
    public String toString() {
        return "Invalid otp, please try again";
    }
}
