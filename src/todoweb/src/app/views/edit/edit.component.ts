import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTodoItemData } from 'src/app/models/edit-todo-item-data';
import { FormValidateService } from 'src/app/services/form-validate.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  todo: FormGroup;

  constructor(        
    private formBuilder: FormBuilder,
    private formValidateService: FormValidateService,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: EditTodoItemData
  ) {
    this.todo = this.formBuilder.group({
      description: [this.data.item.description, [Validators.required]],
      dateTarget: [this.data.item.dateTarget, []]
    });
  }

  ngOnInit(): void {
  }

  getAction(): string {
    return this.data.isNew ? 'New' : 'Edit';
  }

  onOkClicked(): void {
    if (this.todo.invalid) {
      this.formValidateService.validateAllFormFields(this.todo);
      return;
    }
    this.data.item.dateTarget = this.todo.value.dateTarget;
    this.data.item.description = this.todo.value.description;
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  onCancelClicked(): void {
    this.dialogRef.close();
  }
}
