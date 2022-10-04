import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import {Provider} from "react-redux";
import {store} from "../../app/store";


export default {
    title: "EditableSpan Component",
    component: EditableSpan
}
const OnChangeCallBack = action("Value Changed")
export const EditableSpanExample = (props: any) => {
    return <>
            <EditableSpan titleValue={"Start Value"} onChange={OnChangeCallBack}/>
    </>
}