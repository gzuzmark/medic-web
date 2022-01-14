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
        listDiagnostics: [] as IPropsMentorOptionsDropDown[],
        selectedImage: '',
        setFieldTouched: (field: string, isTouched?: boolean) => void(0),
        setFieldValue: (field: string, value: string) => void(0),
        setTouched: (fields: { [field: string]: boolean }) => void(0),
        setValues: (fields: { [field: string]: any }) => void(0),
        touched: {},
        updateImage: (image: string) => void(0),
        updateListSkills: () => new Promise<void | any>((resolve) => resolve( )),
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
        listDiagnostics: [] as IPropsMentorOptionsDropDown[],
        selectedImage: '',
        setFieldTouched: (field: string, isTouched?: boolean) => void(0),
        setFieldValue: (field: string, value: string) => void(0),
        setTouched: (fields: { [field: string]: boolean }) => void(0),
        setValues: (fields: { [field: string]: any }) => void(0),
        touched: {},
        updateImage: (image: string) => void(0),
        updateListSkills: () => new Promise<any | void>((resolve) => resolve()),
        values: {
            firstName: 'Carlos',
            lastName: 'Huamani',
            contactNumber: '955941942',
            document: '46942026',            
            documentType: {value: 'DNI', label: 'DNI'} as IFormItemBase,
            email: 'carlos.hs.92@gmail.com',
            gender: {value: 'M', label: 'Masculino'} as IFormItemBase,
            picture: '',
            skill:{value:'', label:'Dermatologia'} as IFormItemBase, 
            skills: [] as IFormItemBase[],
            location: {} as IFormItemBase,
            medicCollegeNumber: '',
            college: 'CMP', 
            rne:'0',
            diagnostics: [],
            patientAgeFrom: '',
            patientAgeTo:'',
            terceraEdad: 0,
            menorUnAnio:0, 
            city:'Lima',
            about_me: 'Esto es sobre mí',
            experiences: [
                {   type: 'Intercambio',
                    company: 'UPC',
                    fromYear: (new Date()).getFullYear().toString(),
                    position: 'FrontEnd Developer',
                    toYear: (new Date()).getFullYear().toString(),
                    location: 'Lima,Peru'
                },
                {   type:'Profesional',
                    company: 'ESAN',
                    fromYear: (new Date()).getFullYear().toString(),
                    position: 'FrontEnd Developer',
                    toYear: (new Date()).getFullYear().toString(),
                    location: 'Lima'
                }
            ],
            education: [{
                educationType:'maestria',
                degree: '',
                year: (new Date()).getFullYear().toString(),
                school: '',
                city: 'Lima',
            }],            
            awards:[ 
                {name:'Premio al altruismo'},
                {name:'Reconocimiento a la trayectoria Profesional'}
            ],
            formation: '', 
            status: '',
            utp:false
            // location: {} as IFormItemBase,     
        }
    }
);
