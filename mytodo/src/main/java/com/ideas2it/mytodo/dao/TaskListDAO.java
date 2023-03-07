package com.ideas2it.mytodo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ideas2it.mytodo.entity.TaskList;

public interface TaskListDAO extends JpaRepository<TaskList, Integer> {

	@Query(value = "select * from task_list where is_active = true", nativeQuery = true)
	TaskList findActiveTaskList();
}
