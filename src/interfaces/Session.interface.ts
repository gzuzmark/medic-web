export interface ISession {
    from: Date;
    to: Date;
    mentorId: string;
    skillId: string;
    skillName?: string;
    type: string;
    location: string;
    credits: number;
    maxStudents: number;
    sessions: ISessionSchedule[]
}

export interface ISessionSchedule {
    weekDay: number;
    from: string;
    to: string;
}
