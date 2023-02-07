package com.i2i.todoproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.i2i.todoproject.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

}