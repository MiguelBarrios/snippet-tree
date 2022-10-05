package com.miguelbarrios.snippettree.tree;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class TreeServiceImpl implements TreeService {
	
	@Autowired
	private TreeRepository treeRepository;

	@Override
	public Tree save(Tree tree) {
		Tree managedTree = null;
		try {
			managedTree = treeRepository.save(tree);
		}
		catch(Exception e) {
			managedTree = null;
		}
		
		return managedTree;
	}

	@Override
	public boolean delete(String treeId) {
		try {
			treeRepository.deleteById(treeId);	
		}
		catch(Exception e) {
			return false;
		}
		
		return true;
		
		
	}


	@Override
	public Tree findByTreeId(String treeId) {	
		Optional<Tree> option = treeRepository.findById(treeId);
		Tree tree = option.isPresent() ? option.get() : null;
		return tree;
	}

	@Override
	public List<Tree> getUserTrees(String username) {
		List<Tree> trees = treeRepository.findAllByUsername(username);
		return trees;
	}

}
