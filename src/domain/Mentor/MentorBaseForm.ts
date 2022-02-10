import { documentDefaultSelection } from "../../repository/DocumentsIdentification";
import { IBaseUser } from "../User/AbstractUser";

export const emailStatus = {
    ALREADY_REGISTERED: "Este correo pertenece a un mentor ya creado",
    CLEAN: "",
    DNI_ALREADY_REGISTERED: "El usuario con este correo ya tiene su dni anexado a una cuenta",
    EMAIL_NOT_VALID: "Ingrese un correo válido",
    ERROR_PROCESS: "Tuvimos un problema al procesar su correo",
    FULL_DATA: "Se obtuvieron todos datos del usuario",
    NO_DATA: "No se obtuvieron datos del usuario"
};

export interface IFormItemBase {
    label: string;
    value: string;
}

export interface IMentorFormExperience {
    id?: string | null;
    position?: string;
    company?: string;
    fromYear?: string;
    toYear?: string;
    currentJob?: boolean;
    type?:string;
    location?:string;
}
export interface IAwardsItem{
    id?: string;
    name?:string;
}
export interface IMentorFormValidations {
    email: string;
    firstName: string;
    lastName: string;
    documentType: IFormItemBase;
    document: string;    
    contactNumber: string;
    location: IFormItemBase;
    medicCollegeNumber: string
    skills: IFormItemBase[];
    skill: IFormItemBase;
    picture: string;
    city:string;
    terceraEdad:number,
    menorUnAnio: number,
    // description: string;
    experiences: IMentorFormExperience[];
    // currentPosition: string;
    // currentCompany: string;
    status: string;
    utp: boolean;
    about_me: string;
    formation: string;
    gender:IFormItemBase;
    college: string;
    rne: string;
    education: IMentorEducationInfoForm[];
    patientAgeFrom: string;
    patientAgeTo: string;
    diagnostics: string[];
    awards: IMentorAwardsInfo[];

}

export interface IMentorExperience {
    id?: string | null;
    title?: string;
    company?: string;
    from?: string;
    to?: string | null;
    type?:string;
    location?:string;
}

export interface IMentorBase extends IBaseUser {
    documentType?: string;
    document?: string;
    medicCollegeNumber?: string;
    contactNumber?: string;
    sitesId?: number[];
    skillsId?: string[];
    title?: string;
    company?: string;
    photoPath: string;
    timeZone?: string;
    utp?: boolean;
    shortDescription?: string;
    status?: string;
    formation?: string;
    about_me?: string;
    gender?: string;
    college?: string;
    rne?: string;
    patientAgeFrom?: string;
    patientAgeTo?: string;
    terceraEdad?:number;
    menorUnAnio?: number;
    city?: string;
    description?: string;
}

export interface IMentorBaseForm extends IMentorBase {
    experiences?: IMentorExperience[];
    education?: IMentorEducationInfo[];
    diagnostics?: string[];
    awards?: IMentorAwardsInfo[];
}

export interface IMentorBaseFormFull extends IMentorBase {
    experiences?: IMentorExperience[];
    education?: IMentorEducationInfo[];
    diagnostics?: string[];
    awards?: IMentorAwardsInfo[];
}

export interface IMentorAwardsInfo {
    id?: string | null;
    description: string;
}

export interface  IMentorEducationInfoForm{
    id?: string | null;
    educationType?:string;
    degree?: string;
    year?: string;
    school?: string;
    city?: string;
    currentStudy?: boolean
}
export interface IMentorEducationInfo {
    id?: string | null;
    school?: string;
    educationType?:string;
    degree?: string;
    city?: string;
    year?: string | null;
}
export const genderList = [
    {value: "M", label: "Masculino"},
    {value: "F", label: "Femenino"}];

export const genderDefaultSelection = genderList[0];
abstract class MentorBaseForm {
    public mentor: IMentorBaseForm;
    constructor(mentor: IMentorBaseForm) {
        this.mentor = {...mentor};
        this.mentor.email = mentor.email || '';
        this.mentor.name = mentor.name || '';
        this.mentor.lastname = mentor.lastname || '';
        this.mentor.documentType = mentor.documentType || '';
        this.mentor.document = mentor.document || '';
        this.mentor.medicCollegeNumber = mentor.medicCollegeNumber || '';        
        this.mentor.contactNumber = mentor.contactNumber || '';
        this.mentor.sitesId = mentor.sitesId || [1];
        this.mentor.skillsId = mentor.skillsId || [] as string[];
        this.mentor.photo = mentor.photo || '';
        this.mentor.photoPath = mentor.photoPath || '';
        this.mentor.description = mentor.description || '';
        this.mentor.experiences = mentor.experiences || [] as IMentorExperience[];
        this.mentor.company = mentor.company || '';
        this.mentor.title = mentor.title || '';
        this.mentor.timeZone = mentor.timeZone || 'America/Lima';
        this.mentor.utp = !!mentor.utp;
        this.mentor.about_me = mentor.about_me || '';
        this.mentor.formation = mentor.formation || '';
        this.mentor.gender = mentor.gender || '';
        this.mentor.college = mentor.college || '';
        this.mentor.rne = mentor.rne || '';
        this.mentor.patientAgeFrom = mentor.patientAgeFrom || '';
        this.mentor.patientAgeTo = mentor.patientAgeTo || '';
        this.mentor.terceraEdad = mentor.terceraEdad || 0,
        this.mentor.menorUnAnio = mentor.menorUnAnio || 0,
        this.mentor.city = mentor.city || '',
        this.mentor.education = mentor.education || [] as IMentorEducationInfo[];
        this.mentor.diagnostics = mentor.diagnostics || [];
        this.mentor.awards = mentor.awards || [] as IMentorAwardsInfo[];
    }

