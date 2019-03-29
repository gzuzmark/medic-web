import {documentDefaultSelection} from "../../repository/DocumentsIdentification";
import {IBaseUser} from "../User/AbstractUser";

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
    position?: string;
    company?: string;
    fromMonth?: string;
    fromYear?: string;
    toMonth?: string;
    toYear?: string;
    currentJob?: boolean;
}

export interface IMentorFormValidations {
    email: string;
    firstName: string;
    lastName: string;
    documentType: IFormItemBase;
    document: string;
    contactNumber: string;
    location: IFormItemBase;
    skills: IFormItemBase[];
    picture: string;
    description: string;
    experiences: IMentorFormExperience[];
    currentPosition: string;
    currentCompany: string;
    status: string;
    utp: boolean;
}

export interface IMentorExperience {
    title?: string;
    company?: string;
    from?: string;
    to?: string | null;
}

export interface IMentorBaseForm  extends IBaseUser {
    documentType?: string;
    document?: string;
    contactNumber?: string;
    sitesId?: number[];
    skillsId?: string[];
    description?: string;
    experiences?: IMentorExperience[];
    title?: string;
    company?: string;
    photoPath: string;
    timeZone?: string;
    utp?: boolean;
    shortDescription?: string;
    status?: string;
}

abstract class MentorBaseForm {
    public mentor: IMentorBaseForm;
    constructor(mentor: IMentorBaseForm) {
        this.mentor = mentor;
        this.mentor.email = mentor.email || '';
        this.mentor.name = mentor.name || '';
        this.mentor.lastname = mentor.lastname || '';
        this.mentor.documentType = mentor.documentType || '';
        this.mentor.document = mentor.document || '';
        this.mentor.contactNumber = mentor.contactNumber || '';
        this.mentor.sitesId = mentor.sitesId || [] as number[];
        this.mentor.skillsId = mentor.skillsId || [] as string[];
        this.mentor.photo = mentor.photo || '';
        this.mentor.photoPath = mentor.photoPath || '';
        this.mentor.description = mentor.description || '';
        this.mentor.experiences = mentor.experiences || [] as IMentorExperience[];
        this.mentor.company = mentor.company || '';
        this.mentor.title = mentor.title || '';
        this.mentor.timeZone = mentor.timeZone || 'America/Lima';
        this.mentor.utp = !!mentor.utp;
        this.mentor.shortDescription = mentor.shortDescription || '';
    }

    set setMentor(mentor: IMentorBaseForm) {
        this.mentor = mentor;
    }

    get getMentorValues(): IMentorFormValidations {
        const m = {...this.mentor};
        m.experiences = m.experiences || [] as IMentorExperience[];
        const formValues = {
            contactNumber: m.contactNumber || '',
            currentCompany: m.company || '',
            currentPosition: m.title || '',
            description: m.description || '',
            document: m.document || '',
            documentType: {} as IFormItemBase,
            email: m.email || '',
            experiences: [] as IMentorFormExperience[],
            firstName: m.name || '',
            lastName: m.lastname || '',
            location: {} as IFormItemBase,
            picture: m.photoPath || '',
            skills: [] as IFormItemBase[],
            status: m.status || '',
            utp: !!m.utp
        };

        formValues.location = {
            label: '',
            value: !!m.sitesId ? m.sitesId[0] : ''
        } as IFormItemBase;

        formValues.documentType = {
            label: m.documentType || documentDefaultSelection.label,
            value: m.documentType || documentDefaultSelection.value
        } as IFormItemBase;

        formValues.skills = !!m.skillsId ? m.skillsId.map((v) => ({label: '', value: v})) : [];

        formValues.experiences = this.getFormExperiences();

        return formValues;
    }

    public prepareData(values: IMentorFormValidations) {
        this.mentor.email = values.email.trim();
        this.mentor.name = values.firstName.trim();
        this.mentor.lastname = values.lastName.trim();
        this.mentor.photoPath = values.picture.trim();
        this.mentor.document= values.document.trim();
        this.mentor.documentType = values.documentType.value;
        this.mentor.skillsId = values.skills.map((v) => v.value);
        this.mentor.sitesId = !!values.location.value && [Number(values.location.value)] || [];
        this.mentor.contactNumber = values.contactNumber.trim();
        this.mentor.description = values.description.trim();
        this.mentor.shortDescription = values.description.trim();
        this.mentor.company = values.currentCompany.trim();
        this.mentor.title = values.currentPosition.trim();
        this.mentor.utp = values.utp;
        const experiences =values.experiences.filter((v) => {
            const required = !!v.fromMonth && !!v.fromYear && !!v.company && !!v.position;
            return required && (!!v.currentJob || (!!v.toMonth && !!v.toYear))
        });
        this.mentor.experiences = experiences.map((v) => {
            const from = new Date(Number(v.fromYear), Number(v.fromMonth));
            let to = new Date();
            if (!v.currentJob) {
                to = new Date(Number(v.toYear), Number(v.toMonth));
            }
            return {
                company: v.company,
                from: from.toISOString(),
                title: v.position,
                to: v.currentJob ? null : to.toISOString(),
            }
        });
    }

    public abstract getFormExperiences(): IMentorFormExperience[];

}

export default MentorBaseForm;
