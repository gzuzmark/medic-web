import * as React from "react";
import {IUser} from "../../interfaces/User.interface";

export type TypeHeaderNotification = "ERROR";

export interface IHeaderNotification {
    show: boolean;
    text: string | React.ReactElement<any>;
    type: TypeHeaderNotification;
}

export interface ILayoutContext {
    notification: IHeaderNotification;
    user: IUser;
    setNotification(notification: IHeaderNotification): void;
    setUser(user: IUser): void;
}

export const defaultNotificationValues: IHeaderNotification = {
    show: false,
    text: "",
    type: "ERROR"
};

const defaultValue: ILayoutContext = {
    notification: defaultNotificationValues,
    setNotification: (notification: IHeaderNotification) => void(0),
    setUser: (status: IUser) => void(0),
    user: {} as IUser
};

const LayoutContext = React.createContext(defaultValue);

export default LayoutContext;
