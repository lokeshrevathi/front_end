package com.ideas2it.mytodo.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ideas2it.mytodo.dao.UserDAO;
import com.ideas2it.mytodo.dto.UserDTO;
import com.ideas2it.mytodo.entity.User;

@Service
public class UserService {

	private UserDAO userDAO;
	private ModelMapper mapper;
	
	@Autowired
	public UserService(UserDAO userDAO, ModelMapper mapper) {
		this.userDAO = userDAO;
		this.mapper = mapper;
	}
	
	public UserDTO add(UserDTO userDTO) {
		return mapper.map(userDAO.save(mapper.map(userDTO, User.class)), UserDTO.class);
	}
	
	public List<UserDTO> getUsers() {
		return userDAO.findAll().stream().map(user -> mapper.map(user, UserDTO.class)).toList();
	}
	
	public UserDTO getUserById(int id) {
		User user = userDAO.findById(id).orElse(null);
		if (null != user) {
			return mapper.map(user, UserDTO.class);
		}
		return null;
	}
	
	public UserDTO toSignInUser(String mailId, String password) {
		User user = userDAO.getUserByPasswordAndMailId(mailId, password);
		if (null != user) {
			user.setSignedIn(true);
			return add(mapper.map(user, UserDTO.class));
		}
		return null;
	}
	
	public UserDTO toSignOutUser(int id) {
		UserDTO userDTO = getUserById(id);
		if (null != userDTO) {
			userDTO.setSignedIn(false);
			return add(userDTO);
		}
		return userDTO;
	}
	
	public UserDTO getSignedInUser() {
		User user = userDAO.getSignedInUser();
		if (null == user) {
			return null;
		}
		return mapper.map(user, UserDTO.class);
	}
}
