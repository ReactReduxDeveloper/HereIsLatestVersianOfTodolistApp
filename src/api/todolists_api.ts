import axios from "axios";

// types
export type TodoListsType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export enum TaskStatues {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatues
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatues
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type LoginParamsType = {
    email:string
    password:string
    rememberMe:boolean
    captcha?:string
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "a0f1c3b0-e46a-48e0-926c-6dc468479101"
    }
})

export const todolistsApi = {

    getTodoLists() {
        return instance.get<TodoListsType[]>("todo-lists")

    },

    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListsType }>>("todo-lists", {title: title})

    },

    deleteTodoList(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)

    },

    updateTodoListTitle(id: string, title: string) {
        return instance.put<ResponseType<{ item: TodoListsType }>>(`todo-lists/${id}`, {title: title})

    },


    getTasks(id: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
    },

    deleteTasks(id: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}/tasks/${taskId}`)
    },
    createTasks(id: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${id}/tasks`, {title: title})
    },
    updateTasks(id: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${id}/tasks/${taskID}`, model)
    }

}

export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<ResponseType<{userId?: number}>>("auth/login", data)
    },
    logout() {
        return instance.delete<ResponseType<{userId?: number}>>("auth/login")
    },
    me() {
        const promise = instance.get<ResponseType<{id: number; email:string, login: string}>>("auth/login")
    }
}