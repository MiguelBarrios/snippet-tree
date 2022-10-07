package com.miguelbarrios.snippettree.auth;

import java.time.LocalDateTime;

import com.miguelbarrios.snippettree.user.User;
import com.miguelbarrios.snippettree.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserRepository userRepo;
	

	@Override
	public User register(User user) {
		user.setPassword(user.getPassword());

		user.setEnabled(true);
		user.setRole("standard");
		user.setCreatedAt(LocalDateTime.now());
		userRepo.save(user);
		
		return user;
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}
	

}
