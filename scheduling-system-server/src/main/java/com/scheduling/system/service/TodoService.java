package com.scheduling.system.service;

import com.scheduling.system.exception.TodoNotFoundException;
import com.scheduling.system.model.Task;
import com.scheduling.system.repo.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TodoService {
  private TodoRepository todoRepository;

  public Task addTodo(Task task){
    return todoRepository.save(task);
  }

  public List<Task> findAllTodo() {
    return todoRepository.findAll();
  }

  public Task findById(Long id){
    return todoRepository
            .findById(id)
            .orElseThrow(() -> new TodoNotFoundException("Task not found by ID: " + id));
  }

  public Task updateTodo(Task task){
    return todoRepository.save(task);
  }

  public void deleteTodo(Long id){
    todoRepository.deleteById(id);
  }

}
