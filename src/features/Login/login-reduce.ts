import {ThunkDispatch} from "redux-thunk";
import {AppRootState} from "../../app/store";
import {TaskActionType, updateTaskAC} from "../TodolistsList/Todolist/tasks-reducer";
import {SetErrorActionType, setAppStatusAC, SetStatusActionType} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists_api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type LoginActionType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {}
let initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: any = initialState, action: LoginActionType): any => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}

//AC
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value})


//TC
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch<AppRootState, any, LoginActionType | SetStatusActionType | SetErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })}

export const logoutTC = () => (dispatch: ThunkDispatch<AppRootState, any, LoginActionType | SetStatusActionType | SetErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })}

