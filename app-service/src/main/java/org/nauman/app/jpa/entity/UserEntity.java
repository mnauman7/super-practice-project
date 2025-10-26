package org.nauman.app.jpa.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
	@Column(name = "first_name", nullable = false)
    private String firstName;
    
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "telephone")
    private String telephone;
    
    @Column(name = "is_admin", columnDefinition = "TINYINT(1)")
    private Boolean isAdmin;
    
    @Column(name = "is_active", columnDefinition = "TINYINT(1)")
    private Boolean isActive;
    
    @Column(name = "parent_user")
    private Integer parentId;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_user", insertable = false, updatable = false)
    private UserEntity parent;

	@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private List<UserEntity> children;
	
    @Column(name = "email", length = 255, nullable = false)
    private String email;
    
    @Column(name = "password", length = 100, nullable = false)
    private String password;
    
    

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Boolean getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	
    public UserEntity getParent() {
		return parent;
	}

	public void setParent(UserEntity parent) {
		this.parent = parent;
	}

	public List<UserEntity> getChildren() {
		return children;
	}

	public void setChildren(List<UserEntity> children) {
		this.children = children;
	}
	
    public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
