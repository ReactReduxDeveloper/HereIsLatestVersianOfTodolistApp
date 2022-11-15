import React from "react";
import {Task} from "../features/TodolistsList/Todolist/Task/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatues} from "../api/todolists_api";

export default {
  title: "Task Component",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
};

export const TaskBaseExample = (props: any) => {
  return (
    <>
      <Task
        task={{
          id: "1",
          status: TaskStatues.Completed,
          title: "Css",
          order: 0,
          description: "",
          priority: TaskPriorities.Low,
          startDate: "",
          deadline: "",
          todoListId: "toDoListID1",
          addedDate: "",
        }}
        todoListId={"toDoListID1"}
      />
      <Task
        task={{
          id: "1",
          status: TaskStatues.Completed,
          title: "Css",
          order: 0,
          description: "",
          priority: TaskPriorities.Low,
          startDate: "",
          deadline: "",
          todoListId: "toDoListID2",
          addedDate: "",
        }}
        todoListId={"toDoListID2"}
      />
    </>
  );
};
