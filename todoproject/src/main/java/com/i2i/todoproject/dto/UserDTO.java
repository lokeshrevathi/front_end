package com.i2i.todoproject.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

	private int id;
	private String name;
	private String mailId;
	private String password;
	private boolean isSignedIn;
	private List<TaskDTO> tasks;
}
