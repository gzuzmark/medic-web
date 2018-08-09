import Axios from 'axios';
import UserRepository from "../repository/UserRepository";

export const headersRequest = {
    'Content-Type': 'application/json'
};

class BaseRequest {
    protected instance: any;
    private baseUrl = '';

    constructor() {
        this.baseUrl = process.env.REACT_APP_BASE_URL || '';
        this.instance = Axios.create({
            baseURL: this.baseUrl,
            headers: {...headersRequest, 'Authorization': 'Bearer ' + UserRepository.getToken()},
        });

        this.instance.interceptors.response.use((response:any) => {
            return response;
        }, async (error:any) => {
            const originalRequest = {...error.config};
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    await this.refreshToken();
                    this.setTokenHeader();
                    return this.instance(originalRequest);
                } catch (error) {
                    originalRequest._retry = false;
                }
            }
            return Promise.reject(error);
        });

    }

    public refreshToken() {

        return new Promise((resolve, reject) => {

            Axios.post('/ugo-admin/refreshToken', {},
                {
                    baseURL: this.baseUrl,
                    headers:{'Authorization':'Bearer ' + UserRepository.getRefreshToken()}}
                ).then((response) => {
                    UserRepository.setRefreshToken(response.data.refreshToken);
                    UserRepository.setToken(response.data.token);
                    resolve();
                }).catch((error)=> {
                    UserRepository.setRefreshToken('');
                    UserRepository.setToken('');
                    window.location.assign('/');
                    reject();
                });
        });
    }

    public setTokenHeader() {
        this.instance = Axios.create({
            baseURL: this.baseUrl,
            headers: {...headersRequest, 'Authorization': 'Bearer ' + UserRepository.getToken()},
        });
    }

    get request() {
        return this.instance;
    }


    public validSession() {
        const exist = UserRepository.getToken() && UserRepository.getUser();
        if (!exist) {
            window.location.assign('/');
        }
    }
}

export default BaseRequest;