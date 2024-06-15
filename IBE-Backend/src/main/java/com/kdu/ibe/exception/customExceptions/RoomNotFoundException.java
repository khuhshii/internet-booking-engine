package com.kdu.ibe.exception.customExceptions;

public class RoomNotFoundException extends RuntimeException{
    @Override
    public String toString() {
        return "The room with the given id is not found";
    }
}
