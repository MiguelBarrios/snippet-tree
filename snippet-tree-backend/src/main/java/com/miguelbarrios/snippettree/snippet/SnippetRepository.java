package com.miguelbarrios.snippettree.snippet;

import org.springframework.data.mongodb.repository.MongoRepository;

import jdk.jshell.Snippet;

public interface SnippetRepository extends MongoRepository<CodeSnippet, String>{
	
}
