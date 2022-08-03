export interface ITodoItem {
  id: number
  content: string
  createdBy: string
}

export interface ITodoListGQResponse {
  todoList: ITodoItem[]
}
