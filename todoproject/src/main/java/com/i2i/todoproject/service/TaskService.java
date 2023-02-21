package com.i2i.todoproject.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.i2i.todoproject.dto.TaskDTO;
import com.i2i.todoproject.dto.UserDTO;
import com.i2i.todoproject.entity.Task;
import com.i2i.todoproject.entity.User;
import com.i2i.todoproject.mapper.MapStructMapper;
import com.i2i.todoproject.repository.TaskRepository;

@Service
public class TaskService {
	
	private TaskRepository taskRepository;
	private MapStructMapper mapper;
	private ModelMapper modelMapper;
	
	@Autowired
	public TaskService(TaskRepository taskRepository,
					   MapStructMapper mapper,
					   ModelMapper modelMapper) {
		this.taskRepository = taskRepository;
		this.mapper = mapper;
		this.modelMapper = modelMapper;
	}

	public TaskDTO addTask(TaskDTO taskDTO) {
		System.out.println(taskDTO.getUserDTO().getMailId());
		Task task = toTaskEntity(taskDTO);
		System.out.println(task.getUser().getId());
		return toTaskDto(taskRepository.save(task));
	}
	
	public List<TaskDTO> getTasks() {
		return taskRepository.getTasks().stream().map(task -> toTaskDto(task)).toList();
	}
	
	public Task getTaskById(int id) {
		return taskRepository.findById(id).get();
	}
	
	public TaskDTO updateTask(TaskDTO taskDTO) {
		return toTaskDto(taskRepository.save(toTaskEntity(taskDTO)));
	}
	
	public List<TaskDTO> getCompletedTaskByUserId(int id) {
		return taskRepository.getCompletedTaskByUserId(id).stream().map(task -> toTaskDto(task)).toList();
	}
	
	public List<TaskDTO> getTaskByName(int userId, String name) {
		if (name.equals("")) {
			return new ArrayList<TaskDTO>();
		}
		List<Task> tasks = taskRepository.findByTaskNameContains(name);
		return tasks.stream().map(task -> toTaskDto(task)).filter(i -> userId == i.getUserDTO().getId()).sorted((i, j) -> i.getTaskName().compareTo(j.getTaskName())).toList();
	}
	
	public List<TaskDTO> getTasksByUserId(int id) {
		return taskRepository.findByUserId(id).stream().map(task -> toTaskDto(task)).toList();
	}
	
	public TaskDTO toTaskDto(Task task) {
		TaskDTO taskDTO = mapper.taskToDto(task);
		System.out.println(task.getUser().getMailId());
		taskDTO.setUserDTO(modelMapper.map(task.getUser(), UserDTO.class));
		return taskDTO;
	}
	
	public Task toTaskEntity(TaskDTO taskDTO) {
		Task task = mapper.taskDtoToEntity(taskDTO);
		task.setUser(modelMapper.map(taskDTO.getUserDTO(), User.class));
		return task;
	}
}
