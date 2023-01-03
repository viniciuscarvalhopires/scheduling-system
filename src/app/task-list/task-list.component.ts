import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { Task } from '../task';
import { TodoService } from '../task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),

        animate('250ms', style({ opacity: 0.5 })),
      ]),
      transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
    ]),

    trigger('modal', [
      transition(':enter', [
        // inicia com o modal "lá em cima"
        style({ top: -999 }),

        // e finaliza com o modal no meio da tela
        animate('250ms', style({ top: '50%' })),
      ]),
      transition(':leave', [
        // para esconder o modal, basta
        // "jogar ele lá para cima da tela"
        animate('250ms', style({ top: -999 })),
      ]),
    ]),
  ],
})
export class TaskListComponent implements OnInit {

   private formType = {
    _edit: 'edit',
    _add: 'add',
    _action: '',
  };

  task?: Task;
  editTask: Task | undefined;
  public allTasks!: Task[];
  $event2!: CdkDragDrop<Task[]>;
  taskNotFound: boolean = false;

  show: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllTasks();
    this.todoService.RefreshRequired.subscribe((response) => {
      this.getAllTasks();
    });
  }

  getAllTasks(): void {
    this.todoService.getTodo().subscribe(
      (response: Task[]) => {
        this.allTasks = response;
      },
      (e: HttpErrorResponse) => {
        alert(e.message);
      }
    );
  }

  addTask(data: NgForm): void {
    this.todoService.addTodo(data.value).subscribe({
      next: (response: Task) => {
        this.getAllTasks();
      },
      error: (e: HttpErrorResponse) => {
        alert(e.message);
      },
    });
  }

  updateTask(data: NgForm) {
    this.todoService.updateTodo(data.value).subscribe({
      next: (response: Task) => {
        this.getAllTasks();
      },
      error: (e: HttpErrorResponse) => {
        alert(e.message);
      },
    });
  }

  searchTask(value: string){
    
    let results: Task[] = [];
    for(let task of this.allTasks) {
      if (task.name.toLowerCase().indexOf(value.toLowerCase()) !== -1){
        results.push(task);
      }
    }

    this.allTasks = results;
    

    if(!value){
      this.getAllTasks();
    }

  }

  deleteTask(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.getAllTasks();
      },
      error: (e: HttpErrorResponse) => {
        alert(e.message);
      },
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.moveTask(event.item.data);
    }
  }

  moveTask(task: Task) {
    task.status = !task.status;

    this.todoService.updateTodo(task).subscribe({
      error: (e: HttpErrorResponse) => {
        alert(e.message);
      },
    });
  }

  openModal(task?: Task) {
    this.task = task;
    this.show = !this.show;
  }

  onSubmit(data: NgForm): void {
    const closeButton = document.getElementById('close-button')!;
    closeButton.click();
   
    if (this.formType._action === this.formType._add) {
      this.addTask(data);
    }

    if (this.formType._action === this.formType._edit) {
      this.updateTask(data);
    }
  }

  set formTypeAction(action: string) {
    this.formType._action = action;
  }
}
