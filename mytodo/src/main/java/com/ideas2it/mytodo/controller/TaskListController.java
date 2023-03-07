package com.ideas2it.mytodo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.mytodo.dto.TaskListDTO;
import com.ideas2it.mytodo.service.TaskListService;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/v1/tasklist")
public class TaskListController {

	private TaskListService taskListService;
	
	public TaskListController(TaskListService taskListService) {
		this.taskListService = taskListService;
	}
	
	@PostMapping("/")
	public ResponseEntity<TaskListDTO> add(@RequestBody TaskListDTO taskListDTO) {
		TaskListDTO taskList = taskListService.add(taskListDTO);
		if (null != taskList) {
			return new ResponseEntity<TaskListDTO>(taskList, HttpStatus.OK);
		}
		return new ResponseEntity<TaskListDTO>(taskList, HttpStatus.BAD_REQUEST);
	}
	
//	@GetMapping("/")
//	public List<TaskListDTO> getTaskLists() {
//		return taskListService.getTaskLists();
//	}
	
	@GetMapping("/{id}")
	public List<TaskListDTO> getTaskListsByUserId(@PathVariable("id") int id) {
		return taskListService.getTaskListByUserId(id);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<TaskListDTO> toDoActiveTaskList(@PathVariable("id") int id) {
		TaskListDTO taskListDTO = taskListService.doActivelist(id);
		if (null != taskListDTO) {
			return new ResponseEntity<TaskListDTO>(taskListDTO, HttpStatus.OK);
		}
		return new ResponseEntity<TaskListDTO>(taskListDTO, HttpStatus.BAD_REQUEST);
	}
	
	@PatchMapping
	public ResponseEntity<TaskListDTO> toDoInActiveTaskList(@RequestParam("id") int id) {
		TaskListDTO taskListDTO = taskListService.doInActivelist(id);
		if (null != taskListDTO) {
			return new ResponseEntity<TaskListDTO>(taskListDTO, HttpStatus.OK);
		}
		return new ResponseEntity<TaskListDTO>(taskListDTO, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/")
	public ResponseEntity<TaskListDTO> getActiveTaskList() {
		TaskListDTO taskListDTO = taskListService.getActiveTaskList();
		if (null != taskListDTO) {
			return new ResponseEntity<TaskListDTO>(taskListDTO, HttpStatus.OK);
		}
		return new ResponseEntity<TaskListDTO>(taskListDTO, HttpStatus.BAD_REQUEST);
	}
}
