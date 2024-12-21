import { Component, Input, OnInit } from '@angular/core';
import { BaseButtonComponent } from '../../components/base-button/base-button.component';
import { ErrorMessagesComponent } from '../../components/error-messages/error-messages.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ValidationService } from '../../services/validation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UpsertDialogComponent } from '../../modules/upsert-dialog/upsert-dialog.component';
import { TasksService } from '../../services/tasks.service';
import { ITask } from '../../interfaces/task';

@Component({
  selector: 'app-upsert-task-form',
  standalone: true,
  imports: [
    BaseButtonComponent,
    ErrorMessagesComponent,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
  ],
  templateUrl: './upsert-task-form.component.html',
  styleUrl: './upsert-task-form.component.scss'
})
export class UpsertTaskFormComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() task: ITask | null = null;
  isFetching: boolean = false;
  upsertForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      this.validationService.stringValidate,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      this.validationService.stringValidate,
      Validators.minLength(2),
      Validators.maxLength(500),
    ]),
    status: new FormControl(null, [
      Validators.required,
    ])
  });

  constructor(
    private validationService: ValidationService,
    private dialogRef: MatDialogRef<UpsertDialogComponent>,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    if (this.task) {
      debugger;
      this.upsertForm.patchValue(this.task);
    }
  }

  upsertSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (this.upsertForm.invalid) {
      return;
    }
    this.isFetching = true;
    if (!this.isEdit) {
      this.tasksService.post(this.upsertForm.value as ITask).subscribe(() => {
        this.isFetching = false;
        this.dialogRef.close();
      });
      return;
    }
  }
}
