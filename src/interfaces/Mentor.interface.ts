export interface ISkill {
    color: string;
    id: string;
    name: string;
}

export interface IMentor {
    id: string;
    name: string;
    email: string;
    photo: string;
    sessions: {
        totalMinutes: number;
    }
    status: string;
    skills: ISkill[];
}

export interface IMentorDescription {
    id: string;
    user: {
        id: string;
        email: string;
        name: string;
        status: string;
        timeZone: string;
    },
    title: string;
    company: string;
    description:  string;
    shortDescription: string;
    status: string;
}

export interface IMentorSession {
    from: string;
    id: string;
    skill: string;
    to: string;
    type: string;
    bookedStudents: number;
    maxStudents: number;
    locationId: string;
    site: string;
    location: string;
}