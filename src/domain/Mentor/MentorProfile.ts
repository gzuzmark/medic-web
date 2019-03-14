import MentorBaseForm, {
    IMentorBaseForm,
    IMentorExperience,
    IMentorFormExperience,
    IMentorFormValidations
} from "./MentorBaseForm";

export interface IMentorProfileData extends IMentorBaseForm {
    rating?: {
        average: number;
        count: number;
    };
}

export interface IMentorRating {
    average: number;
    count: number;
};

export interface IMentorProfileFormValidations extends IMentorFormValidations{
    rating?: IMentorRating;
}

class MentorProfileData extends MentorBaseForm {
    public rating = {
        average: 0,
        count: 0
    };
    constructor(mentor: IMentorProfileData) {
        super(mentor);
        this.rating = mentor.rating || this.rating;
    }

    get getMentorProfileValues(): IMentorProfileFormValidations{
        return {...this.getMentorValues, rating: this.rating};
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
        return formExperiences;
    }
}

export default MentorProfileData;
