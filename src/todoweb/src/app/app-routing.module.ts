import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './views/todos/todos.component';

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todos', component: TodosComponent },
  { path: '**', redirectTo: '' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
