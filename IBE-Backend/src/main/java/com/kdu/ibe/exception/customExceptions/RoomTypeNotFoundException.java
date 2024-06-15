package com.kdu.ibe.exception.customExceptions;

public class RoomTypeNotFoundException extends RuntimeException{
    @Override
    public String toString() {
        return "Room type not found";
    }
}
