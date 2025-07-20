import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TodoListService } from '../../shared/services/todo-list.service';
import { Subscription } from 'rxjs';
import { TodoList } from '../../shared/interfaces/todo-list.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy {
  public todoListSelected: TodoList | undefined;
  public showErrorMessage: boolean = false;

  private selectedTodoListIdSubscription: Subscription = new Subscription();

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.selectedTodoListIdSubscription = this.todoListService.selectedTodoListId$.subscribe((todoListId) => {
      this.todoListSelected = this.todoListService.returnSelectedTodoListById(todoListId);

      if (!this.todoListSelected) {
        this.showErrorMessage = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedTodoListIdSubscription.unsubscribe();
  }

  public deleteTask(taskId: number): void {
    if (this.todoListSelected) {
      this.todoListService.deleteTask(this.todoListSelected?.id, taskId);
    }
  }

  public toggleTaskCompletion(taskId: number): void {
    if (!this.todoListSelected) return;

    const taskIndex = this.todoListSelected.tasksArray.findIndex(task => task.id === taskId);

    if (taskIndex >= 0) {
      const task = this.todoListSelected.tasksArray[taskIndex];
      task.isDone = !task.isDone;
    }
  }
}
