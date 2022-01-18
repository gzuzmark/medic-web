import MentorBaseForm, {IMentorBaseForm, IMentorEducationInfo, IMentorEducationInfoForm, IMentorExperience, IMentorFormExperience} from "./MentorBaseForm";

export interface IMentorAdminCreateData extends IMentorBaseForm {
    exist: boolean;
}

class MentorAdminCreateData extends MentorBaseForm {
    public exist = false;
    constructor(mentor: IMentorAdminCreateData) {
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
        this.mentor.education = [
            {
                degree: "",
                school: "",
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
    public getFormEducation(): IMentorEducationInfoForm[] {
        const education = this.mentor.education ? [...this.mentor.education] : [];
        return education.map((item: IMentorEducationInfo) => {
            const {to} = item;
            const toDate = !!to ? new Date(to) : '';
            return {
                educationType:item.educationType,
                city: item.city,
                degree: item.degree,
                school: item.school ,
                year: !!toDate ? toDate.getFullYear().toString() : ''
            }
        });
    }
}

export default MentorAdminCreateData;
