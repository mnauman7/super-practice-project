package org.nauman.app.model;

import java.util.List;

public class UserFamilyTreeDTO {
	
	private String grandFatherName;
	
	private String fatherName;
	
	private List<String> childrenNames;
	
	private List<String> grandChildNames;

	
	public String getGrandFatherName() {
		return grandFatherName;
	}

	public void setGrandFatherName(String grandFatherName) {
		this.grandFatherName = grandFatherName;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public List<String> getChildrenNames() {
		return childrenNames;
	}

	public void setChildrenNames(List<String> childrenNames) {
		this.childrenNames = childrenNames;
	}

	public List<String> getGrandChildNames() {
		return grandChildNames;
	}

	public void setGrandChildNames(List<String> grandChildNames) {
		this.grandChildNames = grandChildNames;
	}
	
}
