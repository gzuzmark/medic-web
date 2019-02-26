import {IArea} from "../../interfaces/Mentor.interface";
import {ISkill} from "../Skill/Skill";
import {IBaseUser} from "../User/AbstractUser";

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
