package com.miguelbarrios.snippettree.tree;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TreeRepository extends MongoRepository<Tree, String>{

}
