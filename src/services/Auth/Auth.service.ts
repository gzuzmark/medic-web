import Axios from 'axios';
import { IUserInput } from '../../interfaces/User.interface';
import UserRepository, {ROL_ADMIN} from '../../repository/UserRepository';
import { headersRequest } from '../BaseRequest';
import BaseRequest from "../BaseRequest";

class AuthService extends BaseRequest {
    private baseURL= process.env.REACT_APP_BASE_URL;

    public login(data: IUserInput, rol: string): Promise<any> {
        const {username, password} = data;
        const service = rol === ROL_ADMIN ? 'ugo-admin/login' : 'ugo/mentors-api/login' ;
        return new Promise((resolve, reject) => {
            Axios.post(this.baseURL + service,
                { email: username, password },
                { headers: headersRequest })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        UserRepository.setToken(response.data.token);
                        UserRepository.setRefreshToken(response.data.refreshToken);
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

    public loadUser(rol: string): Promise<any> {
        const service = rol === ROL_ADMIN ? 'ugo-admin/admins/me' : 'ugo/mentors-api/me';
        return new Promise((resolve) => {
            this.instance.get(service)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        response.data.user.rol = rol;
                        response.data.user.rolId = response.data.id;
                        UserRepository.setUser({...response.data.user, status: response.data.status});
                        resolve(true);
                    } else {
                        this.validSession();
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
