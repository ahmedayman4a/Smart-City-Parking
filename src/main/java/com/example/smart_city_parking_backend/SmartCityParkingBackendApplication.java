package com.example.smart_city_parking_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartCityParkingBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SmartCityParkingBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Hello World");
	}
}
