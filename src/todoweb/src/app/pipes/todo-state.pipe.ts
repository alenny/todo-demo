import { Pipe, PipeTransform } from '@angular/core';
import { TodoState } from '../models/todo-state';

@Pipe({
  name: 'todoState'
})
export class TodoStatePipe implements PipeTransform {

  transform(value: TodoState): string {
    switch (value) {
      case TodoState.InProgress:
          return 'In progress';
      case TodoState.Completed:
          return 'Completed';
      default:
          return '';
    }
  }
}
