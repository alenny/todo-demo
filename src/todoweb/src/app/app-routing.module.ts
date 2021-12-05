import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './views/profiles/profiles.component';
import { TodosComponent } from './views/todos/todos.component';

const routes: Routes = [
  { path: '', component: ProfilesComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'todos', component: TodosComponent },
  { path: '**', redirectTo: '' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
