import { Component } from '@angular/core';
import { KanbanComponent } from '../../components/kanban/kanban.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    KanbanComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

}
