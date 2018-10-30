import {ISessionsToDelete} from '../../domain/FormSession/FormSessionDeleteBean';
import {ISessionMentor} from '../../domain/Session/SessionMentorBean';
import { IReportForSession } from '../../interfaces/Reports.interface';
import BaseRequest from '../BaseRequest';

class SessionService extends BaseRequest {

    public listReport(params: string): Promise<IReportForSession> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/sessions/report?${params}`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    public searchSessions(params: string): Promise<ISessionsToDelete[]> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/sessions/search?${params}`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data.items);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    public getReportLink(params: object): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo-admin/sessions/report`, params)
                .then((response: any) => {
                    if (response.status === 200 && response.data && response.data.data) {
                        resolve(response.data.data);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    public deleteSessions(ids: string[]): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.delete(`ugo-admin/sessions`, {
                data: {
                    items: ids
                }
            }).then((response: any) => {
                if (response.status === 200 && response.data) {
                    resolve(response.data);
                } else {
                    reject(null);
                }
            })
            .catch((error: any) => {
                this.validSession();
                reject(error);
            });
        });
    }

    // Mentor Service
    public listMentorSessions(from: string, to: string): Promise<ISessionMentor[]> {
        const instance = this.getCustomInstance(
            "/La6HK7/RI/6vveP0q3AptWgl5i/5SRvd+SwRJYAdy5olRqmmnPe8A==",
            "https://ugo-utp-dev.appspot.com/_ah/api/");
        return new Promise((resolve, reject) => {
            instance.get(`ugo-mentor/me/sessions?from=${from}&to=${to}`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data.items);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }
}

export default SessionService;