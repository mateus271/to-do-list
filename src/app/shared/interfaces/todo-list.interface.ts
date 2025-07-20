import { Task } from "./task.interface";

export interface TodoList {
  id: number,
  listName: string,
  tasksArray: Task[]
}
