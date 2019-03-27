import * as React from "react";
import {IRoomAdminCreateRequest} from "../../../domain/Room/Room";

export interface ICreateRoomContext {
    errors: any;
    handleBlur: any;
    handleChange: any;
    isRepeated: boolean;
    setFieldTouched: any;
    setFieldValue: any;
    setIsRepeated: (isRepeated: boolean) => void,
    setTouched: (fields: { [field: string]: boolean }) => void,
    setValues: (fields: { [field: string]: any }) => void,
    touched: any;
    values: IRoomAdminCreateRequest;
}

const defaultValue: ICreateRoomContext = {
    errors: {},
    handleBlur: (event: any) => void(0),
    handleChange: (event: any) => void(0),
    isRepeated: true,
    setFieldTouched: (field: string, isTouched?: boolean) => void(0),
    setFieldValue: (field: string, value: string) => void(0),
    setIsRepeated: (isRepeated: boolean) => void(0),
    setTouched: (fields: { [field: string]: boolean }) => void(0),
    setValues: (fields: { [field: string]: any }) => void(0),
    touched: {},
    values: {} as IRoomAdminCreateRequest
};

const CreateRoomContext = React.createContext(defaultValue);

export default CreateRoomContext;
