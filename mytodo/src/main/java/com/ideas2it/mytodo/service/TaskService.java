package com.ideas2it.mytodo.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ideas2it.mytodo.dao.TaskDAO;
import com.ideas2it.mytodo.dao.TaskListDAO;
import com.ideas2it.mytodo.dto.TaskDTO;
import com.ideas2it.mytodo.dto.TaskListDTO;
import com.ideas2it.mytodo.entity.Task;
import com.ideas2it.mytodo.entity.TaskList;

@Service
public class TaskService {

	private TaskDAO taskDAO;
	private ModelMapper mapper;
	private TaskListService taskListService;
	
	@Autowired
	public TaskService(TaskDAO taskDAO, ModelMapper mapper,
			           TaskListService taskListService) {
		this.taskDAO = taskDAO;
		this.mapper = mapper;
		this.taskListService = taskListService;
	}
	
	public TaskDTO add(TaskDTO taskDTO) {
		return toTaskDto(taskDAO.save(toTask(taskDTO)));
	}
	
	public List<TaskDTO> getTaskByTaskListId(int id) {
		return getTasks().stream().filter(task -> id == task.getTaskList()
				.getId() && !task.isDeleted()).map(task -> toTaskDto(task))
				.toList();
	}
	
	public List<TaskDTO> getCompletedTask(int id) {
		return getTasks().stream().filter(task -> id == task.getTaskList()
				.getId() && !task.isDeleted() && task.isCompleted())
				.map(task -> toTaskDto(task)).toList(); 
	}
	
	public Task getTaskById(int id) {
		return taskDAO.findById(id).orElse(null);
	}
	
	public TaskDTO update(TaskDTO taskDTO) {
		return add(taskDTO);
	}
	
	public TaskDTO toCompleteTask(int id) {
		Task task = getTaskById(id);
		if (null != task) {
			task.setCompleted(true);
			return add(mapper.map(task, TaskDTO.class));
		}
		return null;
	}
	
	public TaskDTO delete(int id) {
		Task task = getTaskById(id);
		if (null != task) {
			task.setDeleted(true);
			return add(mapper.map(task, TaskDTO.class));
		}
		return null;
	}
	
	public List<Task> getTasks() {
		return taskDAO.findAll();
	}
	
	public TaskDTO toImportantTask(int taskId, int taskListId) {
		TaskList taskList = taskListService.getTaskListById(taskListId);
		Task task = getTaskById(taskId);
		if (null != taskList) {
			task.setTaskList(taskList);
			return add(toTaskDto(task));
		}
		return null;
	}
	
	public TaskDTO toTaskDto(Task task) {
		TaskDTO taskDTO = mapper.map(task, TaskDTO.class);
		taskDTO.setTaskListDTO(mapper.map(task.getTaskList(), TaskListDTO.class));
		return taskDTO;
	}
	
	public Task toTask(TaskDTO taskDTO) {
		Task task = mapper.map(taskDTO, Task.class);
		task.setTaskList(mapper.map(taskDTO.getTaskListDTO(), TaskList.class));
		return task;
	}
}
