import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from 'src/app/models/todo-item';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  todo: FormGroup;

  constructor(        
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TodoItem
  ) {
    this.todo = this.formBuilder.group({
      description: [this.data.description, [Validators.required]],
      dateTarget: [this.data.dateTarget, []]
    });
  }

  ngOnInit(): void {
  }

  onOkClicked(): void {
    if (this.todo.invalid) {
      return;
    }
    this.data.dateTarget = this.todo.value.dateTarget;
    this.data.description = this.todo.value.description;
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  onCancelClicked(): void {
    this.dialogRef.close();
  }
}
