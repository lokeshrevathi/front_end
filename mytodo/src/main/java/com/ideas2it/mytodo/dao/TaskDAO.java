package com.ideas2it.mytodo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideas2it.mytodo.entity.Task;

public interface TaskDAO extends JpaRepository<Task, Integer> {

}
