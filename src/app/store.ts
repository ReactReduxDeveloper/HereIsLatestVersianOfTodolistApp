import {applyMiddleware, combineReducers, createStore} from "redux"
import {TodoListActionType, todoListsReducer} from "../features/TodolistsList/Todolist/todolists-reducer";
import {TaskActionType, tasksReducer} from "../features/TodolistsList/Todolist/tasks-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/login-reduce";

type AppActionType = TodoListActionType | TaskActionType
export type TypedDispatch = ThunkDispatch<AppRootState, any, AppActionType>
export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer,
    app:appReducer,
    login:authReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export const useTypedDispatch = () => useDispatch<TypedDispatch>()

//@ts-ignore
window.store = store