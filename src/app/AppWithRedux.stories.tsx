import React from "react";
import {action} from "@storybook/addon-actions";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    title: "AddAppWithRedux Component",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

const callBack = action("Button 'add' was pressed inside the form")

export const AppWithReduxBaseExample = (props: any) => {
    return (<App demo={true}/>)
}