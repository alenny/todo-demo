import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoItem } from 'src/app/models/todo-item';
import { TodoState } from 'src/app/models/todo-state';
import { DataService } from 'src/app/services/data.service';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {

  todoItems: TodoItem[] = [];

  constructor(
    private dialog: MatDialog,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getTodoItems().subscribe(result => this.todoItems = result);
  }

  isItemCompleted(item: TodoItem): boolean {
    return item.state === TodoState.Completed;
  }

  onNewClicked(): void {
    // Initial data
    const data = new TodoItem(0, '', new Date());
    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: data
    });
    dialogRef.afterClosed().subscribe(i => {
      if (!i) return;
      this.dataService.createTodoItem(i);
    });
  }

  onEditClicked(item: TodoItem): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: item
    });
    dialogRef.afterClosed().subscribe(i => {
      if (!i) return;
      this.dataService.updateTodoItem(i);
    });
  }

  onCompleteClicked(item: TodoItem): void {
    item.dateCompleted = new Date();
    item.state = TodoState.Completed;
    this.dataService.updateTodoItem(item);
  }

  onDeleteClicked(item: TodoItem): void {
    if (confirm('Sure to delete?')) {
      this.dataService.deleteTodoItem(item);
    }
  }
}
