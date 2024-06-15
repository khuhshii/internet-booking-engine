package com.kdu.ibe.exception.customExceptions;

public class FeedbackAlreadyGivenException extends RuntimeException{

    @Override
    public String toString() {
        return "Feedback already given";
    }
}
