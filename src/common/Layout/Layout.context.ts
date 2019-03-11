import * as React from "react";

export type TypeHeaderNotification = "ERROR";

export interface IHeaderNotification {
    show: boolean;
    text: string;
    type: TypeHeaderNotification;
}

export interface ILayoutContext {
    notification: IHeaderNotification;
    setNotification(notification: IHeaderNotification): void;
}

export const defaultNotificationValues: IHeaderNotification = {
    show: false,
    text: "",
    type: "ERROR"
};

const defaultValue: ILayoutContext = {
    notification: defaultNotificationValues,
    setNotification: (notification: IHeaderNotification) => void(0)
};

const LayoutContext = React.createContext(defaultValue);

export default LayoutContext;
