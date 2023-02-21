package com.i2i.todoproject.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.i2i.todoproject.dto.UserDTO;
import com.i2i.todoproject.entity.User;
import com.i2i.todoproject.mapper.MapStructMapper;
import com.i2i.todoproject.repository.TaskRepository;
import com.i2i.todoproject.repository.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;
	private MapStructMapper mapper;
	private TaskRepository taskRepository;

	@Autowired 
	public UserService(UserRepository userRepository,
					   MapStructMapper mapper,
					   TaskRepository taskRepository) {
		this.userRepository = userRepository;
		this.mapper = mapper;
		this.taskRepository = taskRepository;
	}
	
	public UserDTO addUser(UserDTO userDTO) {
		User user = userRepository.save(mapper.userDtoToEntity(userDTO));
		mapper.taskDtosToEntity(userDTO.getTasks()).forEach(task -> {
			task.setUser(user);
			taskRepository.save(task);
		});
		return mapper.userToDto(user);
	}
	
	public UserDTO isValidAccount(String mailId, String password) {
		System.out.println(mailId + " " + password);
		User user = userRepository.getUserByPasswordAndMailId(mailId, password);
		if (null != user) {
			user.setSignedIn(true);
			addUser(mapper.userToDto(user));
			return mapper.userToDto(user);
		}
		return null;
	}
	
	public UserDTO getSignedInUser() {
		return mapper.userToDto(userRepository.getSignedInUser());
	}
	
	public void toSignOutUser(int id) {
		userRepository.toSignOutUser(id);
	}
}
