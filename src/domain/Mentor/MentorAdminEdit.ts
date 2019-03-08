import MentorBaseForm, {
    IMentorBaseForm,
    IMentorExperience,
    IMentorFormExperience,
    IMentorFormValidations
} from "./MentorBaseForm";

export interface IMentorAdminEditCreateData extends IMentorBaseForm {
    otherUtpRole?: boolean;
}

export interface IMentorAdminEditFormValidations extends IMentorFormValidations{
    otherUtpRole?: boolean;
}

class MentorAdminEditData extends MentorBaseForm {
    public exist = false;
    constructor(mentor: IMentorAdminEditCreateData) {
        super(mentor);
    }
    public getFormExperiences(): IMentorFormExperience[] {
        const experiences = this.mentor.experiences ? [...this.mentor.experiences] : [];
        const formExperiences = experiences.map((item: IMentorExperience) => {
            const {from, to} = item;
            const fromDate = !!from ? new Date(from) : '';
            const toDate = !!to ? new Date(to) : '';
            return {
                company: item.company,
                currentJob: !toDate,
                fromMonth: !!fromDate ? fromDate.getMonth().toString() : '',
                fromYear: !!fromDate ? fromDate.getFullYear().toString() : '',
                position: item.title ,
                toMonth: !!toDate ? toDate.getMonth().toString() : '',
                toYear: !!toDate ? toDate.getFullYear().toString() : ''
            }
        });
        if (formExperiences.length === 0) {
            formExperiences.push({
                    company: "",
                    currentJob: false,
                    fromMonth: "",
                    fromYear: "",
                    position: "",
                    toMonth: "",
                    toYear: ""
            })
        }
        return formExperiences;
    }
}

export default MentorAdminEditData;
