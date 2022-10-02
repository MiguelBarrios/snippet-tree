package com.miguelbarrios.snippettree.snippet;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SnippetServiceImpl implements SnippetService {
	
	@Autowired
	SnippetRepository snippetRepository;
	
	@Override
	public CodeSnippet findById(String id) {
		Optional<CodeSnippet> option = snippetRepository.findById(id);
		return (option.isPresent()) ? option.get() : null;
	}
	
	@Override
	public CodeSnippet addSnippet(CodeSnippet snippet) {
		CodeSnippet managedSnippet = snippetRepository.save(snippet);
		return managedSnippet;
	}
	
}
