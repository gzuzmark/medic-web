import {IArea} from "../../interfaces/Mentor.interface";
import {ISkill} from "../Skill/Skill";
import {IBaseUser} from "../User/AbstractUser";

// TODO: Update variable names from mentor to Doctor
export const MENTOR_STATUS = {
    DISABLED: 'NEW',
    INCOMPLETE: 'INCOMPLETED',
    PUBLISHED: 'PUBLISHED'

};

export interface IMentorBase {
    id: string;
    user: IBaseUser;
    interestAreas: IArea[];
    sessions: {
        totalMinutes: number;
    }
    status: string;
    skills?: ISkill[];
}

export interface IMentorPaginated {
    pageSize: number;
    totalItems: number;
    currentPage: number;
    items: IMentorBase[];
}
