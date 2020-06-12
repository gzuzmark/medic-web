import {AbstractUser, IBaseUser} from "../User/AbstractUser";

export interface IUserStudent extends IBaseUser {
    code: string;
    link?: string;
}
export class UserStudentBean extends AbstractUser {
    public user: IUserStudent;
    constructor(user: IUserStudent) {
        super(user);
        this.user = user;
    }
}
