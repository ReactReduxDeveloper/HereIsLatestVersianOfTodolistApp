import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootState, useTypedDispatch} from "../../../app/store";
import {addTodoListsTC, fetchTodoListsTC, TodoListsDomainType} from "./todolists-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import Todolist from "./Todolist";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

const TodoListLists: React.FC<PropsType> = ({demo = false}) => {

    const todoLists = useSelector<AppRootState, TodoListsDomainType[]>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)



    const dispatch = useTypedDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        const action = addTodoListsTC(title)
        dispatch(action)
    }, [dispatch])

    if(!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map(todolist => {
                    return <Grid item key={todolist.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                todolist={todolist}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    )
}
export default TodoListLists