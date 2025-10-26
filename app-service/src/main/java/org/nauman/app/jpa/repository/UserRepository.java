package org.nauman.app.jpa.repository;

import java.util.List;

import org.nauman.app.jpa.entity.UserEntity;
import org.nauman.app.jpa.projections.UserFamilyTreeView;
import org.nauman.app.jpa.projections.UserLoginView;
import org.nauman.app.jpa.projections.UserParentView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	
	public List<UserEntity> findByIsActive(Boolean isActive);
	
	public List<UserEntity> findByFirstNameContainsOrLastNameContainsOrAddressContainsOrCityContainsOrTelephoneContains(
			String firstName, String lastName, String address, String city, String telephone);
	
	@Modifying
	@Query("UPDATE UserEntity u SET u.isActive = :isActive WHERE u.id = :userId")
	public void updateUserActiveStatus(Boolean isActive, Integer userId);
	
	
	public UserFamilyTreeView findFamilyTreeById(Integer id);
	
	@Query("SELECT u.firstName as userFirstName, u.lastName as userLastName, p.firstName as parentFirstName,"
			+ " p.lastName as parentLastName"
			+ " FROM UserEntity u JOIN u.parent p WHERE u.id = :userId")
	public UserParentView findUserParent(Integer userId);
	
	
	public UserLoginView findByEmail(String email);
	
}
