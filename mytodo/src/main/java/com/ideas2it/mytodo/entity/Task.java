package com.ideas2it.mytodo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String taskName;
	private boolean isDeleted;
	private boolean isCompleted;
	@ManyToOne(optional = false)
	@JoinColumn(name = "task_list_id")
	private TaskList taskList;
}
