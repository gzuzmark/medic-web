import {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import MentorAdminCreateData, {
    IMentorAdminCreateData
} from "../../../domain/Mentor/MentorAdminCreate";
import {IFormItemBase} from "../../../domain/Mentor/MentorBaseForm";
import {IMentorFormBaseContext} from "./MentorFormBase.context";

const mentorCreateData = new MentorAdminCreateData({} as IMentorAdminCreateData);
export const getDefaultValues = ():IMentorFormBaseContext => (
    {
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
        values: mentorCreateData.getMentorValues
    }
);

export const getFullValues = ():IMentorFormBaseContext => (
    {
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
        values: {
            about_me: 'Esto es sobre mí',
            contactNumber: '955941942',
            currentCompany: 'UTP',
            currentPosition: 'FrontEnd Developer',
            description: 'Esta es una descripcion',
            document: '46942026',            
            documentType: {value: 'DNI', label: 'DNI'} as IFormItemBase,
            email: 'carlos.hs.92@gmail.com',
            experiences: [
                {
                    company: 'UPC',
                    fromMonth: (new Date()).getMonth().toString(),
                    fromYear: (new Date()).getFullYear().toString(),
                    position: 'FrontEnd Developer',
                    toMonth: (new Date()).getMonth().toString(),
                    toYear: (new Date()).getFullYear().toString()
                },
                {
                    company: 'ESAN',
                    fromMonth: (new Date()).getMonth().toString(),
                    fromYear: (new Date()).getFullYear().toString(),
                    position: 'FrontEnd Developer',
                    toMonth: (new Date()).getMonth().toString(),
                    toYear: (new Date()).getFullYear().toString()
                }
            ],
            firstName: 'Carlos',
            formation: 'Mi formación',
            lastName: 'Huamani',
            location: {} as IFormItemBase,
            medicCollegeNumber: '',
            picture: '',
            skills: [] as IFormItemBase[],
            status: '',
            utp: false
        }
    }
);
