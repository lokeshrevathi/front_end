package com.i2i.todoproject.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.i2i.todoproject.dto.TaskDTO;
import com.i2i.todoproject.dto.UserDTO;
import com.i2i.todoproject.entity.Task;
import com.i2i.todoproject.entity.User;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

	TaskDTO taskToDto(Task task);
	
	Task taskDtoToEntity(TaskDTO taskDTO);
	
	List<TaskDTO> tasksToDto(List<Task> tasks);
	
	List<Task> taskDtosToEntity(List<TaskDTO> taskDTOs);
	
	UserDTO userToDto(User user);
	
	User userDtoToEntity(UserDTO userDTO);
	
	List<UserDTO> usersToDto(List<User> users);
	
	List<User> userDtosToEntity(List<UserDTO> userDTOs);
}
