export interface IBaseUser {
    name: string;
    email: string;
    photo: string;
}

export abstract class AbstractUser {
    public user: IBaseUser;

    constructor(user: IBaseUser) {
        this.user = user;
    }
}