    set setMentor(mentor: IMentorBaseForm) {
        this.mentor = mentor;
    }

    get getMentorValues(): IMentorFormValidations {
        const m = {...this.mentor};
        m.experiences = m.experiences || [] as IMentorExperience[];
        m.education = m.education || [] as IMentorEducationInfo[];
        const formValues = {
            about_me: m.about_me || '',
            contactNumber: m.contactNumber || '',
            /*currentCompany: m.company || '',
            currentPosition: m.title || '',
           // description: m.description || '',*/
            document: m.document || '',            
            documentType: {} as IFormItemBase,
            skill:{} as IFormItemBase,
            email: m.email || '',
            experiences: [] as IMentorFormExperience[],
            firstName: m.name || '',
            formation: m.formation || '',
            lastName: m.lastname || '',
            location: {} as IFormItemBase,
            medicCollegeNumber: m.medicCollegeNumber || '',
            picture: m.photoPath || '',
            skills: [] as IFormItemBase[],
            diagnostics: [] as string[],
            status: m.status || '',
            utp: !!m.utp,
            gender: {} as IFormItemBase,
            college: m.college || '',
            rne: m.rne || '',
            patientAgeTo: m.patientAgeTo || '',
            patientAgeFrom: m.patientAgeFrom || '',
            terceraEdad: m.terceraEdad || 0,
            menorUnAnio: m.menorUnAnio || 0,
            city:m.city || '',
            education: [] as IMentorEducationInfoForm[],
            awards:[] as IMentorAwardsInfo[]
        };

        formValues.location = {
            label: '',
            value: !!m.sitesId ? m.sitesId[0] : ''
        } as IFormItemBase;

        formValues.documentType = {
            label: m.documentType || documentDefaultSelection.label,
            value: m.documentType || documentDefaultSelection.value
        } as IFormItemBase;
        formValues.skill = {
            label: '',
            value: !!m.skillsId ? m.skillsId[0] : ''
        } as IFormItemBase;

        formValues.skills = !!m.skillsId ? m.skillsId.map((v) => ({label: '', value: v})) : [];
        
        formValues.experiences = this.getFormExperiences();
        formValues.education = this.getFormEducation();
        formValues.gender = {
            label: m.gender || genderDefaultSelection.label,
            value: m.gender || genderDefaultSelection.value
        } as IFormItemBase;
        formValues.awards = this.mentor.awards ? this.mentor.awards : [];
        formValues.diagnostics = this.mentor.diagnostics || [];
        
        return formValues;
    }

    public prepareData(values: IMentorFormValidations) {
        this.mentor.about_me = values.about_me.trim();
        this.mentor.formation = values.formation.trim();
        this.mentor.email = values.email.trim();
        this.mentor.name = values.firstName.trim();
        this.mentor.lastname = values.lastName.trim();
        this.mentor.photoPath = values.picture.trim();
        this.mentor.document= values.document.trim();
        this.mentor.medicCollegeNumber= values.medicCollegeNumber.trim();        
        this.mentor.documentType = values.documentType.value;
        this.mentor.skillsId = !!values.skill.value && [String(values.skill.value)] || [];  // values.skills.map((v) => v.value);
        this.mentor.diagnostics = values.diagnostics || [];
        this.mentor.sitesId = !!values.location.value && [Number(values.location.value)] || [];
        this.mentor.contactNumber = values.contactNumber.trim();
        // this.mentor.description = values.description.trim();
        // this.mentor.shortDescription = values.description.trim();
        // this.mentor.company = values.currentCompany.trim();
        // this.mentor.title = values.currentPosition.trim();
        // this.mentor.skill = values.skill.value;
        this.mentor.awards = values.awards;
        this.mentor.utp = values.utp;
        this.mentor.gender = values.gender.value;
        this.mentor.college = values.college;
        this.mentor.rne = values.rne;
        this.mentor.patientAgeFrom = values.patientAgeFrom;
        this.mentor.patientAgeTo = values.patientAgeTo;
        this.mentor.terceraEdad = values.terceraEdad;
        this.mentor.menorUnAnio = values.menorUnAnio;
        this.mentor.city = values.city 
        const experiences =values.experiences.filter((v) => {
            const required = !!v.fromYear && !!v.company && !!v.position;
            return required && (!!v.currentJob || (!!v.toYear))
        });
        this.mentor.experiences = experiences.map((v) => {
            return {
                id: v.id || null,
                type:v.type,
                company: v.company,
                from: new Date(v.fromYear || "").toISOString(),
                title: v.position,
                to: new Date(v.toYear || "").toISOString(),
                location: v.location
            }
        });
        const education =values.education.filter((v) => {
            const required = !!v.year && !!v.degree && !!v.educationType;
            return required && (!!v.currentStudy || (!!v.year))
        });
        this.mentor.education = education.map((v) => {
            // const to = new Date();
            // const currentYear = to.getFullYear.toString();
            /*if (!v.currentStudy) {
                to = new Date(Number(v.year));
            }*/
            return {
                id: v.id || null,
                degree: v.degree,
                school: v.school,
                educationType:v.educationType,
                city:v.city,
                year: v.year // v.currentStudy ? currentYear : v.year,
            }
        });
    }
    public prepareDataCreate() {
        let awards: string[] = [];
        if (this.mentor.awards) {
            awards = this.mentor.awards.map(value => value.description);
        }
        
        return {
            ...this.mentor,
            awards
        };
    }

    public abstract getFormExperiences(): IMentorFormExperience[];
    public abstract getFormEducation(): IMentorEducationInfoForm[];
}

export default MentorBaseForm;
