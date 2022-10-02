package com.miguelbarrios.snippettree.tree;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("tree")
public class Tree {
	
	@Id
	private String id;
	
	private String username;
	
	private String treename;
	
	private String tree;

	public Tree(String id, String username, String treename, String tree) {
		super();
		this.id = id;
		this.username = username;
		this.treename = treename;
		this.tree = tree;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTreename() {
		return treename;
	}

	public void setTreename(String treename) {
		this.treename = treename;
	}

	public String getTree() {
		return tree;
	}

	public void setTree(String tree) {
		this.tree = tree;
	}
}
