import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './views/todos/todos.component';
import { EditComponent } from './views/edit/edit.component';
import { TodoStatePipe } from './pipes/todo-state.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    EditComponent,
    TodoStatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  providers: [
    DatePipe,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
