import { type ITodoItem } from "./ITodoItem";

export interface IResponseTodoAPI {
  data: ITodoItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
