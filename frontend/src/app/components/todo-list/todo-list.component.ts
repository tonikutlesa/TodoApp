import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { AppServiceService } from 'src/app/app-service.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})


export class TodoListComponent implements OnInit {

  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;

  constructor(private service : AppServiceService, private http : HttpClient) { }

  ngOnInit(): void {
    this.beforeEditCache = '';
    this.idForTodo = 5;
    this.todoTitle = '';
  
  
    this.service.getData().subscribe((response) => {
      this.todos = response;
      console.log(this.todos);
     }, (error) => {
       console.log('Error is ', error);
     })
 

  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.service.createTodo({
      id: this.idForTodo,
      title: this.todoTitle,
      editing: false,
    }).subscribe(response => {
      console.log(response);
    })

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      editing: false,
    })

    this.todoTitle = '';
    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    this.service.updateTodo(todo.id, todo.title).subscribe(response => {
      console.log(response);
    })

    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }


  deleteTodo(id: number): void {
    this.service.deleteTodo(id).subscribe(response => {
      console.log(response)
    });
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

}

