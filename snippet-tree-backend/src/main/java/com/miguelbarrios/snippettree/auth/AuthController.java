package com.miguelbarrios.snippettree.auth;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import com.miguelbarrios.snippettree.user.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin({"*","http://localhost"})
public class AuthController {
	
	private static String username = "lochnessbarrios";
	
	@Autowired
	private AuthService authService;
	
	@PostMapping(path = "/register")
	public User register(@RequestBody User user, HttpServletResponse res) {
	    if (user == null) {
	        res.setStatus(400);
	    }
	    user = authService.register(user);
	    return user;
	}

	@GetMapping(path = "/authenticate")
	public User authenticate() {
		return authService.getUserByUsername(username);
	}
	

}