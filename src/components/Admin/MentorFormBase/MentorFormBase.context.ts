import * as React from "react";
import {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import {IMentorFormValidations} from "../../../domain/Mentor/MentorBaseForm";

export interface IMentorFormBaseContext {
    errors: any;
    handleBlur: any;
    handleChange: any;
    listSites: IPropsMentorOptionsDropDown[];
    listSkills: IPropsMentorOptionsDropDown[];
    selectedImage: string;
    setFieldTouched: any;
    setFieldValue: any;
    setTouched: (fields: { [field: string]: boolean }) => void
    setValues: (fields: { [field: string]: any }) => void,
    touched: any;
    updateImage: (image: string) => void;
    updateListSkills?: (siteId: string) => Promise<any>;
    values: IMentorFormValidations;
}

const defaultValue: IMentorFormBaseContext = {
    errors: {},
    handleBlur: (event: any) => void(0),
    handleChange: (event: any) => void(0),
    listSites: [] as IPropsMentorOptionsDropDown[],
    listSkills: [] as IPropsMentorOptionsDropDown[],
    selectedImage: '',
    setFieldTouched: (field: string, isTouched?: boolean) => void(0),
    setFieldValue: (field: string, value: string) => void(0),
    setTouched: (fields: { [field: string]: boolean }) => void(0),
    setValues: (fields: { [field: string]: any }) => void(0),
    touched: {},
    updateImage: (image: string) => void(0),
    updateListSkills: (siteId: string) => new Promise<any>((resolve) => resolve()),
    values: {} as IMentorFormValidations
};

const MentorFormBaseContext = React.createContext(defaultValue);

export default MentorFormBaseContext;
