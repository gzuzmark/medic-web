
export interface IItemBase {
    id: string;
    value: string;
}

export interface IMentorExperience {
    position?: string;
    company?: string;
    from?: string;
    to?: string;
    currentJob?: boolean;
}

export interface IMentorBean {
    email: string;
    name?: string;
    lastname?: string;
    documentType?: string;
    document?: string;
    numberContact?: string;
    location?: IItemBase;
    skills?: IItemBase[];
    photo?: string;
    description?: string;
    experiences?: IMentorExperience[];
    currentPosition?: string;
    currentCompany?: string;

}

class MentorBean {
    public mentor: IMentorBean;
    constructor(mentor: IMentorBean) {
        this.mentor = mentor;
        this.mentor.email = mentor.email || '';
        this.mentor.name = mentor.name || '';
        this.mentor.lastname = mentor.lastname || '';
        this.mentor.documentType = mentor.documentType || '';
        this.mentor.document = mentor.document || '';
        this.mentor.numberContact = mentor.numberContact || '';
        this.mentor.location = mentor.location;
        this.mentor.skills = mentor.skills || [] as IItemBase[];
        this.mentor.photo = mentor.photo || '';
        this.mentor.description = mentor.description || '';
        this.mentor.experiences = mentor.experiences || [] as IMentorExperience[];
        this.mentor.currentPosition = mentor.currentPosition || '';
        this.mentor.currentCompany = mentor.currentCompany || '';
    }


}

export default MentorBean;
