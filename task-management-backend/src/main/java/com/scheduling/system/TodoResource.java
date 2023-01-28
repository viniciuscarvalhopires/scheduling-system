package com.scheduling.system;

import com.scheduling.system.model.Task;
import com.scheduling.system.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
@AllArgsConstructor
public class TodoResource {


  private final TodoService todoService;

  @GetMapping("/all")
  public ResponseEntity<List<Task>> getAllTasks(){
    List<Task> allTasks = todoService.findAllTodo();
    return new ResponseEntity<>(allTasks, HttpStatus.OK);
  }

  @GetMapping("/find/{id}")
  public ResponseEntity<Task> getTodoById(@PathVariable("id") Long id){
    Task idTodo = todoService.findById(id);

    return new ResponseEntity<>(idTodo, HttpStatus.OK);
  }


  @PostMapping("/add")
  public ResponseEntity<Task> addTodo(@RequestBody Task task){
    Task newTodo = todoService.addTodo(task);

    return new ResponseEntity<>(newTodo, HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<Task> updateTodo(@RequestBody Task task){
    Task updateTodo = todoService.updateTodo(task);

    return new ResponseEntity<>(updateTodo, HttpStatus.OK);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteTodo(@PathVariable("id") Long id) {
    todoService.deleteTodo(id);

    return new ResponseEntity<>(HttpStatus.OK);
  }

}
