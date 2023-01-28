import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  private _refreshRequired = new Subject<void>();

  get RefreshRequired() {
    return this._refreshRequired;
  }

  getTodo(): Observable<Task[]> {
    return this.http.get<Task[]>(`http://localhost:8080/task/all`);
  }

  addTodo(task: Task): Observable<Task> {
    return this.http.post<Task>(`http://localhost:8080/task/add`, task)
  }

  updateTodo(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:8080/task/update`, task)

  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/task/delete/${id}`);
  }

}
