package com.i2i.todoproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i2i.todoproject.dto.TaskDTO;
import com.i2i.todoproject.service.TaskService;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/v1/task")
public class TaskController {

	private TaskService taskService;
	
	@Autowired
	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}
	
	@PostMapping
	public TaskDTO addTask(@RequestBody TaskDTO taskDTO) {
		return taskService.addTask(taskDTO);
	}
	
	@GetMapping
	public List<TaskDTO> getTasks() {
		return taskService.getTasks();
	}
}
