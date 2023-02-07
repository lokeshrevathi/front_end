package com.i2i.todoproject.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.i2i.todoproject.dto.TaskDTO;
import com.i2i.todoproject.entity.Task;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

	TaskDTO taskToDto(Task task);
	
	Task taskDtoToEntity(TaskDTO taskDTO);
	
	List<TaskDTO> tasksToDto(List<Task> tasks);
	
	List<Task> taskDtosToEntity(List<TaskDTO> taskDTOs);
}
