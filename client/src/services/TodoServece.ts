import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { type ITodoItem } from "../models/ITodoItem";
import { type IResponseTodoAPI } from "../models/IResponseTodoAPI";

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Todo"],
  endpoints: (build) => ({
    fetchAllTodos: build.query<
      IResponseTodoAPI,
      { page?: number; limit?: number }
    >({
      query: (args = { page: 1, limit: 5 }) => ({
        url: `/todos`,
        params: {
          limit: args.limit,
          page: args.page,
        },
      }),
      providesTags: () => ["Todo"],
    }),
    createTodo: build.mutation<ITodoItem, ITodoItem>({
      query: (todo) => ({
        url: `/todos`,
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation<ITodoItem, ITodoItem>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: build.mutation<ITodoItem, ITodoItem>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: { text: todo.text, completed: todo.completed },
      }),
      invalidatesTags: ["Todo"],
    }),
    completedToggleTodo: build.mutation<ITodoItem, ITodoItem>({
      query: (todo) => ({
        url: `/todos/${todo.id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});
