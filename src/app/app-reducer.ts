import {ThunkDispatch} from "redux-thunk";
import {AppRootState} from "./store";
import {TodoListActionType} from "../features/TodolistsList/Todolist/todolists-reducer";
import {authAPI} from "../api/todolists_api";
import {setIsLoggedInAC} from "../features/Login/login-reduce";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    initialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

export const initializedTC = () => (dispatch: ThunkDispatch<AppRootState, any, ActionsType>) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {

        }
        dispatch(setAppInitializedAC(true))
    })
}


export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>
type ActionsType = SetErrorActionType
    | SetStatusActionType
    | ReturnType<typeof setAppInitializedAC>

