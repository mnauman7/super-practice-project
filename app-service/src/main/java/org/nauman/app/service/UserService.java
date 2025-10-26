package org.nauman.app.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.nauman.app.jpa.entity.UserEntity;
import org.nauman.app.jpa.projections.UserFamilyTreeView;
import org.nauman.app.jpa.projections.UserParentView;
import org.nauman.app.jpa.repository.UserRepository;
import org.nauman.app.jpa.repository.UserRepositoryCriteria;
import org.nauman.app.model.UserDTO;
import org.nauman.app.model.UserFamilyTreeDTO;
import org.nauman.app.model.UserParentDTO;
import org.nauman.app.model.UserViewDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserRepositoryCriteria userRepositoryCriteria;

	@Autowired
	private ModelMapper modelMapper;
	
	private final Logger logs = LoggerFactory.getLogger(UserService.class);

	public void createUser(UserDTO userDTO) {
		
		try {
			UserEntity user = this.modelMapper.map(userDTO, UserEntity.class);
			
			if (user.getIsActive() == null) {
				user.setIsActive(true);
			}
			
			if (user.getIsAdmin() == null) {
				user.setIsAdmin(false);
			}
			
			userRepository.save(user);
			
		} catch (Exception e) {
			logs.error("create user failed", e);
		}
	}
	
	public void updateUser(UserDTO userDTO) {
		
		try {
			UserEntity user = this.modelMapper.map(userDTO, UserEntity.class);
			
			if (user.getIsActive() == null) {
				user.setIsActive(true);
			}
			
			if (user.getIsAdmin() == null) {
				user.setIsAdmin(false);
			}
			
			userRepository.save(user);
			
		} catch (Exception e) {
			logs.error("update user failed", e);
		}
	}
	
	public UserViewDTO getUser(Integer userId) {
		
		try {
			UserEntity user = userRepository.findById(userId).get();
			
			return this.modelMapper.map(user, UserViewDTO.class);
			
		} catch (Exception e) {
			logs.error("get user failed", e);
		}
		
		return null;
	}
	
	public UserDTO getUserDetails(Integer userId) {
		
		try {
			UserEntity user = userRepository.findById(userId).get();
			
			return this.modelMapper.map(user, UserDTO.class);
			
		} catch (Exception e) {
			logs.error("get user failed", e);
		}
		
		return null;
	}
	
	public UserViewDTO getUserAsSuperUser(Integer userId) {
		
		try {
			UserEntity user = userRepository.findById(userId).get();
			
			UserViewDTO userDTO = this.modelMapper.map(user, UserViewDTO.class);
			
			userDTO.setFirstName("Super " + userDTO.getFirstName());
			userDTO.setLastName("Super " + userDTO.getLastName());
			userDTO.setIsAdmin(true);
			
			return userDTO;
			
		} catch (Exception e) {
			logs.error("get super user failed", e);
		}
		
		return null;
	}
	
	public UserFamilyTreeDTO getUserFamilyTree(Integer userId) {
		
		try {
			UserFamilyTreeView userFamilyTree = userRepository.findFamilyTreeById(userId);
			
			UserFamilyTreeDTO familyTreeDTO = new UserFamilyTreeDTO();
			
			if (userFamilyTree.getParent() != null) {
				familyTreeDTO.setFatherName(userFamilyTree.getParent().getFirstName() 
						+ " " + userFamilyTree.getParent().getLastName());
				
				if(userFamilyTree.getParent().getParent() != null) {
					familyTreeDTO.setGrandFatherName(userFamilyTree.getParent().getParent().getFirstName() 
							+ " " + userFamilyTree.getParent().getParent().getLastName());
				}
			}
			
			
			List<String> childNames = new ArrayList<>();
			List<String> grandChildNames = new ArrayList<>();
			
			if (userFamilyTree.getChildren() != null) {
				for (UserEntity childUser : userFamilyTree.getChildren()) {
					childNames.add(childUser.getFirstName() + " " + childUser.getLastName());
					
					if (childUser.getChildren() == null) {
						continue;
						
					} else {
						for (UserEntity grandChildUser : childUser.getChildren()) {
							grandChildNames.add(grandChildUser.getFirstName() + " " + grandChildUser.getLastName());
						}
					}
				}
			}
			
			
			familyTreeDTO.setChildrenNames(childNames);
			familyTreeDTO.setGrandChildNames(grandChildNames);
			
			return familyTreeDTO;
			
		} catch (Exception e) {
			logs.error("get user family failed", e);
		}
		
		return new UserFamilyTreeDTO();
	}
	
	
	public UserParentDTO getUserParent(Integer userId) {
		
		try {
			UserParentView userParent = userRepository.findUserParent(userId);
			
			UserParentDTO userParentDTO = new UserParentDTO();
			
			userParentDTO.setUserFirstName(userParent.getUserFirstName());
			userParentDTO.setUserLastName(userParent.getUserLastName());
			userParentDTO.setParentFirstName(userParent.getParentFirstName());
			userParentDTO.setParentLastName(userParent.getParentLastName());
			
			return userParentDTO;
			
		} catch (Exception e) {
			logs.error("get user parent failed", e);
		}
		
		return new UserParentDTO();
	}
	
	public List<UserViewDTO> searchUsers(String search) {
		
		try {
			List<UserEntity> userEntityList =
					userRepository.findByFirstNameContainsOrLastNameContainsOrAddressContainsOrCityContainsOrTelephoneContains(
							search,search,search,search,search);
			
			List<UserViewDTO> userDTOList = modelMapper.map(userEntityList, new TypeToken<List<UserViewDTO>>() {}.getType());
			
			return userDTOList;
			
		} catch (Exception e) {
			logs.error("search user failed", e);
		}
		
		return new ArrayList<>();
	}
	
	public List<UserViewDTO> getAllActiveUsers() {
		
		try {
			List<UserEntity> userEntityList = userRepository.findByIsActive(true);
			
			List<UserViewDTO> userDTOList = modelMapper.map(userEntityList, new TypeToken<List<UserViewDTO>>() {}.getType());
			
			return userDTOList;
			
		} catch (Exception e) {
			logs.error("get all active users failed", e);
		}
		
		return new ArrayList<>();
	}
	
	public List<UserViewDTO> getAllUsers() {
		
		try {
			List<UserEntity> userEntityList = userRepositoryCriteria.getAllUsers();
			
			List<UserViewDTO> userDTOList = modelMapper.map(userEntityList, new TypeToken<List<UserViewDTO>>() {}.getType());
			
			return userDTOList;
			
		} catch (Exception e) {
			logs.error("get all users failed", e);
		}
		
		return new ArrayList<>();
	}
	
	public List<String> getUserChildNames(Integer userId) {
		
		try {
			return userRepositoryCriteria.getUserChildrenNames(userId);
			
		} catch (Exception e) {
			logs.error("get user child names failed", e);
		}
		
		return new ArrayList<>();
	}
	
	public String getUserParentName(Integer userId) {
		
		try {
			return userRepositoryCriteria.getUserParentName(userId);
			
		} catch (Exception e) {
			logs.error("get user parent name failed", e);
		}
		
		return "";
	}
	
	@Transactional
	public void updatedActiveStatusOfUser(Integer userId, Boolean isActive) {
		
		try {
			userRepository.updateUserActiveStatus(isActive, userId);
		}catch(Exception e) {
			logs.error("get active status of user failed", e);
		}
	}
}
