package com.miguelbarrios.snippettree.tree;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TreeRepository extends MongoRepository<Tree, String>{

	List<Tree> findAllByUsername(String username);
}
