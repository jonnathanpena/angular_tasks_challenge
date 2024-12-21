import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IKanbanColumn } from '../../interfaces/kanban-column';
import { TaskStatusEnum } from '../../interfaces/task-status-enum';
import { ITask } from '../../interfaces/task';
import { MatCardModule } from '@angular/material/card';
import { TasksService } from '../../services/tasks.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
export class KanbanComponent implements OnInit {
  columns$: Observable<IKanbanColumn[]>;

  constructor(private tasksService: TasksService) {
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
    }
  }
}
