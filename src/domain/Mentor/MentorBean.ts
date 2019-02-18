
export interface IItemBase {
    id: string;
    value: string;
}

export interface IMentorExperience {
    title?: string;
    company?: string;
    from?: string;
    to?: string | null;
}

export interface IMentorBean {
    email: string;
    name?: string;
    lastname?: string;
    documentType?: string;
    document?: string;
    contactNumber?: string;
    sitesId?: number[];
    skillsId?: string[];
    photo?: string;
    description?: string;
    experience?: IMentorExperience[];
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
        this.mentor.contactNumber = mentor.contactNumber || '';
        this.mentor.sitesId = mentor.sitesId || [] as number[];
        this.mentor.skillsId = mentor.skillsId || [] as string[];
        this.mentor.photo = mentor.photo || '';
        this.mentor.description = mentor.description || '';
        this.mentor.experience = mentor.experience || [] as IMentorExperience[];
        this.mentor.company = mentor.company || '';
        this.mentor.title = mentor.title || '';
        this.mentor.timeZone = mentor.timeZone || 'America/Lima';
        this.mentor.utp = !!mentor.utp;
        this.mentor.shortDescription = mentor.shortDescription || '';
    }


}

export default MentorBean;
