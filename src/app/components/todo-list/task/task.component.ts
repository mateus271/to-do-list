import { Component, Input } from '@angular/core';
import { Task } from '../../../shared/interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input()
  taskItem: Task | undefined;
}
