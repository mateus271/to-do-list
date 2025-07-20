import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoList } from '../../shared/interfaces/todo-list.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input()
  public todoListsArray: TodoList[] = [];

  @Output()
  public todoListSelected: EventEmitter<number> = new EventEmitter<number>();

  public selectTodoList(todoListId: number): void {
    this.todoListSelected.emit(todoListId);
  }
}
