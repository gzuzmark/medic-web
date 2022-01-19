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
                type:"",
                location:""
            }
        ]
        this.mentor.education = [
            {
                degree: "",
                school: "",
                to: "",
                educationType: "",
                city:""
            }
        ]
    }

    public getFormExperiences(): IMentorFormExperience[] {
        const experiences = this.mentor.experiences ? [...this.mentor.experiences] : [];
        return experiences.map((item: IMentorExperience) => {
            const {from, to} = item;
            const fromDate = !!from ? from : '';
            const toDate = !!to ? to : '';
            return {
                company: item.company,
                type: item.type,
                fromYear: fromDate,
                position: item.title ,
                toYear: toDate,
                location: item.location
            }
            
        });
    }
    public getFormEducation(): IMentorEducationInfoForm[] {
        const education = this.mentor.education ? [...this.mentor.education] : [];
        return education.map((item: IMentorEducationInfo) => {
            const {to} = item;
            const toDate = !!to ? to : '';
            return {
                educationType:item.educationType,
                city: item.city,
                degree: item.degree,
                school: item.school ,
                year: !!toDate ? toDate : ''
            }
        });
    }
}

export default MentorAdminCreateData;
