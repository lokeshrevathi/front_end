package com.i2i.todoproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.i2i.todoproject.dto.TaskDTO;
import com.i2i.todoproject.mapper.MapStructMapper;
import com.i2i.todoproject.repository.TaskRepository;

@Service
public class TaskService {
	
	private TaskRepository taskRepository;
	private MapStructMapper mapper;
	
	@Autowired
	public TaskService(TaskRepository taskRepository,
					   MapStructMapper mapper) {
		this.taskRepository = taskRepository;
		this.mapper = mapper;
	}

	public TaskDTO addTask(TaskDTO taskDTO) {
		return mapper.taskToDto(taskRepository.save(mapper.taskDtoToEntity(taskDTO)));
	}
	
	public List<TaskDTO> getTasks() {
		return mapper.tasksToDto(taskRepository.findAll());
	}
}
