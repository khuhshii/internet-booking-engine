package com.kdu.ibe.exception.customExceptions;

public class TokenInvalidException extends RuntimeException{

    @Override
    public String toString() {
        return "Invalid Token, Token not found";
    }
}
