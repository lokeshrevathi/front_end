package com.ideas2it.mytodo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskListDTO {

	private int id;
	private String name;
	private boolean isStaticList;
	private boolean isActive;
	private boolean isDeleted;
	private UserDTO user;
}
