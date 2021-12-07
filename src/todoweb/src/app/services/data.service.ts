import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoItem } from '../models/todo-item';

// In-memory data for test
let MEM_TODOITEMS = [
  new TodoItem(1, 'house clean', new Date('2021-12-07T16:00:00Z')),
  new TodoItem(2, 'buy from grocery', new Date('2021-12-05T14:00:10Z')),
  new TodoItem(3, 'watch movie', new Date('2021-12-09T20:00:00Z')),
  new TodoItem(4, 'wash car', new Date('2021-12-10T22:30:10Z'))
];

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private todoItems: TodoItem[] = MEM_TODOITEMS;

  constructor() {

  }

  getTodoItems(): Observable<TodoItem[]> {
    return of(this.todoItems);
  }

  createTodoItem(item: TodoItem): void {
    item.id = this.todoItems.length > 0 ? this.todoItems[this.todoItems.length - 1].id + 1 : 1;
    this.todoItems.push(item);
  }

  updateTodoItem(item: TodoItem): void {
  }

  deleteTodoItem(item: TodoItem): void {
    const idx = this.todoItems.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      this.todoItems.splice(idx, 1);
    }
  }
}
