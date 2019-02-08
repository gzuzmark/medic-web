import MentorBean, {IMentorBean, IMentorExperience} from "./MentorBean";

export interface IMentorCreateData extends IMentorBean{
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
    documentType: string;
    document: string;
    numberContact: string;
    location: IFormItemBase;
    skills: IFormItemBase[];
    picture: string;
    description: string;
    experiences: IMentorFormExperience[];
    currentPosition: string;
    currentCompany: string;
}

class MentorCreateData extends MentorBean {
    public exist = false;
    constructor(mentor: IMentorCreateData) {
        super(mentor);
        this.exist = mentor.exist;
        this.mentor.experiences = [
            {
                company: "",
                currentJob: false,
                from: "",
                position: "",
                to: "",
            }
        ]

    }

    get getMentorValues(): IMentorFormValidations {
        const m = {...this.mentor};
        m.experiences = m.experiences || [] as IMentorExperience[];
        const formValues = {
            currentCompany: m.currentCompany || '',
            currentPosition: m.currentPosition || '',
            description: m.description || '',
            document: m.document || '',
            documentType: m.documentType || '',
            email: m.email || '',
            experiences: [] as IMentorFormExperience[],
            firstName: m.firstName || '',
            lastName: m.lastName || '',
            location: {} as IFormItemBase,
            numberContact: m.numberContact || '',
            picture: m.picture || '',
            skills: [] as IFormItemBase[]
        };
        formValues.experiences = m.experiences.map((item: IMentorExperience) => {
            const {from, to} = item;
            const fromDate = !!from ? new Date(from) : '';
            const toDate = !!to ? new Date(to) : '';
            return {
                company: item.company,
                fromMonth: !!fromDate ? fromDate.getMonth().toString() : '',
                fromYear: !!fromDate ? fromDate.getFullYear().toString() : '',
                position: item.position ,
                toMonth: !!toDate ? toDate.getMonth().toString() : '',
                toYear: !!toDate ? toDate.getFullYear().toString() : ''
            }
        });
        return formValues;
    }
}

export default MentorCreateData;
