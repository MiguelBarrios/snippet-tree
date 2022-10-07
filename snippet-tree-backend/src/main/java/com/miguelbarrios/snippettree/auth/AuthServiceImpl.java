package com.miguelbarrios.snippettree.auth;

import java.time.LocalDateTime;

import com.miguelbarrios.snippettree.user.User;
import com.miguelbarrios.snippettree.user.UserRepository;
import com.miguelbarrios.snippettree.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
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
		System.out.println("looking for user: " + username);
		User user =  userRepo.findItemByUsername(username);
		System.out.println(user);
		
		return user;
		
	}
	

}
