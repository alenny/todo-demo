import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoItem } from '../models/todo-item';
import { UserProfile } from '../models/user-profile';

// In-memory data for test
const MEM_PROFILES = [
  new UserProfile(1, 'Dzy'),
  new UserProfile(2, 'LY')
];
const MEM_TODOITEMS = [
  new TodoItem(1, 1, 'house clean', new Date('2021-12-7T16:00:00Z')),
  new TodoItem(2, 2, 'buy from grocery', new Date('2021-12-5T14:00:10Z')),
  new TodoItem(3, 1, 'watch movie', new Date('2021-12-9T20:00:00Z')),
  new TodoItem(4, 2, 'wash car', new Date('2021-12-10T22:30:10Z'))
];

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private profiles: UserProfile[] = MEM_PROFILES;
  private todoItems: TodoItem[] = MEM_TODOITEMS;

  constructor() { 

  }

  getUserProfiles(): Observable<UserProfile[]> {
    return of(this.profiles);
  }

  getTodoItems(userId: number): Observable<TodoItem[]> {
        return of(this.todoItems.filter(p => p.userId === userId));
  }
}
