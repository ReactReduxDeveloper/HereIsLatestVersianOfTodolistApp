import {addTodolistAC, setTodoListsAC, TodoListsDomainType, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../../../app/App";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListsDomainType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodoLists).toBe(action.todolistId)
})
test('empty arrays should be added when we set todolists', () => {

    const action = setTodoListsAC([
        {
            id: "1", title: 'What to learn', addedDate: '',
            order: 0
        },
        {
            id: "2", title: 'What to buy', addedDate: '',
            order: 0
        }
    ])

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
})




