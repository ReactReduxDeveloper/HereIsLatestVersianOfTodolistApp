import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox, ControlPoint} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}

export const AddItemForm = React.memo(({disabled = false, addItem}: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            addItem(title.trim())
            setTitle("")
        } else setError("Title is required")
    }


    return <>
        <TextField variant="outlined"
                   value={title}
                   disabled={disabled}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}
                   error={!!error}
                   label="Title"
                   helperText={error}
        />
        <IconButton onClick={addTask}
                    color="primary"
                    disabled={disabled}
        >
            <ControlPoint/>
        </IconButton>
    </>
})