package com.miguelbarrios.snippettree.user;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public class User {
	
	@Id
	private String id;
	
	private String username;
	
	private String firstName;

	private String lastName;

	private String password;

	private boolean enabled;

	private String role;

	private String email;

	private String biography;

	private LocalDateTime createdAt;
	
	private String[] trees;
	
	public User() {}

	public User(String id, String username, String firstName, String lastName, String password, boolean enabled,
			String role, String email, String biography, LocalDateTime createdAt, String[] trees) {
		super();
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.enabled = enabled;
		this.role = role;
		this.email = email;
		this.biography = biography;
		this.createdAt = createdAt;
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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBiography() {
		return biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String[] getTrees() {
		return trees;
	}

	public void setTrees(String[] trees) {
		this.trees = trees;
	}
	
	

}
