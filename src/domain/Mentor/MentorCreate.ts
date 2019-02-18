import MentorBean, {IMentorBean, IMentorExperience} from "./MentorBean";

export interface IMentorCreateData extends IMentorBean {
    exist: boolean;
}

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

export const emailStatus = {
    ALREADY_REGISTERED: "Este correo pertenece a un mentor ya creado",
    CLEAN: "",
    EMAIL_NOT_VALID: "Ingrese un correo válido",
    ERROR_PROCESS: "Tuvimos un problema al procesar su correo",
    FULL_DATA: "Se obtuvieron todos datos del usuario",
    NO_DATA: "No se obtuvieron datos del usuario"
}

class MentorCreateData extends MentorBean {
    public exist = false;
    constructor(mentor: IMentorCreateData) {
        super(mentor);
        this.exist = mentor.exist;
        this.mentor.experiences = [
            {
                company: "",
                from: "",
                title: "",
                to: "",
            }
        ]
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
            picture: m.photo || '',
            skills: [] as IFormItemBase[],
            status: '',
            utp: !!m.utp
        };
        formValues.experiences = m.experiences.map((item: IMentorExperience) => {
            const {from, to} = item;
            const fromDate = !!from ? new Date(from) : '';
            const toDate = !!to ? new Date(to) : '';
            return {
                company: item.company,
                fromMonth: !!fromDate ? fromDate.getMonth().toString() : '',
                fromYear: !!fromDate ? fromDate.getFullYear().toString() : '',
                position: item.title ,
                toMonth: !!toDate ? toDate.getMonth().toString() : '',
                toYear: !!toDate ? toDate.getFullYear().toString() : ''
            }
        });
        return formValues;
    }

    public prepareData(values: IMentorFormValidations) {
        this.mentor.email = values.email;
        this.mentor.name = values.firstName;
        this.mentor.lastname = values.lastName;
        this.mentor.document= values.document;
        this.mentor.documentType = values.documentType.value;
        this.mentor.skillsId = values.skills.map((v) => v.value);
        this.mentor.sitesId = [Number(values.location.value)];
        this.mentor.contactNumber = values.contactNumber;
        this.mentor.description = values.description;
        this.mentor.shortDescription = values.description;
        this.mentor.company = values.currentCompany;
        this.mentor.title = values.currentPosition;
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
}

export default MentorCreateData;
