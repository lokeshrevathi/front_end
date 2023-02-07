package com.i2i.todoproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i2i.todoproject.dto.TaskDTO;
import com.i2i.todoproject.service.TaskService;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController {

	private TaskService taskService;
	
	@Autowired
	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}
	
	@PostMapping
	public TaskDTO addTask(TaskDTO taskDTO) {
		return taskService.addTask(taskDTO);
	}
}
