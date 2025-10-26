package org.nauman.app.jpa.repository;

import java.util.ArrayList;
import java.util.List;

import org.nauman.app.jpa.entity.UserEntity;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.Tuple;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Repository
public class UserRepositoryCriteria {
	
	@PersistenceContext
	private EntityManager enitityManager;
	
	
	public List<UserEntity> getAllUsers(){
		
		CriteriaBuilder criteriaBuilder = enitityManager.getCriteriaBuilder();
		CriteriaQuery<UserEntity> criteriaQuery = criteriaBuilder.createQuery(UserEntity.class);
		
		criteriaQuery.from(UserEntity.class);
		
		Query query = enitityManager.createQuery(criteriaQuery);
		
		return query.getResultList();
	}
	
	public List<String> getUserChildrenNames(Integer userId){
		
		List<String> childNames = new ArrayList<>();
		
		CriteriaBuilder criteriaBuilder = enitityManager.getCriteriaBuilder();
		
		//creating query with tuple instead of entity class as we are only selecting two columns from entity
		CriteriaQuery<Tuple> criteriaQuery = criteriaBuilder.createTupleQuery();
		
		//from table
		Root<UserEntity> root = criteriaQuery.from(UserEntity.class);
		
		//select columns
		criteriaQuery.multiselect(root.get("firstName"),root.get("lastName"));
		
		//where condition
		Predicate parentIdCheck = criteriaBuilder.equal(root.get("parentId"), userId);
		criteriaQuery.where(parentIdCheck);
		
		Query query = enitityManager.createQuery(criteriaQuery);
		
		List<Tuple> resultList = query.getResultList();
		
		for(Tuple child : resultList) {
			String firstName = (String) child.get(0);
			String lastName = (String) child.get(1);
			
			childNames.add(firstName + " " + lastName);
		}
		
		return childNames;
	}
	
	public String getUserParentName(Integer userId){
		
		String parentName = "";
		
		CriteriaBuilder criteriaBuilder = enitityManager.getCriteriaBuilder();
		
		//creating query with tuple instead of entity class as we are only selecting two columns from entity
		CriteriaQuery<Tuple> criteriaQuery = criteriaBuilder.createTupleQuery();
		
		//from table
		Root<UserEntity> root = criteriaQuery.from(UserEntity.class);
		
		//join table
		Join<UserEntity, UserEntity> parentJoin = root.join("parent");
		
		//select columns
		criteriaQuery.multiselect(parentJoin.get("firstName"),parentJoin.get("lastName"));
		
		//where condition
		Predicate userIdCheck = criteriaBuilder.equal(root.get("id"), userId);
		criteriaQuery.where(userIdCheck);
		
		Query query = enitityManager.createQuery(criteriaQuery);
		
		List<Tuple> resultList = query.setMaxResults(1).getResultList();
		
		for (Tuple child : resultList) {
			String firstName = (String) child.get(0);
			String lastName = (String) child.get(1);
			
			parentName = firstName + " " + lastName;
		}
		
		return parentName;
	}
}
