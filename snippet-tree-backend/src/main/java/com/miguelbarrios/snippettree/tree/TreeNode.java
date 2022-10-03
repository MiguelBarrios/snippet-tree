package com.miguelbarrios.snippettree.tree;

public class TreeNode {
	
	private String name;
	
	private String type;
	
	private String fileId;
	
	private String[] files;
	
	private TreeNode[] directories;

	public TreeNode(String name, String type, String fileId, String[] files, TreeNode[] directories) {
		super();
		this.name = name;
		this.type = type;
		this.fileId = fileId;
		this.files = files;
		this.directories = directories;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public String[] getFiles() {
		return files;
	}

	public void setFiles(String[] files) {
		this.files = files;
	}

	public TreeNode[] getDirectories() {
		return directories;
	}

	public void setDirectories(TreeNode[] directories) {
		this.directories = directories;
	}

	
}
