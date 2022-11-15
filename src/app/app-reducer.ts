import {ThunkDispatch} from "redux-thunk";
import {AppRootState} from "./store";
import {authAPI} from "../api/todolists_api";
import {LoginActionType, setIsLoggedInAC,} from "../features/Login/login-reduce";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type ErrorType = string | null;
const initialState = {
  status: "idle" as RequestStatusType,
  error: null as ErrorType,
  initialized: false,
};

export type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "APP/SET-INITIALIZED":
      console.log(1);
      return { ...state, initialized: action.value };

    default:
      return state;
  }
};

export const setAppErrorAC = (error: ErrorType) =>
  ({ type: "APP/SET-ERROR", error } as const);
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status } as const);
export const setAppInitializedAC = (value: boolean) =>
  ({ type: "APP/SET-INITIALIZED", value } as const);

export const initializedTC =
  () =>
  (
    dispatch: ThunkDispatch<AppRootState, any, AppActionsType | LoginActionType>
  ) => {
    try {
      authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
        } else {
          dispatch(setIsLoggedInAC(false));
        }
        dispatch(setAppInitializedAC(true));
      });
    } catch {
      dispatch(setAppInitializedAC(true));
    }
  };

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
export type AppActionsType =
  | SetErrorActionType
  | SetStatusActionType
  | ReturnType<typeof setAppInitializedAC>;
