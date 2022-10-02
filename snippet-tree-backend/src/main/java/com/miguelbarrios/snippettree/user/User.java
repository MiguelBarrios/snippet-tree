package com.miguelbarrios.snippettree.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public class User {
	
	@Id
	private String id;
	
	private String username;
	
	private String[] trees;
	
	public User(String id, String username, String[] trees) {
		this.id = id;
		this.username = username;
		this.trees = trees;
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

	public String[] getTrees() {
		return trees;
	}

	public void setTrees(String[] trees) {
		this.trees = trees;
	}
	
	

}
