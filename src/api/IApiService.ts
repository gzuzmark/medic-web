export default interface IApiService {
    baseUrl: string;
    accessToken: string;
    instance: any;
    createInstance(): void;
    setAccessToken(accessToken: string): void;
    createCancelToken(): any;
}