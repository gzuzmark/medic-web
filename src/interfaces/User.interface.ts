export interface IUserInput {
    username: string;
    password: string;
}


export interface IBaseUser {
    name: string;
    email: string;
    photo: string;
}

export interface IUser extends IBaseUser{
    dni: string;
    id: string;
    status: string;
    timeZone: string;
    rol: string;
    rolId: string;
}
