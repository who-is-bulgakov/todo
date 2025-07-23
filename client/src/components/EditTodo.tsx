import { useState } from "react";

import { type FC } from "react";

import type { ITodoItem } from "../models/ITodoItem";

import { Button, Stack, TextField } from "@mui/material";
import { todoAPI } from "../services/TodoServece";

interface PropsEditTodo {
  todo: ITodoItem;
  setIsEditText: (bool: boolean) => void;
}

const EditTodo: FC<PropsEditTodo> = ({ todo, setIsEditText }) => {
  console.log("EditTodo");

  const [newText, setNewText] = useState<string>(todo.text);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewText(event.target.value);
  };

  const [updateTodo, {}] = todoAPI.useUpdateTodoMutation();

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        id="outlined-basic"
        label="Задача"
        variant="outlined"
        value={newText}
        onChange={handleInputChange}
      />
      <Button
        onClick={() => {
          setIsEditText(false);
          console.log("edit!");
          updateTodo({ ...todo, text: newText });
        }}
        variant="contained"
        color="success"
        size="medium"
      >
        Изменить
      </Button>
    </Stack>
  );
};

export default EditTodo;
