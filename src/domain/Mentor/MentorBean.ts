
export interface IItemBase {
    id: string;
    value: string;
}

export interface IMentorExperience {
    title?: string;
    company?: string;
    from?: string;
    to?: string;
}

export interface IMentorBean {
    email: string;
    name?: string;
    lastname?: string;
    documentType?: string;
    document?: string;
    numberContact?: string;
    location?: string;
    skills?: string[];
    photo?: string;
    description?: string;
    experiences?: IMentorExperience[];
    title?: string;
    company?: string;
    timeZone?: string;
    utp?: boolean;
    shortDescription?: string;

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
        this.mentor.location = mentor.location || '';
        this.mentor.skills = mentor.skills || [] as string[];
        this.mentor.photo = mentor.photo || '';
        this.mentor.description = mentor.description || '';
        this.mentor.experiences = mentor.experiences || [] as IMentorExperience[];
        this.mentor.company = mentor.company || '';
        this.mentor.title = mentor.title || '';
        this.mentor.timeZone = mentor.timeZone || 'America/Lima';
        this.mentor.utp = !!mentor.utp;
        this.mentor.shortDescription = mentor.shortDescription || '';
    }


}

export default MentorBean;
