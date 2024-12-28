package com.amae.smartcityparking.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseDTO {
    private String message;
    private int statusCode;
    private Object data;
    private boolean success;
    private Object notifications;

}
