package com.miguelbarrios.snippettree.tree;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@CrossOrigin({ "*", "http://localhost" })
public class TreeController {
	
	private static String username = "lochnessbarrios";
	
	@Autowired
	private TreeService treeService;
	
	@PostMapping("trees")
	private Tree saveTree(@RequestBody Tree tree, HttpServletResponse response) {
		Tree managedTree = treeService.save(tree);
		if(managedTree == null) {
			response.setStatus(409);
		}
		
		return managedTree;
	}
	
	@DeleteMapping("trees/{treeId}")
	private void deleteTree(@PathVariable String treeId, HttpServletResponse response) {
		boolean deleted = treeService.delete(treeId);
		if(!deleted) {
			response.setStatus(404);
		}
	}
	
	@GetMapping("trees/{treeId}")
	private Tree getTreeById(@PathVariable String treeId, HttpServletResponse response) {
		Tree tree = treeService.findByTreeId(treeId);
		if(tree == null) {
			response.setStatus(404);
		}
		
		return tree;
	}
	
	@GetMapping("trees/users")
	private List<Tree> getUserTrees(HttpServletResponse response, Principal principal){
		List<Tree> trees;
		try {
			trees = treeService.getUserTrees(username);
		}catch(Exception e) {
			trees = null;
			e.printStackTrace();
			response.setStatus(404);
		}
		return trees;
	}
}
