import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RoutesEnum } from '../interfaces/routes-enum';
import { IKanbanColumn } from '../interfaces/kanban-column';
import { TaskStatusEnum } from '../interfaces/task-status-enum';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private kanbanTasksSubject = new BehaviorSubject<IKanbanColumn[]>([
    {
      id: TaskStatusEnum.BACKLOG,
      title: 'Por hacer',
      tasks: [],
    },
    {
      id: TaskStatusEnum.IN_PROGRESS,
      title: 'En progreso',
      tasks: [],
    },
    {
      id: TaskStatusEnum.DONE,
      title: 'Hecho',
      tasks: [],
    },
  ]);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get() {
    return this.http.get<ITask[]>('https://api-p6pm5yym4a-uc.a.run.app/tasks')
      .pipe(
        tap(this.successManager),
        catchError(this.errorManager),
      )
  }

  kanbanState(): Observable<IKanbanColumn[]> {
    return this.kanbanTasksSubject.asObservable();
  }

  protected successManager(response: ITask[]) {
    const currentState = this.kanbanTasksSubject.getValue();
    
    currentState[0].tasks = [...currentState[0].tasks].concat( response.filter(task => task.status === TaskStatusEnum.BACKLOG));
    currentState[0].tasks = [...currentState[1].tasks].concat( response.filter(task => task.status === TaskStatusEnum.IN_PROGRESS));
    currentState[0].tasks = [...currentState[2].tasks].concat( response.filter(task => task.status === TaskStatusEnum.DONE));

    this.kanbanTasksSubject.next(currentState);
  }

  protected errorManager(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate([`/${RoutesEnum.LOGIN}`]);
    }
    return throwError(() => error.error);
  }
}
