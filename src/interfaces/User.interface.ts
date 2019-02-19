import {IBaseUser} from "../domain/User/AbstractUser";

export interface IUserInput {
    username: string;
    password: string;
}

export interface IUser extends IBaseUser {
    dni: string;
    id: string;
    status: string;
    timeZone: string;
    rol: string;
    rolId: string;
}
