import MentorBaseForm, {
    IMentorBaseForm, IMentorEducationInfo,
    IMentorEducationInfoForm, IMentorExperience,
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
            const fromDate = !!from ? from : '';
            const toDate = !!to ? to : '';
            return {
                id: item.id || null,
                company: item.company,
                type: item.type || null,
                currentJob: item.currentJob,
                fromYear: !!fromDate ? fromDate : '',
                position: item.title ,
                toYear: !!toDate ? toDate : '',
                location: item.location
            } as IMentorFormExperience;
        });
        if (formExperiences.length === 0) {
            formExperiences.push({
                    id: null,
                    company: "",
                    type:"",
                    currentJob: 0,
                    fromYear: "",
                    position: "",
                    toYear: "",
                    location:"",
            })
        }
        return formExperiences;
    }
    public getFormEducation(): IMentorEducationInfoForm[] {
        const education = this.mentor.education ? [...this.mentor.education] : [];
        const formEducation = education.map((item: IMentorEducationInfo) => {
            const {year} = item;
            const toDate = !!year ? year : '';
            return {
                educationType:item.educationType,
                city: item.city,
                degree: item.degree,
                school: item.school ,
                year: !!toDate ? toDate : '',
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
    
    // public getAwardsInfo(): IAwardsItem[] {
    //     const awards = this.mentor.awards ? [...this.mentor.awards] : [];
    //     const listAwards = awards.map((item: IMentorAwardsInfo) => {
    //         return{
    //             name: item.description
    //         }
    //     });
    //     if (listAwards.length===0){
    //         listAwards.push({
    //             name: ""
    //         })
    //     }
    //     return listAwards;
    // }
}

export default MentorAdminEditData;
