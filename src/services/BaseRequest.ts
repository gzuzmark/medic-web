import Axios from 'axios';
import UserRepository from "../repository/UserRepository";

export const headersRequest = {
    'Content-Type': 'application/json',
    'installedVersion': '1.0.0',
    'platformName': 'web',
    'resolution': 'hdpi'
};

class BaseRequest {
    protected instance: any;
    private baseUrl = '';
    private source: any;
    constructor() {
        this.baseUrl = process.env.REACT_APP_BASE_URL || '';
        this.instance = Axios.create({
            baseURL: this.baseUrl,
            headers: {...headersRequest, 'Authorization': 'Bearer ' + UserRepository.getToken()},
        });
        this.source = Axios.CancelToken.source();
        this.onResponseError();
    }

    public getCustomInstance(cancel?: any) {
        const params: {baseURL: string, headers: object, cancelToken?: any} = {
            baseURL: this.baseUrl,
            headers: {...headersRequest, 'Authorization': 'Bearer ' + UserRepository.getToken()},
        };
        if (!!cancel) {
            params.cancelToken = cancel.token;
        }
        const newInstance = Axios.create(params);
        this.onResponseError(newInstance);
        return newInstance;
    }

    public generateCancelToken() {
        return Axios.CancelToken.source();
    }

    public refreshToken() {
        return new Promise<string>((resolve, reject) => {
            Axios.post('/ugo-admin/refreshToken', {},
                {
                    baseURL: this.baseUrl,
                    cancelToken: this.source.token,
                    headers:{'Authorization':'Bearer ' + UserRepository.getRefreshToken()}}
                ).then((response) => {
                    UserRepository.setRefreshToken(response.data.refreshToken);
                    UserRepository.setToken(response.data.token);
                    this.source.cancel('New token was given.');
                    resolve(response.data.token);
                }).catch((error)=> {
                    if (Axios.isCancel(error)) {
                        resolve();
                    } else {
                        UserRepository.setRefreshToken('');
                        UserRepository.setToken('');
                        window.location.assign('/');
                        reject();
                    }
                });
        });
    }

    public setTokenHeader(currentToken?: string) {
        const token =  currentToken || UserRepository.getToken();
        return Axios.create({
            baseURL: this.baseUrl,
            headers: {...headersRequest, 'Authorization': 'Bearer ' + token},
        });
    }

    public validSession() {
        const exist = UserRepository.getToken() && UserRepository.getUser();
        if (!exist) {
            window.location.assign('/');
        }
    }

    private onResponseError(currentInstance?: any) {
        const instance = currentInstance || this.instance;
        instance.interceptors.response.use(async (response:any) => {
            return response;
        }, async (error:any) => {
            const originalRequest = error.response;
            if (originalRequest && originalRequest.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const token = await this.refreshToken();
                    originalRequest.config.headers = {...originalRequest.config.headers, 'Authorization': `Bearer ${token}`};
                    return instance(originalRequest.config);
                } catch (error) {
                    originalRequest._retry = false;
                }
            }
            return Promise.reject(error);
        });
    }
}

export default BaseRequest;
