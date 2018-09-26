interface ISessionBase {
    from: Date;
    to: Date;
    type: string;
    maxStudents: number;
}

export interface ISession extends ISessionBase {
    mentorId: string;
    skillId: string;
    interestAreaId: string;
    skillName?: string;
    interestAreaName?: string;
    typeKey?: string;
    location: string;
    credits: number;
    sessions: ISessionSchedule[]
}

export interface ISessionReport extends ISessionBase {
    skillName: string;
    mentorName: string,
    sede: string,
    room: string,
}

export interface ISessionSchedule {
    key?: string;
    weekDay?: number;
    from: string;
    to: string;
}
