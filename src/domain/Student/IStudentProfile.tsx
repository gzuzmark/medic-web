export interface IStudentProfile {
    student: {
        id: string;
        name: string;
        lastname: string;
        photo: string;
        code: string;
        acadCareer: string;
    },
    taggedSessions?: ITaggedSessions[],
    statistics: {
        scheduled: number;
        attended: number;
        attendedRatio: number;
        bestTags?: string;
    }
}

export interface ITaggedSessions {
    id: string;
    tagsList: string;
    comment: string;
    skillName: string;
    date: string;
}
