import React, { ChangeEvent, memo, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanPropsType = {
  titleValue: string;
  onChange: (newValue: string) => void;
};
export const EditableSpan = memo((props: EditableSpanPropsType) => {
  const { onChange, titleValue } = props;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const activateEditMode = (): void => {
    setEditMode(true);
    setTitle(titleValue);
  };

  const activateViewMode = (): void => {
    setEditMode(false);
    onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    setTitle(e.currentTarget.value);

  return editMode ? (
    <TextField
      variant="outlined"
      value={title}
      onBlur={activateViewMode}
      onChange={onChangeTitleHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{titleValue}</span>
  );
});
