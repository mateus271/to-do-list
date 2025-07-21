import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TodoListService } from '../../shared/services/todo-list.service';
import { Subscription } from 'rxjs';
import { TodoList } from '../../shared/interfaces/todo-list.interface';
import { CreateItemModalComponent } from '../create-item-modal/create-item-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy {
  public todoListSelected: TodoList | undefined;
  public showErrorMessage: boolean = false;

  private selectedTodoListIdSubscription: Subscription = new Subscription();

  constructor(private todoListService: TodoListService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedTodoListIdSubscription = this.todoListService.selectedTodoListId$.subscribe((todoListId) => {
      this.todoListSelected = this.todoListService.returnSelectedTodoListById(todoListId);

      if (!this.todoListSelected) {
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
  }

  public addNewTask(): void {
    const dialogRef = this.dialog.open(CreateItemModalComponent, {
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
}
