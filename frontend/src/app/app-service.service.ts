import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http : HttpClient) { }

  getData():Observable<any>{
    return this.http.get('/api/todos');
  }

  createTodo(data:any):Observable<any>
  {
    return this.http.post('/api/todos', data);
  }

  deleteTodo(id: number):Observable<any>{
    let ids = id;
    return this.http.delete(`/api/todos/${ids}`);
  }

  updateTodo(id: number, data:any):Observable<any>
  {
    let ids = id;
    return this.http.put(`/api/todos/${ids}`, data);
  }
}
