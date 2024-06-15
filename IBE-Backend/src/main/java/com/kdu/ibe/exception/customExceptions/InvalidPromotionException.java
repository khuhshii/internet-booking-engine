package com.kdu.ibe.exception.customExceptions;

public class InvalidPromotionException extends RuntimeException{

    @Override
    public String toString() {
        return "Invalid promo code";
    }
}
