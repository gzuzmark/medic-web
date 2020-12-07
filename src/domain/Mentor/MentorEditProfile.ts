import MentorAdminEditData from "./MentorAdminEdit";
import {
    IMentorBaseForm, IMentorExperience,
    IMentorFormValidations
} from "./MentorBaseForm";

export interface IMentorEditProfileData extends IMentorBaseForm {
    rating?: {
        average: number;
        count: number;
    };
}

export interface IMentorEditParams {
    company: string;
    description: string;
    experiences: IMentorExperience[];
    photoPath: string;
    title: string;
    about_me: string;
    formation: string;
}

export interface IMentorProfileFormValidations extends IMentorFormValidations{
    rating?: {
        average: number;
        count: number;
    };
}

class MentorEditProfileData extends MentorAdminEditData {
    public rating = {
        average: 0,
        count: 0
    };
    constructor(mentor: IMentorEditProfileData) {
        super(mentor);
        this.rating = mentor.rating || this.rating;
    }

    get getMentorProfileValues(): IMentorProfileFormValidations{
        return {...this.getMentorValues, rating: this.rating};
    }

    get mentorUpdateParams(): IMentorEditParams {
        return {
            about_me: this.mentor.about_me || '',
            company: this.mentor.company || '',
            description: this.mentor.description || '',
            experiences: this.mentor.experiences || [] as IMentorExperience[],
            formation: this.mentor.formation || '',
            photoPath: this.mentor.photoPath || '',
            title: this.mentor.title || ''
        }
    }
}

export default MentorEditProfileData;
