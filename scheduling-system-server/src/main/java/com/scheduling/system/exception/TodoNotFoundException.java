package com.scheduling.system.exception;


public class TodoNotFoundException extends RuntimeException{
  public TodoNotFoundException(String message){
    super(message);
  }
}
