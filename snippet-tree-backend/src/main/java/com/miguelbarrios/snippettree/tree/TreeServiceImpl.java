package com.miguelbarrios.snippettree.tree;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	public Tree findByTreeName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Tree findByTreeId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Tree> getUserTrees(String username) {
		// TODO Auto-generated method stub
		return null;
	}

}
