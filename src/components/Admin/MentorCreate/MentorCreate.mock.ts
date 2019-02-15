import {IPropsMentorOptionsDropDown} from "../../../common/MentorDropDown/MentorDropDown";
import MentorCreateData, {
    IFormItemBase,
    IMentorCreateData
} from "../../../domain/Mentor/MentorCreate";
import {IMentorCreateContext} from "./MentorCreate.context";

const mentorCreateData = new MentorCreateData({} as IMentorCreateData);
export const getDefaultValues = ():IMentorCreateContext => (
    {
        errors: {},
        handleBlur: (event: any) => void(0),
        handleChange: (event: any) => void(0),
        listSites: [] as IPropsMentorOptionsDropDown[],
        listSkills: [] as IPropsMentorOptionsDropDown[],
        selectedImage: '',
        setFieldTouched: (field: string, isTouched?: boolean) => void(0),
        setFieldValue: (field: string, value: string) => void(0),
        touched: {},
        updateImage: (image: string) => void(0),
        updateListSkills: (siteId: string) => new Promise<any>((resolve) => resolve()),
        values: mentorCreateData.getMentorValues
    }
);

export const getFullValues = ():IMentorCreateContext => (
    {
        errors: {},
        handleBlur: (event: any) => void(0),
        handleChange: (event: any) => void(0),
        listSites: [] as IPropsMentorOptionsDropDown[],
        listSkills: [] as IPropsMentorOptionsDropDown[],
        selectedImage: '',
        setFieldTouched: (field: string, isTouched?: boolean) => void(0),
        setFieldValue: (field: string, value: string) => void(0),
        touched: {},
        updateImage: (image: string) => void(0),
        updateListSkills: (siteId: string) => new Promise<any>((resolve) => resolve()),
        values: {
            currentCompany: 'UTP',
            currentPosition: 'FrontEnd Developer',
            description: 'Esta es una descripcion',
            document: '46942026',
            documentType: {} as IFormItemBase,
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
            lastName: 'Huamani',
            location: {} as IFormItemBase,
            numberContact: '955941942',
            picture: '',
            skills: [] as IFormItemBase[],
            validation: ''
        }
    }
);
