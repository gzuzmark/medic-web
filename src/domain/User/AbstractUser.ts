export interface IBaseUser {
    id?: string;
    name: string;
    lastname: string;
    last_name?: string;
    email: string;
    photo: string;
    phone?: string;
}

export abstract class AbstractUser {
    public user: IBaseUser;

    constructor(user: IBaseUser) {
        this.user = user;
    }

    get id(): string {
        return this.user.id ? this.user.id : '';
    }
}
