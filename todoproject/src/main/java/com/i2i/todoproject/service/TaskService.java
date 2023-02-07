package com.i2i.todoproject.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.i2i.todoproject.dto.TaskDTO;
import com.i2i.todoproject.entity.Task;
import com.i2i.todoproject.repository.TaskRepository;

@Service
public class TaskService {
	
	private TaskRepository taskRepository;
	private ModelMapper mapper;
	
	@Autowired
	public TaskService(TaskRepository taskRepository,
					   ModelMapper mapper) {
		this.taskRepository = taskRepository;
		this.mapper = mapper;
	}

	public TaskDTO addTask(TaskDTO taskDTO) {
		return mapper.map(taskRepository.save(mapper.map(taskDTO, Task.class)), TaskDTO.class);
	}
	
	public List<TaskDTO> getTasks() {
		return taskRepository.findAll().stream().map(task -> mapper.map(task, TaskDTO.class)).toList();
	}
}
