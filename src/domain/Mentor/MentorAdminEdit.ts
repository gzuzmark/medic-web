import MentorBaseForm, {
    IMentorBaseForm,
    IMentorExperience,
    IMentorFormExperience,
    IMentorFormValidations,
    IMentorEducationInfo,
    IMentorEducationInfoForm,
    IAwardsItem
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
        if (formEducation.length === 0) {
            formEducation.push({
                educationType:"",
                degree: "",
                year: "",
                school: "",
                city: "",
                currentStudy: false,
            })
        }
        return formEducation;
    }
    public getAwardsInfo(): IAwardsItem[] {
        const awards = this.mentor.awards ? [...this.mentor.awards] : [];
        const listAwards = awards.map((item: IAwardsItem) => {
            return{
                name:item.name
            }
        });
        if (listAwards.length===0){
            listAwards.push({
                name:""
            })
        }
        return listAwards;
    }
}

export default MentorAdminEditData;
