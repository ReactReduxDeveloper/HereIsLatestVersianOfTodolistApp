import React, {ChangeEvent, memo, useCallback} from "react";
import {deleteTaskTC, updateTaskTC,} from "../tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatues, TaskType} from "../../../../api/todolists_api";
import {useTypedDispatch} from "../../../../app/store";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
};
export const Task = memo((props: TaskPropsType) => {
  const dispatch = useTypedDispatch();

  const changeTaskStatus = useCallback(
    (toDoListID: string, taskId: string, status: TaskStatues) => {
      const action = updateTaskTC(toDoListID, taskId, { status });
      dispatch(action);
    },
    [dispatch]
  );

  const onChangeCheckBoxElement = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDone = e.currentTarget.checked;
    changeTaskStatus(
      props.todoListId,
      props.task.id,
      newIsDone ? TaskStatues.Completed : TaskStatues.New
    );
  };

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      const action = updateTaskTC(props.todoListId, props.task.id, {
        title: newValue,
      });
      dispatch(action);
    },
    [dispatch, props.task.id, props.todoListId]
  );

  const deleteTaskFunctionHandler = () => {
    dispatch(deleteTaskTC(props.todoListId, props.task.id));
  };

  return (
    <li
      key={props.task.id}
      className={props.task.status === TaskStatues.Completed ? "is-done" : ""}
    >
      <Checkbox
        color="primary"
        checked={props.task.status === TaskStatues.Completed}
        onChange={onChangeCheckBoxElement}
      />

      <EditableSpan
        onChange={onChangeTitleHandler}
        titleValue={props.task.title}
      />

      <IconButton onClick={deleteTaskFunctionHandler}>
        <Delete />
      </IconButton>
    </li>
  );
});
