import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoItem } from 'src/app/models/todo-item';
import { UserProfile } from 'src/app/models/user-profile';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {

  profile: UserProfile | undefined;
  todoItems: TodoItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let uid = +params['uid'];
      this.dataService.getUserProfile(uid).subscribe(result => this.profile = result);
      this.dataService.getTodoItems(uid).subscribe(result => this.todoItems = result);
    });
  }

}
