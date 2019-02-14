import * as React from "react";
import {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import {IMentorFormValidations} from "../../../domain/Mentor/MentorCreate";

export interface IMentorCreateContext {
    errors: any;
    handleBlur: any;
    handleChange: any;
    listSites: IPropsMentorOptionsDropDown[];
    listSkills: IPropsMentorOptionsDropDown[];
    setFieldTouched: any;
    setFieldValue: any;
    touched: any;
    updateListSkills: (siteId: string) => Promise<any>;
    values: IMentorFormValidations;
}

const defaultValue: IMentorCreateContext = {
    errors: {},
    handleBlur: (event: any) => void(0),
    handleChange: (event: any) => void(0),
    listSites: [] as IPropsMentorOptionsDropDown[],
    listSkills: [] as IPropsMentorOptionsDropDown[],
    setFieldTouched: (field: string, isTouched?: boolean) => void(0),
    setFieldValue: (field: string, value: string) => void(0),
    touched: {},
    updateListSkills: (siteId: string) => new Promise<any>((resolve) => resolve()),
    values: {} as IMentorFormValidations
};

const MentorCreateContext = React.createContext(defaultValue);

export default MentorCreateContext;
