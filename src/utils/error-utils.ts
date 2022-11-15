import {
  setAppErrorAC,
  SetErrorActionType,
  setAppStatusAC,
  SetStatusActionType,
} from "../app/app-reducer";
import { ResponseType } from "../api/todolists_api";
import { ThunkDispatch } from "redux-thunk";
import { AppRootState } from "../app/store";
import { TaskActionType } from "../features/TodolistsList/Todolist/tasks-reducer";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: ThunkDispatch<
    AppRootState,
    any,
    TaskActionType | SetErrorActionType | SetStatusActionType
  >
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("Some error occurred"));
  }
  dispatch(setAppStatusAC("failed"));
};
export const handleServerNetworkError = (
  error: any,
  dispatch: ThunkDispatch<
    AppRootState,
    any,
    TaskActionType | SetErrorActionType | SetStatusActionType
  >
) => {
  dispatch(
    setAppErrorAC(error.message ? error.message : "Some error occurred")
  );
  dispatch(setAppStatusAC("failed"));
};
