package com.miguelbarrios.snippettree.snippet;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1")
@CrossOrigin({ "*", "http://localhost" })
public class SnippetController {

	@Autowired
	SnippetService snippetService;
	
	@GetMapping("snippets/{id}")
	public CodeSnippet findById(@PathVariable String id, HttpServletResponse response) {
		CodeSnippet snippet = snippetService.findById(id);
		if(snippet == null) {
			response.setStatus(404);
		}
		return snippet;
	}
	
	@PostMapping("snippets")
	public CodeSnippet saveSnippet(@RequestBody CodeSnippet snippet) {
		return snippetService.addSnippet(snippet);
	}
	
	@DeleteMapping("snippets/{id}")
	public void deleteSnippet(@PathVariable String id, HttpServletResponse response) {
		try {
			snippetService.deleteSnippet(id);	
		}catch(Exception e) {
			response.setStatus(404);
		}
	}
	
	
	
}
