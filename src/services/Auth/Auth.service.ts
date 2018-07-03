import Axios from 'axios';
import { IUserInput } from '../../interfaces/User.interface';
import UserRepository from '../../repository/UserRepository';
import { headersRequest } from '../BaseRequest';
import BaseRequest from "../BaseRequest";

class AuthService extends BaseRequest {
    private baseURL= process.env.REACT_APP_BASE_URL;

    public login(data: IUserInput): Promise<any> {
        const {username, password} = data;
        return new Promise((resolve, reject) => {
            Axios.post(this.baseURL + 'ugo/admins-api/login',
                { email: username, password },
                { headers: headersRequest })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        UserRepository.setToken(response.data.token);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public loadUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo/admins-api/me')
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        UserRepository.setUser(response.data.user);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error: any) => {
                    resolve(false);
                });
        });
    }
}

export default AuthService;