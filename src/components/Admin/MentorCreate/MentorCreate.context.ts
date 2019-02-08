import * as React from "react";
import {IMentorFormValidations} from "../../../domain/Mentor/MentorCreate";

export interface IMentorCreateContext {
    errors: any;
    handleBlur: any;
    handleChange: any;
    setFieldValue: any;
    touched: any;
    values: IMentorFormValidations;
}

const defaultValue: IMentorCreateContext = {
    errors: {},
    handleBlur: (event: any) => void(0),
    handleChange: (event: any) => void(0),
    setFieldValue: (field: string, value: string) => void(0),
    touched: {},
    values: {} as IMentorFormValidations
};

const MentorCreateContext = React.createContext(defaultValue);

export default MentorCreateContext;
