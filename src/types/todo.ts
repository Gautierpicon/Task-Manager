export type TodoStatus = 'todo' | 'inProgress' | 'done' | 'frozen';

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: Date;
  previousStatus: TodoStatus;
}