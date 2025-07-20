import { TodoListService } from './../../../shared/services/todo-list.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../shared/interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input()
  taskItem: Task | undefined;

  @Output()
  taskDeleted: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  taskCompletion: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  public deleteTask(taskId: number): void {
    this.taskDeleted.emit(taskId);
  }

  public toggleTaskCompletion(taskId: number): void {
    this.taskCompletion.emit(taskId);
  }
}
