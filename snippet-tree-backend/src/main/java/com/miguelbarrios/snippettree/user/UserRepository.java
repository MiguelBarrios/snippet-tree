package com.miguelbarrios.snippettree.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String>{
	
	@Query("{username:'?0'}")
	User findItemByUsername(String username);
	
	User findByUsername(String username);
	
	public long count();

}
