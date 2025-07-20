import { Injectable } from "@angular/core";
import { TodoList } from "../interfaces/todo-list.interface";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  public todoListsArray: TodoList[] = [
    {
      id: 1,
      listName: 'Pessoais',
      tasksArray: [
        { id: 1, name: 'Fazer exercícios físicos', isDone: true },
        { id: 2, name: 'Preparar o almoço', isDone: false },
        { id: 3, name: 'Responder e-mails', isDone: true }
      ]
    },
    {
      id: 2,
      listName: 'Casa',
      tasksArray: [
        { id: 1, name: 'Comprar leite', isDone: false },
        { id: 2, name: 'Lavar o carro', isDone: true }
      ]
    },
    {
      id: 3,
      listName: 'Trabalho/Estudos',
      tasksArray: [
        { id: 1, name: 'Organizar documentos', isDone: false },
        { id: 2, name: 'Agendar consulta médica', isDone: false },
        { id: 3, name: 'Assistir aula gravada', isDone: true },
        { id: 4, name: 'Estudar Angular', isDone: false }
      ]
    }
  ];

  public selectedTodoListId$: Subject<number> = new Subject<number>();

  public returnSelectedTodoListById(todoListId: number): TodoList | undefined {
    return this.todoListsArray.find(todoList => todoList.id === todoListId);
  }

  public deleteTask(todoListId: number, taskId: number): void {
    const todoListIndex = this.todoListsArray.findIndex(todoList => todoList.id === todoListId);
    const taskIndex = this.todoListsArray[todoListIndex]?.tasksArray.findIndex(task => task.id === taskId);

    if (taskIndex !== undefined) {
      this.todoListsArray[todoListIndex]?.tasksArray.splice(taskIndex, 1);
      console.log("lista de listas de tarefas", this.todoListsArray);
    }
  }
}
