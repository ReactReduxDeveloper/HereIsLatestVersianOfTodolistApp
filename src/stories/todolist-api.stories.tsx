import React, { ChangeEvent, useEffect, useState } from "react";
import {
  TaskPriorities,
  TaskStatues,
  todolistsApi,
} from "../api/todolists_api";

export default {
  title: "API",
};

export const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "a0f1c3b0-e46a-48e0-926c-6dc468479101",
  },
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsApi.getTodoLists().then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState("");

  const createtodoList = () => {
    todolistsApi.createTodoList(title).then((res) => {
      setState(res.data);
    });
  };
  const titleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return (
    <div>
      {JSON.stringify(state)}
      <input
        value={title}
        placeholder={"Type Title of Todolist"}
        onChange={titleOnChange}
      />
      <div>
        <button onClick={createtodoList}>Create TodoList</button>
      </div>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");

  const deletTodoList = () => {
    todolistsApi.deleteTodoList(todolistId).then((res) => {
      setState(res.data);
    });
  };
  const todolistOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };
  return (
    <div>
      {JSON.stringify(state)}
      <input
        value={todolistId}
        placeholder={"Type TodolistID"}
        onChange={todolistOnChange}
      />
      <div>
        <button onClick={deletTodoList}>Delete TodoList</button>
      </div>
    </div>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [title, setTitle] = useState("");
  const updatetodolistTitle = () => {
    todolistsApi.updateTodoListTitle(title, todolistId).then((res) => {
      setState(res.data);
    });
  };
  const todolistOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };
  const titleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        value={todolistId}
        placeholder={"Type TodolistID"}
        onChange={todolistOnChange}
      />
      <input
        value={title}
        placeholder={"Type newTitle"}
        onChange={titleOnChange}
      />
      <div>
        <button onClick={updatetodolistTitle}>Update TodoList</button>
      </div>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const getTasks = () => {
    todolistsApi.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  };
  const todolistOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };
  return (
    <div>
      {JSON.stringify(state)}
      <input
        value={todolistId}
        placeholder={"type TodoListId"}
        onChange={todolistOnChange}
      />
      <div>
        <button onClick={getTasks}>Get Tasks of Todolist</button>
      </div>
    </div>
  );
};
export const DeletTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [taskId, setTaskId] = useState("");

  const deleteTask = () => {
    todolistsApi.deleteTasks(todolistId, taskId).then((res) => {
      setState(res.data);
    });
    setTodolistId("");
    setTaskId("");
  };
  const todoListOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };
  const taskOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value);
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          value={todolistId}
          placeholder={"text TodolistID"}
          onChange={todoListOnChange}
        />
        <input
          value={taskId}
          placeholder={"text TaskID"}
          onChange={taskOnChange}
        />
        <button onClick={deleteTask}>Delete Task</button>
      </div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [title, setTitle] = useState("");

  const createTask = () => {
    todolistsApi.createTasks(todolistId, title).then((res) => {
      setState(res.data);
    });
    setTodolistId("");
    setTitle("");
  };
  const todoListOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };
  const titleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          value={todolistId}
          placeholder={"text TodolistID"}
          onChange={todoListOnChange}
        />
        <input
          value={title}
          placeholder={"text Title"}
          onChange={titleOnChange}
        />
        <button onClick={createTask}>Create Task</button>
      </div>
    </div>
  );
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [taskID, setTaskID] = useState("");
  const [title, setTitle] = useState("");

  const updateTask = () => {
    todolistsApi
      .updateTasks(todolistId, taskID, {
        title: title,
        description: "",
        status: TaskStatues.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
      })
      .then((res) => {
        setState(res.data);
      });
    setTodolistId("");
    setTitle("");
  };
  const todoListOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value);
  };
  const taskOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskID(e.currentTarget.value);
  };
  const titleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          value={todolistId}
          placeholder={"text TodolistID"}
          onChange={todoListOnChange}
        />
        <input
          value={taskID}
          placeholder={"text TaskID"}
          onChange={taskOnChange}
        />
        <input
          value={title}
          placeholder={"text Title"}
          onChange={titleOnChange}
        />
        <button onClick={updateTask}>Update Task</button>
      </div>
    </div>
  );
};
