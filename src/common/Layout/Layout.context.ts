import * as React from "react";

export type TypeHeaderNotification = "ERROR";

export interface IHeaderNotification {
    show: boolean;
    text: string | React.ReactElement<any>;
    type: TypeHeaderNotification;
}

export interface ILayoutContext {
    notification: IHeaderNotification;
    status: string;
    setNotification(notification: IHeaderNotification): void;
    setStatus(notification: string): void;
}

export const defaultNotificationValues: IHeaderNotification = {
    show: false,
    text: "",
    type: "ERROR"
};

const defaultValue: ILayoutContext = {
    notification: defaultNotificationValues,
    setNotification: (notification: IHeaderNotification) => void(0),
    setStatus: (status: string) => void(0),
    status: ''
};

const LayoutContext = React.createContext(defaultValue);

export default LayoutContext;
