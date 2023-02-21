package com.i2i.todoproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.i2i.todoproject.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

	@Query(value = "select * from task where is_completed = true and is_deleted = false and user_id = :id", nativeQuery = true)
	List<Task> getCompletedTaskByUserId(int id);
	
	@Query(value = "select * from task where is_completed = false and is_deleted = false", nativeQuery = true)
	List<Task> getTasks();

	List<Task> findByTaskNameContains(String name);
	
	@Query(value = "select * from task where is_completed = false and is_deleted = false and user_id = :id", nativeQuery = true)
	List<Task> findByUserId(int id);
}