import { useState, type FC } from "react";

import type { ITodoItem } from "../models/ITodoItem";

import EditTodo from "./EditTodo";

import { ListItem, ButtonGroup, Button, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { todoAPI } from "../services/TodoServece";

interface PropsTodoItem {
  todo: ITodoItem;
  checkedTheme: boolean;
}

const TodoItem: FC<PropsTodoItem> = ({ todo, checkedTheme }) => {
  console.log("TodoItem");

  const [isEditText, setIsEditText] = useState<boolean>(false);
  const theme = useTheme();

  const [deleteTodo, {}] = todoAPI.useDeleteTodoMutation();
  const [completedToggleTodo, {}] = todoAPI.useCompletedToggleTodoMutation();

  return (
    <ListItem
      sx={{
        color: `${
          checkedTheme ? theme.palette.common.white : theme.palette.common.black
        }`,
        bgcolor: `${
          checkedTheme ? theme.palette.common.black : theme.palette.common.white
        }`,
        border: 1,
        borderRadius: 3,
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      {isEditText ? (
        <EditTodo todo={todo} setIsEditText={setIsEditText} />
      ) : (
        <Typography
          variant="h4"
          component="h4"
          align="left"
          p={2}
          sx={{
            width: "50%",
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.text}
        </Typography>
      )}

      <Typography component="p" align="left" p={2}>
        <b>Дата создания:</b> {todo.createdAt}
      </Typography>

      {!isEditText ? (
        <ButtonGroup
          variant="contained"
          orientation="vertical"
          fullWidth
          aria-label="Basic button group"
        >
          <Button
            color="success"
            onClick={() => {
              console.log("toggle");
              completedToggleTodo(todo);
            }}
          >
            {todo.completed ? "Вернуть в список" : "Выполнить"}
          </Button>
          <Button
            color="info"
            onClick={() => {
              setIsEditText(!isEditText);
            }}
          >
            Редактировать
          </Button>
          <Button
            color="error"
            onClick={() => {
              deleteTodo(todo);
            }}
          >
            Удалить
          </Button>
        </ButtonGroup>
      ) : null}
    </ListItem>
  );
};

export default TodoItem;
