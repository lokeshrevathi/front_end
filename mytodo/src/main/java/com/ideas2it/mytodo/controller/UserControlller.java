package com.ideas2it.mytodo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.mytodo.dto.UserDTO;
import com.ideas2it.mytodo.service.UserService;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/v1/user")
public class UserControlller {
	
	private UserService userService;
	
	@Autowired
	public UserControlller(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/")
	public ResponseEntity<UserDTO> add(@RequestBody UserDTO userDTO) {
		UserDTO user = userService.add(userDTO);
		if (null != user) {
			return new ResponseEntity<UserDTO>(user, HttpStatus.OK);
		}
		return new ResponseEntity<UserDTO>(user, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/")
	public List<UserDTO> getUsers() {
		return userService.getUsers();
	}
	
	@GetMapping("/signed-in-user")
	public ResponseEntity<UserDTO> getSignedInUser() {
		UserDTO userDTO = userService.getSignedInUser();
		if (null != userDTO) {
			return new ResponseEntity<UserDTO>(userDTO,HttpStatus.OK);
		}
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/{mailId}/{password}")
	public ResponseEntity<UserDTO> toSignInUserById(@PathVariable("mailId") String mailId, @PathVariable("password") String password) {
		UserDTO userDTO = userService.toSignInUser(mailId, password);
		if (null != userDTO) {
			return new ResponseEntity<UserDTO>(userDTO,HttpStatus.OK);
		}
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.BAD_REQUEST);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<UserDTO> toSignOutUserById(@PathVariable("id") int id) {
		UserDTO userDTO = userService.toSignOutUser(id);
		if (null != userDTO) {
			return new ResponseEntity<UserDTO>(userDTO,HttpStatus.OK);
		}
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.BAD_REQUEST);
	}
}
