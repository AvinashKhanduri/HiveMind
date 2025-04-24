package com.avinash.HiveMind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HiveMindApplication {

	public static void main(String[] args) {
		SpringApplication.run(HiveMindApplication.class, args);
	}

}
