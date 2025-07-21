import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TodoListService } from '../../shared/services/todo-list.service';
import { Subscription } from 'rxjs';
import { TodoList } from '../../shared/interfaces/todo-list.interface';
import { CreateItemModalComponent } from '../create-item-modal/create-item-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../shared/interfaces/task.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy {
  public todoListSelected: TodoList | undefined;
  public showErrorMessage: boolean = false;
  public doneTasksCount: number = 0;

  private selectedTodoListIdSubscription: Subscription = new Subscription();

  constructor(private todoListService: TodoListService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedTodoListIdSubscription = this.todoListService.selectedTodoListId$.subscribe((todoListId) => {
      const selected = this.todoListService.returnSelectedTodoListById(todoListId);

      if (selected) {
        selected.tasksArray = this.sortTasksArray(selected.tasksArray);
        this.todoListSelected = selected;
        this.doneTasksCount = this.getDoneTasksCount();
      } else {
        this.todoListSelected = undefined;
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

    this.todoListSelected.tasksArray = this.sortTasksArray(this.todoListSelected.tasksArray);
    this.doneTasksCount = this.getDoneTasksCount();
  }

  public addNewTask(): void {
    this.dialog.open(CreateItemModalComponent, {
      data: { isList: false, listId: this.todoListSelected?.id },
      width: '500px',
      height: '500px'
    });
  }

  public deleteList(): void {
    if (this.todoListSelected) {
      this.todoListService.deleteList(this.todoListSelected?.id);
    }

    this.todoListSelected = undefined;
    this.todoListService.selectedTodoListId$.next(-1);
  }

  private sortTasksArray(tasksArray: Task[]): Task[] {
    return tasksArray.sort((a, b) => Number(a.isDone) - Number(b.isDone)) || [];
  }

  private getDoneTasksCount(): number {
    return this.todoListSelected?.tasksArray.filter(task => task.isDone).length || 0;
  }
}
