package com.amae.smartcityparking.exception;

public class NoAvailableSpotsException extends RuntimeException {
    public NoAvailableSpotsException(String message) {
        super(message);
    }
}
