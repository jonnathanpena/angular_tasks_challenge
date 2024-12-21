import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IKanbanColumn } from '../../interfaces/kanban-column';
import { ITask } from '../../interfaces/task';
import { MatCardModule } from '@angular/material/card';
import { TasksService } from '../../services/tasks.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpsertDialogComponent } from '../../modules/upsert-dialog/upsert-dialog.component';
import { FormActionsEnum } from '../../interfaces/form-actions-enum';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    DragDropModule,
    MatCardModule,
    AsyncPipe,
  ],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  columns$: Observable<IKanbanColumn[]>;
  readonly dialog = inject(MatDialog);

  constructor(
    private tasksService: TasksService,

  ) {
    this.columns$ = this.tasksService.kanbanState();
  }

  ngOnInit(): void {
    this.tasksService.get().subscribe();
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.tasksService.put({
        ...event.container.data[event.currentIndex],
        status: event.container.id,
      } as ITask).subscribe((response) => null);
    }
  }

  onDelete(task: ITask) {
    this.tasksService.delete(task).subscribe((response) => null);
  }

  onUpdate(task: ITask) {
    const dialogRef = this.dialog.open(UpsertDialogComponent);
    const dialogInstance = dialogRef.componentInstance as UpsertDialogComponent;
    dialogInstance.action = FormActionsEnum.UPDATE;
    dialogInstance.task = task;

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
