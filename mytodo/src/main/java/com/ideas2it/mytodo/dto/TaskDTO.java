package com.ideas2it.mytodo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDTO {
	
	private int id;
	private String taskName;
	private boolean isDeleted;
	private boolean isCompleted;
	private TaskListDTO taskListDTO;
}
