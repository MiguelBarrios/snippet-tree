package com.miguelbarrios.snippettree.user;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Document("user")
public class User  implements UserDetails {
	
	@Id
	private String id;
	
	private String username;

	private String password;

	private boolean enabled;
	
	private Set<UserRole> userRoles;


	private LocalDateTime createdAt;
	
	private String[] trees;
	
	public User() {}
	


	public User(String id, String username, String password, boolean enabled, Set<UserRole> userRoles,
			LocalDateTime createdAt, String[] trees) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.userRoles = userRoles;
		this.createdAt = createdAt;
		this.trees = trees;
	}







	public String getId() {
		return id;
	}



	public void setId(String id) {
		this.id = id;
	}


	@Override
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


	@Override
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



	public Set<UserRole> getUserRoles() {
		return userRoles;
	}



	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
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



	@Override
	public Collection<UserRole> getAuthorities() {
		return this.userRoles;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}
	
	

}
