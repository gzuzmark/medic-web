import MentorBaseForm, {IMentorBaseForm, IMentorExperience, IMentorFormExperience} from "./MentorBaseForm";

export interface IMentorCreateData extends IMentorBaseForm {
    exist: boolean;
}

class MentorCreateData extends MentorBaseForm {
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

    public getFormExperiences(): IMentorFormExperience[] {
        const experiences = this.mentor.experiences ? [...this.mentor.experiences] : [];
        return experiences.map((item: IMentorExperience) => {
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
    }
}

export default MentorCreateData;
