export interface IUserInput {
    username: string;
    password: string;
}

export interface IUser {
    dni: string;
    email: string;
    id: string;
    name: string;
    status: string;
    timeZone: string;
    photo?: string;
}