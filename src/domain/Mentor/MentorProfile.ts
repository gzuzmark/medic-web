import MentorBaseForm, {
    IMentorBaseForm,
    IMentorEducationInfo,
    IMentorEducationInfoForm,
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
    public getFormEducation(): IMentorEducationInfoForm[] {
        const education = this.mentor.education ? [...this.mentor.education] : [];
        const formEducation = education.map((item: IMentorEducationInfo) => {
            const {to} = item;
            const toDate = !!to ? new Date(to) : '';
            return {
                educationType:item.educationType,
                city: item.city,
                degree: item.degree,
                school: item.school ,
                year: !!toDate ? toDate.getFullYear().toString() : '',
                currentStudy: !toDate
            }
        });
        return formEducation;
    }
    /*
    public getAwardsInfo(): IAwardsItem[] {
        const awards = this.mentor.awards ? [...this.mentor.awards] : [];
        const listAwards = awards.map((item: IAwardsItem) => {
            return{
                name:item.name
            }
        });
        return listAwards;
    }*/
}

export default MentorProfileData;
