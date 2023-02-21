package com.i2i.todoproject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i2i.todoproject.dto.UserDTO;
import com.i2i.todoproject.service.UserService;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/v1/user")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/")
	public UserDTO addUser(@RequestBody UserDTO userDTO) {
		return userService.addUser(userDTO);
	}
	
	@GetMapping("/mail-id/{mailId}/password/{password}")
	public ResponseEntity<UserDTO> isValidAccount(@PathVariable("mailId") String mailId, @PathVariable("password") String password) {
		UserDTO userDTO = userService.isValidAccount(mailId, password);
		if (null == userDTO) {
			return new ResponseEntity<UserDTO>(userDTO, HttpStatus.NOT_ACCEPTABLE);
		}
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<UserDTO> getSignedInUser() {		
		UserDTO userDTO = userService.getSignedInUser();
		if (null == userDTO) {
			return new ResponseEntity<UserDTO>(userDTO, HttpStatus.NOT_ACCEPTABLE);
		}
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
	}
	
	@PatchMapping("/{id}")
	public void toSignOutUser(@PathVariable(value = "id") int id) {
		userService.toSignOutUser(id);
	}
}
