package com.kdu.ibe.exception.customExceptions;

public class UnAuthorizedException extends RuntimeException{

    @Override
    public String toString() {
        return "Unauthorized user!!";
    }
}
