import { useEffect, useState, type FC } from "react";

import TodoItem from "./TodoItem";

import { todoAPI } from "../services/TodoServece";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { todoSlice } from "../store/reducers/TodoSlice";

import {
  List,
  Typography,
  Pagination,
  ButtonGroup,
  Button,
  Box,
} from "@mui/material";

interface PropsTodoList {
  checkedTheme: boolean;
}

const TodoList: FC<PropsTodoList> = ({ checkedTheme }) => {
  console.log("TodoList");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { todos } = useAppSelector((state) => state.todoReducer);
  const { setTodos } = todoSlice.actions;

  console.log(todos);

  const { data: fetchTodos } = todoAPI.useFetchAllTodosQuery({
    page: page,
    limit: limit,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchTodos && dispatch(setTodos(fetchTodos.data));
  }, [fetchTodos]);

  const selectPage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    console.log(page);
    setPage(page);
  };

  const sortUp = () => {
    const sortTodos = [...todos].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    dispatch(setTodos(sortTodos));
    console.log(todos);
  };
  const sortDown = () => {
    const sortTodos = [...todos].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    dispatch(setTodos(sortTodos));
    console.log(todos);
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={3} p={2}>
        <Typography variant="h5" component="h5" align="left" py={2}>
          Сортировка
        </Typography>
        <ButtonGroup variant="outlined">
          <Button
            color="success"
            onClick={() => {
              console.log("sort");
              sortUp();
            }}
          >
            По дате ⬇
          </Button>
          <Button
            color="info"
            onClick={() => {
              console.log("sort");
              sortDown();
            }}
          >
            По дате ⬆
          </Button>
        </ButtonGroup>
      </Box>
      <Typography variant="h4" component="h2" align="left">
        Активные задачи:
      </Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {todos &&
          todos.map((todo) =>
            !todo.completed ? (
              <TodoItem key={todo.id} todo={todo} checkedTheme={checkedTheme} />
            ) : null
          )}
      </List>
      <Typography variant="h4" component="h2" align="left">
        Выполненые задачи:
      </Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {todos &&
          todos.map((todo) =>
            todo.completed ? (
              <TodoItem key={todo.id} todo={todo} checkedTheme={checkedTheme} />
            ) : null
          )}
      </List>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          m: 4,
        }}
      >
        Количество заметок на странице
        <ButtonGroup size="small" aria-label="Small button group">
          <Button onClick={() => setLimit(5)}>5</Button>
          <Button onClick={() => setLimit(10)}>10</Button>
          <Button onClick={() => setLimit(15)}>15</Button>
        </ButtonGroup>
        <Pagination
          count={fetchTodos?.totalPages ? fetchTodos.totalPages : 1}
          onChange={selectPage}
        />
      </Box>
    </>
  );
};

export default TodoList;
