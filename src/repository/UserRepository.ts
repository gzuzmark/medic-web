import { IUser } from '../interfaces/User.interface';

const keyToken = 'TOKEN_AUTH';
const keyRefreshToken = 'REFRESH_TOKEN_AUTH';
const keyUser = 'USER_INF';

export const ROL_MENTOR = 'mentor';
export const ROL_ADMIN = 'administrador';

export const UserRepository = {
    setToken: (value: any) => {
        localStorage.setItem(keyToken, value);
    },

    getToken: () => {
        return localStorage.getItem(keyToken) || '';
    },

    setRefreshToken: (value: any) => {
        localStorage.setItem(keyRefreshToken, value);
    },

    getRefreshToken: () => {
        return localStorage.getItem(keyRefreshToken) || '';
    },

    setUser: (data: any) => {
        const user = JSON.stringify(data);
        localStorage.setItem(keyUser, user);
    },

    getUser: ():IUser => {
        const data = localStorage.getItem(keyUser) || '';
        let user;
        if (data !== '') {
            user = JSON.parse(data)
        } else {
            user = {}
        }
        return user;
    }
};

export default UserRepository;

