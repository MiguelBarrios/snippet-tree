package com.miguelbarrios.snippettree.auth;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.miguelbarrios.snippettree.user.Role;
import com.miguelbarrios.snippettree.user.User;
import com.miguelbarrios.snippettree.user.UserRepository;
import com.miguelbarrios.snippettree.user.UserRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	

	@Override
	public User register(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		user.setEnabled(true);
		user.setCreatedAt(LocalDateTime.now());
		
		Role role = new Role();
		role.setName("USER");
		UserRole userRole = new UserRole();
		userRole.setRole(role);
		
		Role role2 = new Role();
		role2.setName("ROLE_USER");
		UserRole userRole2 = new UserRole();
		userRole2.setRole(role2);
		
		Set<UserRole> roles = new HashSet<>();
		roles.add(userRole);
		roles.add(userRole2);
		
		user.setUserRoles(roles);
		
		
		User savedUser = userRepo.save(user);
		System.out.println(savedUser);
		
		return savedUser;
	}

	@Override
	public User getUserByUsername(String username) {
		System.out.println("looking for user: " + username);
		User user =  userRepo.findItemByUsername(username);
		System.out.println(user);
		
		return user;
		
	}
	

}
