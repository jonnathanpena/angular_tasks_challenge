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
        tap(response => this.successManager(response)),
        catchError(this.errorManager),
      )
  }

  post(task: ITask) {
    return this.http.post<ITask>(
      'https://api-p6pm5yym4a-uc.a.run.app/tasks',
      task
    )
    .pipe(
      tap((response) => this.successManager([response])),
      catchError(this.errorManager),
    );
  }

  put(task: ITask) {
    return this.http.put<ITask>(
      `https://api-p6pm5yym4a-uc.a.run.app/tasks/${task.id}`,
      task
    );
  }

  delete(task: ITask) {
    return this.http.delete<null>(
      `https://api-p6pm5yym4a-uc.a.run.app/tasks/${task.id}`
    ).pipe(
      tap(() => this.deleTask(task)),
      catchError(this.errorManager),
    );
  }

  kanbanState(): Observable<IKanbanColumn[]> {
    return this.kanbanTasksSubject.asObservable();
  }

  protected deleTask(task: ITask) {
    const currentState = this.kanbanTasksSubject.value;
    const backlog = [...currentState[0].tasks.filter((filterTask) => filterTask.id !== task.id)];
    const inProgress = [...currentState[1].tasks.filter((filterTask) => filterTask.id !== task.id)];
    const done = [...currentState[2].tasks.filter((filterTask) => filterTask.id !== task.id)];
    this.kanbanTasksSubject.next([
      {
        id: TaskStatusEnum.BACKLOG,
        title: 'Por hacer',
        tasks: backlog,
      },
      {
        id: TaskStatusEnum.IN_PROGRESS,
        title: 'En progreso',
        tasks: inProgress,
      },
      {
        id: TaskStatusEnum.DONE,
        title: 'Hecho',
        tasks: done,
      },
    ]);
  }

  protected successManager(response: ITask[]) {
    const currentState = this.kanbanTasksSubject.value;
    const backlog = [...currentState[0].tasks, ...response.filter(task => task.status === TaskStatusEnum.BACKLOG)];
    const inProgress = [...currentState[1].tasks, ...response.filter(task => task.status === TaskStatusEnum.IN_PROGRESS)];
    const done = [...currentState[2].tasks, ...response.filter(task => task.status === TaskStatusEnum.DONE)];
    this.kanbanTasksSubject.next([
      {
        id: TaskStatusEnum.BACKLOG,
        title: 'Por hacer',
        tasks: backlog,
      },
      {
        id: TaskStatusEnum.IN_PROGRESS,
        title: 'En progreso',
        tasks: inProgress,
      },
      {
        id: TaskStatusEnum.DONE,
        title: 'Hecho',
        tasks: done,
      },
    ]);
  }

  protected errorManager(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate([`/${RoutesEnum.LOGIN}`]);
    }
    return throwError(() => error.error);
  }
}
