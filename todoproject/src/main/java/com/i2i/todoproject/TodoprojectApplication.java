package com.i2i.todoproject;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TodoprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoprojectApplication.class, args);
	}

	@Bean
	public ModelMapper getModleMapper() {
		return new ModelMapper();
	}
}