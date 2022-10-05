import {FilterType} from "../../../app/App";
import {todolistsApi, TodoListsType} from "../../../api/todolists_api";
import {ThunkDispatch} from "redux-thunk";
import {AppRootState} from "../../../app/store";
import {RequestStatusType, SetErrorActionType, setAppStatusAC, SetStatusActionType} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>;

export type TodoListActionType =
    RemoveTodolistType
    | AddTodolistType
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodoListsActionType
    | ReturnType<typeof setTodoListsEntityStatusAC>

export type TodoListsDomainType = TodoListsType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

const initialState: TodoListsDomainType[] = []

export const todoListsReducer = (state: TodoListsDomainType[] = initialState, action: TodoListActionType): Array<TodoListsDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]

        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

// AC
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId}) as const
export const addTodolistAC = (todolist: TodoListsType) => ({type: 'ADD-TODOLIST', todolist}) as const
export const changeTitleTodolistAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
}) as const
export const setTodoListsAC = (todolists: TodoListsType[]) => ({
    type: 'SET-TODOLISTS',
    todolists: todolists
}) as const
export const setTodoListsEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
}) as const

// TC
export const fetchTodoListsTC = () => (dispatch: ThunkDispatch<AppRootState, any, TodoListActionType | SetStatusActionType | SetErrorActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(error => {
            handleServerNetworkError(error,dispatch)
        })
}
export const removeTodoListsTC = (todolistID: string) => (dispatch: ThunkDispatch<AppRootState, any, TodoListActionType | SetStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodoListsEntityStatusAC(todolistID, 'loading'))
    todolistsApi.deleteTodoList(todolistID)
        .then((res) => {
            dispatch(removeTodolistAC(todolistID))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodoListsTC = (title: string) => (dispatch: ThunkDispatch<AppRootState, any, TodoListActionType | SetStatusActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi.createTodoList(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC("succeeded"))
        })
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: ThunkDispatch<AppRootState, any, TodoListActionType>) => {
    todolistsApi.updateTodoListTitle(todolistID, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC(todolistID, title))
        })
}

