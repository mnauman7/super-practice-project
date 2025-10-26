package org.nauman.app.jpa.projections;

import java.util.List;

import org.nauman.app.jpa.entity.UserEntity;

public interface UserFamilyTreeView {
	
	public UserEntity getParent();
	
	public List<UserEntity> getChildren();
}
