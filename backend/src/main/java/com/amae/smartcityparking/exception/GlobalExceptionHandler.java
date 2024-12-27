package com.amae.smartcityparking.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoAvailableSpotsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleNoAvailableSpotsException(NoAvailableSpotsException ex) {
        return Map.of("error", ex.getMessage());
    }

    @ExceptionHandler(SpotNotAvailableException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleSpotNotAvailableException(SpotNotAvailableException ex) {
        return Map.of("error", ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handleGenericException(Exception ex) {
        return Map.of("error", "An unexpected error occurred.");
    }
}
