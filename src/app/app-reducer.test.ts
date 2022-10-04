import {v1} from "uuid";
import {TodoListsDomainType} from "../features/TodolistsList/Todolist/todolists-reducer";
import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType



beforeEach(()=>{

    startState = {
        error: null,
        status:'idle'
    }
})

test('correct error should be set',()=>{
const endState = appReducer(startState, setAppErrorAC('some error'))

    expect(endState.error).toBe('some error')

})
test('correct status should be set',()=>{
const endState = appReducer(startState, setAppStatusAC('succeeded'))

    expect(endState.status).toBe('succeeded')

})
