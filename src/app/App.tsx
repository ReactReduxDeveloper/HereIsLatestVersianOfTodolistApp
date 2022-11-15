import React, {useCallback, useEffect} from "react";
import "./App.css";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/todolists_api";
import TodoListLists from "../features/TodolistsList/Todolist/TodoListLists";
import CustomizedSnackbars from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootState, useTypedDispatch} from "./store";
import {initializedTC, RequestStatusType} from "./app-reducer";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/login-reduce";

export type FilterType = "all" | "active" | "completed";

export type TasksStateType = {
  [key: string]: TaskType[];
};

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const status = useSelector<AppRootState, RequestStatusType>(
    (state) => state.app.status
  );
  const initialized = useSelector<AppRootState, boolean>(
    (state) => state.app.initialized
  );
  const isLoggedIn = useSelector<AppRootState, boolean>(
    (state) => state.login.isLoggedIn
  );

  const navigate = useNavigate();

  const dispacth = useTypedDispatch();

  useEffect(() => {
    dispacth(initializedTC());
  }, []);

  useEffect(() => {
    initialized && !isLoggedIn && navigate("/login");
  }, [isLoggedIn, initialized]);

  const logOutHandler = useCallback(() => {
    dispacth(logoutTC());
  }, []);

  if (!initialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <CustomizedSnackbars />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolist</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logOutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/"} element={<TodoListLists demo={demo} />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
