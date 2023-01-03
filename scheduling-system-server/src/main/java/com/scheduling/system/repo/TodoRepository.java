package com.scheduling.system.repo;

import com.scheduling.system.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TodoRepository extends JpaRepository<Task, Long> {

  Optional<Task> findById(Long aLong);
}
