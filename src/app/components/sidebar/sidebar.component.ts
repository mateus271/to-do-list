import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoList } from '../../shared/interfaces/todo-list.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public currentlySelectedList: number = 0;

  @Input()
  public todoListsArray: TodoList[] = [];

  @Output()
  public todoListSelected: EventEmitter<number> = new EventEmitter<number>();

  public selectTodoList(todoListId: number): void {
    if (this.currentlySelectedList === todoListId) {
      this.todoListSelected.emit(0);
      this.currentlySelectedList = 0;
    } else {
      this.todoListSelected.emit(todoListId);
      this.currentlySelectedList = todoListId;
    }
  }
}
