import { Component, OnInit } from '@angular/core';
import { TodoList } from './shared/interfaces/todo-list.interface';
import { TodoListService } from './shared/services/todo-list.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemModalComponent } from './components/create-item-modal/create-item-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public todoListsArray: TodoList[] = [];
  public selectedTodoList: number = 0;

  constructor(private todoListService: TodoListService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todoListsArray = this.todoListService.todoListsArray;
  }

  public changeSelectedList(listId: number) {
    this.todoListService.selectedTodoListId$.next(listId);
  }

  public addNewList(): void {
    const dialogRef = this.dialog.open(CreateItemModalComponent, {
      data: { isList: true },
      width: '500px',
      height: '500px'
    });
  }
}
