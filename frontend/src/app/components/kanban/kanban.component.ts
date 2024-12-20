import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { KanbanColumn } from '../../interfaces/kanban-column';
import { TaskStatusEnum } from '../../interfaces/task-status-enum';
import { ITask } from '../../interfaces/task';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    DragDropModule,
    MatCardModule
  ],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {
  columns: KanbanColumn[] = [
    {
      id: 'backlog',
      title: 'Pendiente',
      tasks: [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: TaskStatusEnum.BACKLOG,
          owner: 'person@email.com',
          cratedAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Task 2',
          description: 'Description 2',
          status: TaskStatusEnum.BACKLOG,
          owner: 'person@email.com',
          cratedAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    },
    {
      id: 'inProgress',
      title: 'En progreso',
      tasks: []
    },
    {
      id: 'done',
      title: 'Completado',
      tasks: []
    }
  ];

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
