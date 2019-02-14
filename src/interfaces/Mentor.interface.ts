import {ISkill} from "../domain/Skill/Skill";
import {IBaseUser} from "./User.interface";

export interface IArea {
    id: string;
    name: string;
    type: string;
    sessionTypes: ISessionTypes[];
    skills: string[];
}

export interface ISessionTypes {
    name: string;
    type: string;
    key: string;
}

export interface IMentor {
    id: string;
    user: IBaseUser;
    interestAreas: IArea[];
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
    block: string;
    location: string;
}
