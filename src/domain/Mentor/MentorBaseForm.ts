import {IBaseUser} from "../User/AbstractUser";

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

export interface IMentorBaseForm  extends IBaseUser {
    documentType?: string;
    document?: string;
    contactNumber?: string;
    sitesId?: number[];
    skillsId?: string[];
    description?: string;
    experiences?: IMentorExperience[];
    title?: string;
    company?: string;
    photoPath: string;
    timeZone?: string;
    utp?: boolean;
    shortDescription?: string;

}

class MentorBaseForm {
    public mentor: IMentorBaseForm;
    constructor(mentor: IMentorBaseForm) {
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
        this.mentor.photoPath = mentor.photoPath || '';
        this.mentor.description = mentor.description || '';
        this.mentor.experiences = mentor.experiences || [] as IMentorExperience[];
        this.mentor.company = mentor.company || '';
        this.mentor.title = mentor.title || '';
        this.mentor.timeZone = mentor.timeZone || 'America/Lima';
        this.mentor.utp = !!mentor.utp;
        this.mentor.shortDescription = mentor.shortDescription || '';
    }


}

export default MentorBaseForm;
