package com.i2i.todoproject.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i2i.todoproject.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	@Query(value = "select * from user where mail_id = :mailId and password = :password", nativeQuery = true)
	User getUserByPasswordAndMailId(String mailId, String password);
	
	@Query(value = "select * from user where is_signed_in = true", nativeQuery = true)
	User getSignedInUser();
	
	@Modifying
	@Transactional
	@Query(value = "update user set is_signed_in = false where id = :id", nativeQuery = true)
	void toSignOutUser(@Param(value = "id") int id);
}