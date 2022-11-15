import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {AppRootState, useTypedDispatch} from "../../../app/store";
import {addTaskTC, fetchTasksTC} from "./tasks-reducer";
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  removeTodoListsTC,
  TodoListsDomainType,
} from "./todolists-reducer";
import {Task} from "./Task/Task";
import {TaskStatues, TaskType} from "../../../api/todolists_api";

type PropsType = {
  todolist: TodoListsDomainType;
  demo?: boolean;
};

export const Todolist = memo(function ({ demo = false, ...props }: PropsType) {
  const dispatch = useTypedDispatch();
  const tasks = useSelector<AppRootState, TaskType[]>(
    (state) => state.tasks[props.todolist.id]
  );

  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(fetchTasksTC(props.todolist.id));
  }, []);

  const allFilterHandler = useCallback(() => {
    const action = changeTodolistFilterAC(props.todolist.id, "all");
    dispatch(action);
  }, [dispatch, props.todolist.id]);

  const activeFilterHandler = useCallback(() => {
    const action = changeTodolistFilterAC(props.todolist.id, "active");
    dispatch(action);
  }, [dispatch, props.todolist.id]);

  const completedFilterHandler = useCallback(() => {
    const action = changeTodolistFilterAC(props.todolist.id, "completed");
    dispatch(action);
  }, [dispatch, props.todolist.id]);

  const removeTodoListHandler = useCallback(() => {
    const action = removeTodoListsTC(props.todolist.id);
    dispatch(action);
  }, [dispatch, props.todolist.id]);

  const changeTodoListTitle = useCallback(
    (title: string) => {
      const action = changeTodolistTitleTC(props.todolist.id, title);
      dispatch(action);
    },
    [props.todolist.id, dispatch]
  );

  const addTask = useCallback(
    (title: string) => {
      const action = addTaskTC(props.todolist.id, title);
      dispatch(action);
    },
    [props.todolist.id, dispatch]
  );

  let tasksForTodoList = tasks;

  if (props.todolist.filter === "active") {
    tasksForTodoList = tasks.filter((task) => task.status === TaskStatues.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodoList = tasks.filter(
      (task) => task.status === TaskStatues.Completed
    );
  }

  return (
    <div>
      <EditableSpan
        titleValue={props.todolist.title}
        onChange={changeTodoListTitle}
      />
      <IconButton
        onClick={removeTodoListHandler}
        disabled={props.todolist.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>

      <AddItemForm addItem={addTask} />

      <ul>
        {tasksForTodoList.map((task) => (
          <Task task={task} todoListId={props.todolist.id} key={task.id} />
        ))}
      </ul>
      <div>
        <Button
          color="inherit"
          onClick={allFilterHandler}
          variant={props.todolist.filter === "all" ? "outlined" : "text"}
        >
          All
        </Button>
        <Button
          color="primary"
          onClick={activeFilterHandler}
          className={props.todolist.filter === "active" ? "outlined" : "text"}
        >
          Active
        </Button>
        <Button
          color="secondary"
          onClick={completedFilterHandler}
          className={
            props.todolist.filter === "completed" ? "outlined" : "text"
          }
        >
          Completed
        </Button>
      </div>
    </div>
  );
});

export default Todolist;
