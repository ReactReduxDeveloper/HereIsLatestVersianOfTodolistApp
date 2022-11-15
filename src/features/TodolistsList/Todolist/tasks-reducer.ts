import {AddTodolistType, RemoveTodolistType, SetTodoListsActionType,} from "./todolists-reducer";
import {TasksStateType} from "../../../app/App";
import {TaskPriorities, TaskStatues, TaskType, todolistsApi, UpdateTaskModelType,} from "../../../api/todolists_api";
import {ThunkDispatch} from "redux-thunk";
import {AppRootState} from "../../../app/store";
import {setAppStatusAC, SetErrorActionType, SetStatusActionType,} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError,} from "../../../utils/error-utils";

export type TaskActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistType
  | RemoveTodolistType
  | SetTodoListsActionType
  | ReturnType<typeof setTasksAC>;

export type DomainChangeTaskType = {
  title?: string;
  description?: string;
  status?: TaskStatues;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TaskActionType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(
          (t) => t.id !== action.taskID
        ),
      };

    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };

    case "UPDATE-TASK":
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map((t) =>
          t.id === action.taskID ? { ...t, ...action.model } : t
        ),
      };

    case "ADD-TODOLIST":
      return { ...state, [action.todolist.id]: [] };

    case "REMOVE-TODOLIST":
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;

    case "SET-TODOLISTS": {
      const stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }

    case "SET-TASKS":
      return { ...state, [action.todolistID]: action.tasks };

    default:
      return state;
  }
};

// AC
export const removeTaskAC = (todolistID: string, taskID: string) =>
  ({ type: "REMOVE-TASK", taskID, todolistID } as const);
export const addTaskAC = (task: TaskType) =>
  ({ type: "ADD-TASK", task } as const);
export const updateTaskAC = (
  todolistID: string,
  taskID: string,
  model: UpdateTaskModelType
) =>
  ({
    type: "UPDATE-TASK",
    todolistID,
    model,
    taskID,
  } as const);
export const setTasksAC = (tasks: TaskType[], todolistID: string) =>
  ({ type: "SET-TASKS", tasks, todolistID } as const);

// TC
export const fetchTasksTC =
  (todolistID: string) =>
  (
    dispatch: ThunkDispatch<
      AppRootState,
      any,
      TaskActionType | SetStatusActionType | SetErrorActionType
    >
  ) => {
    dispatch(setAppStatusAC("loading"));
    todolistsApi.getTasks(todolistID).then((res) => {
      dispatch(setTasksAC(res.data.items, todolistID));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
export const deleteTaskTC =
  (todolistID: string, taskID: string) =>
  (dispatch: ThunkDispatch<AppRootState, any, TaskActionType>) => {
    todolistsApi.deleteTasks(todolistID, taskID).then((res) => {
      dispatch(removeTaskAC(todolistID, taskID));
    });
  };
export const addTaskTC =
  (todolistID: string, title: string) =>
  (
    dispatch: ThunkDispatch<
      AppRootState,
      any,
      TaskActionType | SetErrorActionType | SetStatusActionType
    >
  ) => {
    dispatch(setAppStatusAC("loading"));
    todolistsApi
      .createTasks(todolistID, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item;
          const action = addTaskAC(task);
          dispatch(action);
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const updateTaskTC =
  (todolistID: string, taskID: string, domainModel: DomainChangeTaskType) =>
  (
    dispatch: ThunkDispatch<
      AppRootState,
      any,
      TaskActionType | SetErrorActionType | SetStatusActionType
    >,
    getState: () => AppRootState
  ) => {
    const state = getState();
    const task = state.tasks[todolistID].find((t) => t.id === taskID);
    if (!task) {
      throw new Error("task not Found");
    }
    const model: UpdateTaskModelType = {
      deadline: task.deadline,
      title: task.title,
      priority: task.priority,
      status: task.status,
      startDate: task.startDate,
      description: task.description,
      ...domainModel,
    };
    todolistsApi
      .updateTasks(todolistID, taskID, model)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(todolistID, taskID, model));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
