package com.kdu.ibe.exception.customExceptions;

public class UserNotFoundException extends RuntimeException{

    @Override
    public String toString() {
        return "User not found";
    }
}
