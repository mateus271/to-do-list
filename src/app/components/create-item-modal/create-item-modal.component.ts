import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoList } from '../../shared/interfaces/todo-list.interface';
import { Task } from '../../shared/interfaces/task.interface';
import { TodoListService } from '../../shared/services/todo-list.service';

@Component({
  selector: 'app-create-item-modal',
  templateUrl: './create-item-modal.component.html',
  styleUrl: './create-item-modal.component.scss'
})
export class CreateItemModalComponent {
  public newTodoList: TodoList = { listName: "" } as TodoList;
  public newTask: Task = { name: "" } as Task;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { isList: boolean, listId?: number },
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateItemModalComponent>,
    private todoListService: TodoListService
  ) {}

  public closeDialog(): void {
    this.dialog.closeAll();
  }

  public save(): void {
    if (this.data.isList) {
      this.newTodoList.id = this.todoListService.todoListsLastId + 1;
      this.todoListService.todoListsLastId += 1;
      this.newTodoList.listName;
      this.newTodoList.tasksArray = [];
      this.todoListService.addListToArray(this.newTodoList);
    } else if (!this.data.isList && this.data.listId) {
      let parentTodoList = this.todoListService.returnSelectedTodoListById(this.data.listId);
      this.newTask.id = parentTodoList?.tasksArray.length ? parentTodoList?.tasksArray.length + 1 : 1;
      this.newTask.name;
      this.newTask.isDone = false;
      this.todoListService.addTaskToList(this.data.listId, this.newTask);
    }

    this.dialogRef.close();
  }
}
