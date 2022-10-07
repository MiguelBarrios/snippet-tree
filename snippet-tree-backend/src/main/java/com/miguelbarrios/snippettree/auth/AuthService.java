package com.miguelbarrios.snippettree.auth;

import com.miguelbarrios.snippettree.user.User;

public interface AuthService {
	public User register(User user);
	public User getUserByUsername(String username);
	
}
