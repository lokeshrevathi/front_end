package com.ideas2it.mytodo.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ideas2it.mytodo.dao.TaskListDAO;
import com.ideas2it.mytodo.dto.TaskListDTO;
import com.ideas2it.mytodo.dto.UserDTO;
import com.ideas2it.mytodo.entity.TaskList;
import com.ideas2it.mytodo.entity.User;

@Service
public class TaskListService {

	private TaskListDAO taskListDAO;
	private ModelMapper mapper;
	
	@Autowired
	public TaskListService(TaskListDAO taskListDAO, ModelMapper mapper) {
		this.taskListDAO = taskListDAO;
		this.mapper = mapper;
	}
	
	public TaskListDTO add(TaskListDTO taskListDTO) {
		return toTaskListDto(taskListDAO.save(toTaskList(taskListDTO)));
	}
	
	public List<TaskListDTO> getTaskLists() {
		return taskListDAO.findAll().stream().map(taskList -> toTaskListDto(taskList)).toList();
	}
	
	public List<TaskListDTO> getTaskListByUserId(int id) {
		return getTaskLists().stream().filter(taskList -> id == taskList.getUser().getId()).toList();
	}
	
	public TaskListDTO doActivelist(int id) {
		TaskList taskList = taskListDAO.findById(id).orElse(null);
		if (null != taskList) {
			taskList.setActive(true);
			return add(toTaskListDto(taskList));
		}
		return null;
	}
	
	public TaskListDTO doInActivelist(int id) {
		TaskList taskList = taskListDAO.findById(id).orElse(null);
		if (null != taskList) {
			taskList.setActive(false);
			return add(toTaskListDto(taskList));
		}
		return null;
	}
	
	public TaskListDTO getActiveTaskList() {
		TaskList taskList = taskListDAO.findActiveTaskList();
		if (null != taskList) {
			return toTaskListDto(taskListDAO.findActiveTaskList());
		}
		return null;
	}
	
	public TaskList getTaskListById(int id) {
		return taskListDAO.findById(id).orElse(null);
	}
	
	public TaskListDTO toTaskListDto(TaskList taskList) {
		TaskListDTO taskListDTO = mapper.map(taskList, TaskListDTO.class);
		taskListDTO.setUser(mapper.map(taskList.getUser(), UserDTO.class));
		return taskListDTO;
	}
	
	public TaskList toTaskList(TaskListDTO taskListDTO) {
		TaskList taskList = mapper.map(taskListDTO, TaskList.class);
		taskList.setUser(mapper.map(taskListDTO.getUser(), User.class));
		return taskList;
	}
}
