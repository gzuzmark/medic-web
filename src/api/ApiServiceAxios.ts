import Axios, {AxiosInstance} from "axios";
import IApiService from "./IApiService";

export default class ApiServiceAxios implements IApiService {
    public baseUrl: string;
    public accessToken: string;
    public instance: AxiosInstance;

    constructor(url: string, accessToken: string) {
        this.baseUrl = url;
        this.accessToken = accessToken;
    }

    public createInstance() {
        this.instance = Axios.create({
            baseURL: this.baseUrl,
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken},
        });
    }

    public setAccessToken(token: string) {
        this.accessToken = token;
    }

    public createCancelToken() {
        const cancelTokenAxios = Axios.CancelToken;
        return cancelTokenAxios.source().token;
    }
}