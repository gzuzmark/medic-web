import Axios from 'axios';
import UserRepository from "../repository/UserRepository";

export const headersRequest = {
    'Content-Type': 'application/json',
    'installedVersion': '2.0.0',
    'platformName': 'android',
};

class BaseRequest {
    protected instance: any;

    constructor() {
        this.instance = Axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {...headersRequest, 'Authorization': 'Bearer ' + UserRepository.getToken()},
            timeout: 5000
        });
    }

    get request() {
        return this.instance;
    }
}

export default BaseRequest;