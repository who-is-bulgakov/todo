import { useState, type FC } from "react";

import { Button, TextField, Stack } from "@mui/material";
import { todoAPI } from "../services/TodoServece";
import type { ITodoItem } from "../models/ITodoItem";

const AddTodo: FC = () => {
  console.log("AddTodo");

  const [textTodo, setTextTodo] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const [createTodo, {}] = todoAPI.useCreateTodoMutation();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTextTodo(event.target.value);
  };

  return (
    <Stack spacing={2}>
      <TextField
        id="outlined-basic"
        label="Задача"
        variant="outlined"
        error={isValid ? true : false}
        helperText={isValid ? "Поле не может быть пустым" : ""}
        value={textTodo ? textTodo : ""}
        onChange={handleInputChange}
        sx={{
          bgcolor: "#fff",
        }}
      />

      <Button
        onClick={() => {
          if (textTodo) {
            createTodo({ text: textTodo } as ITodoItem);
            setTextTodo("");
            setIsValid(false);
          } else {
            setIsValid(true);
          }
        }}
        variant="contained"
        color="success"
        size="medium"
      >
        Добавить задачу
      </Button>
    </Stack>
  );
};

export default AddTodo;
