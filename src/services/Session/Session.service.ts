import {ISessionsToDelete} from '../../domain/FormSession/FormSessionDeleteBean';
import {ISessionMentor} from '../../domain/Session/SessionMentorBean';
import { IReportForSession } from '../../interfaces/Reports.interface';
import BaseRequest from '../BaseRequest';

class SessionService extends BaseRequest {
    private listMentorSessionsCancelToken: any = null;

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
    public listMentorSessions(from: string, to: string, id: string = ''): Promise<ISessionMentor[]> {
        if (!!this.listMentorSessionsCancelToken) {
            this.listMentorSessionsCancelToken.cancel();
        }
        this.listMentorSessionsCancelToken = this.generateCancelToken();
        let instance: any;
        if (!id) {
            instance = this.getCustomInstance(
                "K42cWStRagrHBjnWRBAKZ/PO58bxICfBOomyTn4yJnyeAhq4+YWtJg==",
                "https://ugo-utp-dev.appspot.com/_ah/api/ugo/mentors-api/",
                this.listMentorSessionsCancelToken);
        } else {
            instance = this.getCustomInstance(id,
                "https://ugo-utp-qa.appspot.com/_ah/api/ugo/mentors-api/",
                this.listMentorSessionsCancelToken);
        }
        return new Promise((resolve, reject) => {
            instance.get(`me/sessions/all?from=${from}&to=${to}`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data.items);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public getSessionMentor(session: string, id: string = ''): Promise<ISessionMentor> {
        let instance: any;
        if (!id) {
            instance = this.getCustomInstance(
                "K42cWStRagrHBjnWRBAKZ/PO58bxICfBOomyTn4yJnyeAhq4+YWtJg==",
                "https://ugo-utp-dev.appspot.com/_ah/api/ugo/mentors-api/");
        } else {
            instance = this.getCustomInstance(id,
                "https://ugo-utp-qa.appspot.com/_ah/api/ugo/mentors-api/");
        }
        return new Promise((resolve, reject) => {
            instance.get(`me/sessions/${session}`)
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

    public markAsAttended(session: string, ids: string[], noStudentsResponse: boolean, id: string = '') {
        let instance: any;
        if (!id) {
            instance = this.getCustomInstance(
                "K42cWStRagrHBjnWRBAKZ/PO58bxICfBOomyTn4yJnyeAhq4+YWtJg==",
                "https://ugo-utp-dev.appspot.com/_ah/api/ugo/mentors-api/");
        } else {
            instance = this.getCustomInstance(id,
                "https://ugo-utp-qa.appspot.com/_ah/api/ugo/mentors-api/");
        }
        return new Promise((resolve, reject) => {
            instance.post(`sessions/${session}/students`, {
                items: ids
            })
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

    public markAsNoAttended(session: string, id: string = '') {
        let instance: any;
        if (!id) {
            instance = this.getCustomInstance(
                "K42cWStRagrHBjnWRBAKZ/PO58bxICfBOomyTn4yJnyeAhq4+YWtJg==",
                "https://ugo-utp-dev.appspot.com/_ah/api/ugo/mentors-api/");
        } else {
            instance = this.getCustomInstance(id,
                "https://ugo-utp-qa.appspot.com/_ah/api/ugo/mentors-api/");
        }
        return new Promise((resolve, reject) => {
            instance.post(`sessions/${session}/noattended`)
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
}

export default SessionService;
