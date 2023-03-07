package com.ideas2it.mytodo.dto;

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
}
