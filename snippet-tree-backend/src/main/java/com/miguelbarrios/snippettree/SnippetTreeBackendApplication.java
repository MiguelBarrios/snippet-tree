package com.miguelbarrios.snippettree;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class SnippetTreeBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SnippetTreeBackendApplication.class, args);
	}

}
