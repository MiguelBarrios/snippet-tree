package com.miguelbarrios.snippettree.snippet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1")
public class SnippetController {

	@Autowired
	SnippetService snippetService;
	
	@GetMapping("snippets/{id}")
	public CodeSnippet findById(@PathVariable String id) {
		return snippetService.findById(id);
	}
	
	@PostMapping("snippets")
	public CodeSnippet addSnippet(@RequestBody CodeSnippet snippet) {
		return snippetService.addSnippet(snippet);
	}
	
	
}
