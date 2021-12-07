import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoItemData } from 'src/app/models/edit-todo-item-data';
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
    this.getData();
  }

  isItemCompleted(item: TodoItem): boolean {
    return item.state === TodoState.Completed;
  }

  onNewClicked(): void {
    // Initial data
    const item = new TodoItem(0, '', new Date());
    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: new EditTodoItemData(true, item)
    });
    dialogRef.afterClosed().subscribe(d => {
      if (!d) return;
      this.dataService.createTodoItem(d.item).subscribe(() => this.getData());
    });
  }

  onEditClicked(item: TodoItem): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: new EditTodoItemData(false, item)
    });
    dialogRef.afterClosed().subscribe(d => {
      if (!d) return;
      this.dataService.updateTodoItem(d.item).subscribe(() => this.getData());
    });
  }

  onCompleteClicked(item: TodoItem): void {
    item.dateCompleted = new Date();
    item.state = TodoState.Completed;
    this.dataService.updateTodoItem(item).subscribe(() => this.getData());
  }

  onDeleteClicked(item: TodoItem): void {
    if (confirm('Sure to delete?')) {
      this.dataService.deleteTodoItem(item).subscribe(() => this.getData());
    }
  }

  private getData(): void {
    this.dataService.getTodoItems().subscribe(result => this.todoItems = result);
  }
}
