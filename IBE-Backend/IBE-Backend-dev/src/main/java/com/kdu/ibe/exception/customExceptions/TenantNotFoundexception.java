package com.kdu.ibe.exception.customExceptions;

public class TenantNotFoundexception extends RuntimeException {
    @Override
    public String toString() {
        return "No tenant found with the specified id";
    }
}
