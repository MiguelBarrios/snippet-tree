package com.miguelbarrios.snippettree.snippet;

public interface SnippetService {

	CodeSnippet findById(String id);

	CodeSnippet addSnippet(CodeSnippet snippet);

}
