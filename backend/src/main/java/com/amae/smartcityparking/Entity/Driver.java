package com.amae.smartcityparking.Entity;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class Driver extends User{

    private String licensePlateNumber;
    private String carModel;
    private String carColor;

}
