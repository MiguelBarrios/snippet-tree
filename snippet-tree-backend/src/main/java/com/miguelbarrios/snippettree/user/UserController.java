package com.miguelbarrios.snippettree.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@CrossOrigin({ "*", "http://localhost" })
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("users/{username}")
	public User getUserByUserName(@PathVariable String username) {
		System.out.println(username);
		return userService.getUserByUserName(username);
	}
}
