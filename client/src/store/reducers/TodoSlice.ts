import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITodoItem } from "../../models/ITodoItem";

interface TodoState {
  todos: ITodoItem[];
  isLoading: boolean;
  error: string;
}
const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<ITodoItem[]>) {
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
