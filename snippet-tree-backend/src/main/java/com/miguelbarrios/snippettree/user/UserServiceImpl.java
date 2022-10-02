package com.miguelbarrios.snippettree.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepo;
	
	@Override
	public User getUserByUserName(String username) {
		return userRepo.findItemByUsername(username);
	}

}
