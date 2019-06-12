export interface IArea {
    id: string;
    name: string;
    type: string;
    status?: string;
    sessionTypes: ISessionTypes[];
    skills: string[];
}

export interface ISessionTypes {
    name: string;
    type: string;
    key: string;
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
    block: string;
    location: string;
}
