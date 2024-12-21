import { Component, Input } from '@angular/core';
import { BaseDialogComponent } from "../../components/base-dialog/base-dialog.component";
import { UpsertTaskFormComponent } from "../../forms/upsert-task-form/upsert-task-form.component";
import { FormActionsEnum } from '../../interfaces/form-actions-enum';
import { ITask } from '../../interfaces/task';

@Component({
  selector: 'app-upsert-dialog',
  standalone: true,
  imports: [
    BaseDialogComponent,
    UpsertTaskFormComponent,
  ],
  templateUrl: './upsert-dialog.component.html',
  styleUrl: './upsert-dialog.component.scss'
})
export class UpsertDialogComponent {
  @Input() action: FormActionsEnum = FormActionsEnum.CREATE;
  @Input() task!: ITask;
}
