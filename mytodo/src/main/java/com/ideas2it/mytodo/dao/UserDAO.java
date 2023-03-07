package com.ideas2it.mytodo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.ideas2it.mytodo.entity.User;

public interface UserDAO extends JpaRepository<User, Integer> {

	@Query(value = "select * from user where is_signed_in = true", nativeQuery = true)
	User getSignedInUser();
	
	@Query(value = "select * from user where mail_id = :mailId and password = :password", nativeQuery = true)
	User getUserByPasswordAndMailId(String mailId, String password);
}
