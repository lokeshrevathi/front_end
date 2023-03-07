package com.ideas2it.mytodo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.mytodo.dto.TaskDTO;
import com.ideas2it.mytodo.service.TaskService;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/v1/task")
public class TaskController {

	private TaskService taskService;
	
	@Autowired
	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}
	
	@PostMapping("/")
	public ResponseEntity<TaskDTO> add(@RequestBody TaskDTO taskDTO) {
		TaskDTO task = taskService.add(taskDTO);
		if (null != task) {
			return new ResponseEntity<TaskDTO>(task, HttpStatus.OK);
		}
		return new ResponseEntity<TaskDTO>(task, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/{id}")
	public List<TaskDTO> getTaskByTaskListId(@PathVariable(value = "id") int id) {
		return taskService.getTaskByTaskListId(id);
	}
	
	@GetMapping
	public List<TaskDTO> getCompletedTask(@RequestParam(value = "id") int id) {
		return taskService.getCompletedTask(id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<TaskDTO> deleteById(@PathVariable("id") int id) {
		TaskDTO task = taskService.delete(id);
		if (null != task) {
			return new ResponseEntity<TaskDTO>(task, HttpStatus.OK);
		}
		return new ResponseEntity<TaskDTO>(task, HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{task-id}/{task-list-id}")
	public ResponseEntity<TaskDTO> toImportantTask(@PathVariable("task-id") int taskId, @PathVariable("task-list-id") int taskListId) {
		TaskDTO taskDTO = taskService.toImportantTask(taskId, taskListId);
		if (null != taskDTO) {
			return new ResponseEntity<TaskDTO>(taskDTO, HttpStatus.OK);
		}
		return new ResponseEntity<TaskDTO>(taskDTO, HttpStatus.BAD_REQUEST);	}
}
