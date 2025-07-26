import { useEffect, useState, type FC } from "react";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

import {
  Typography,
  Container,
  Switch,
  FormControlLabel,
  useTheme,
} from "@mui/material";

const App: FC = () => {
  console.log("App");

  const [checkedTheme, setCheckedTheme] = useState(false);

  const checkedThemeChange = () => {
    setCheckedTheme(!checkedTheme);
  };
  const theme = useTheme();

  useEffect(() => {
    const checkedThemeLocalStorage = localStorage.getItem("theme");
    checkedThemeLocalStorage
      ? setCheckedTheme(JSON.parse(checkedThemeLocalStorage))
      : null;
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(checkedTheme));
  }, [checkedTheme]);

  return (
    <Container
      maxWidth={false}
      sx={{
        color: `${
          checkedTheme ? theme.palette.common.white : theme.palette.common.black
        }`,
        bgcolor: `${
          checkedTheme ? theme.palette.common.black : theme.palette.common.white
        }`,
      }}
    >
      <Container>
        <FormControlLabel
          control={
            <Switch checked={checkedTheme} onChange={checkedThemeChange} />
          }
          label="Тема"
        />

        <Typography variant="h2" component="h2" align="center" py={2}>
          Список задач
        </Typography>
        <AddTodo />

        <TodoList checkedTheme={checkedTheme} />
      </Container>
    </Container>
  );
};

export default App;
