package com.miguelbarrios.snippettree.tree;

import java.util.List;

public interface TreeService {
	
	Tree save(Tree tree);
	
	Tree delete(String treeId);
	
	Tree findByTreeName();
	
	Tree findByTreeId();
	
	List<Tree> getUserTrees(String username);
}
