import { IUser } from '../interfaces/User.interface';

const keyToken = 'TOKEN_AUTH';
const keyUser = 'USER_INF';

export const UserRepository = {
    setToken: (value: any) => {
        localStorage.setItem(keyToken, value);
    },

    getToken: () => {
        return localStorage.getItem(keyToken) || '';
    },

    setUser: (data: any) => {
        // tslint:disable:no-console
        console.log('setUser.!!', JSON.stringify(data));
        const user = JSON.stringify(data);
        localStorage.setItem(keyUser, user);
    },

    getUser: ():IUser => {
        const data = localStorage.getItem(keyUser) || '';
        return JSON.parse(data);
    }
};

export default UserRepository;

