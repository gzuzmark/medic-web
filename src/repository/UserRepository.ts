const keyToken = 'TOKEN_AUTH';
const keyUser = 'USER';

export const UserRepository = {
    setToken: (value: any) => {
        localStorage.setItem(keyToken, value);
    },

    getToken: () => {
        return localStorage.getItem(keyToken) || '';
    },

    setUser: (data: any) => {
        localStorage.setItem(keyUser, JSON.stringify(data));
    },

    getUser: () => {
        // const data = localStorage.getItem(keyUser) || '';
        // return JSON.parse(data);
        return {name: 'Carlos'};
    }
};

export default UserRepository;