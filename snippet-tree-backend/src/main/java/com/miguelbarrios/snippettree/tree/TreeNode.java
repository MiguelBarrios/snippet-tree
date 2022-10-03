package com.miguelbarrios.snippettree.tree;

public class TreeNode {
	
	private String name;
	
	private boolean isFile;
	
	private String fileId;
	
	private TreeNode[] items;
	
	private TreeNode() {}

	public TreeNode(String name, boolean isFile, String fileId, TreeNode[] items) {
		super();
		this.name = name;
		this.isFile = isFile;
		this.fileId = fileId;
		this.items = items;
	}

	public TreeNode(String name, String fileId) {
		super();
		this.name = name;
		this.isFile = true;
		this.fileId = fileId;
		this.items = null;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isFile() {
		return isFile;
	}

	public void setFile(boolean isFile) {
		this.isFile = isFile;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public TreeNode[] getItems() {
		return items;
	}

	public void setItems(TreeNode[] items) {
		this.items = items;
	}

	
	
	
	



}
