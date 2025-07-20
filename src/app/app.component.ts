import { Component, OnInit } from '@angular/core';
import { TodoList } from './shared/interfaces/todo-list.interface';
import { TodoListService } from './shared/services/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'to-do-list';

  public todoListsArray: TodoList[] = [];

  public selectedTodoList: number = 0;

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.todoListsArray = this.todoListService.todoListsArray;
  }

  public changeSelectedList(listId: number) {
    this.todoListService.selectedTodoListId$.next(listId);
  }
}
