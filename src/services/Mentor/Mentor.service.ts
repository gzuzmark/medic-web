import {IMentorBase} from "../../domain/Mentor/MentorBase";
import {IMentorBaseForm} from "../../domain/Mentor/MentorBaseForm";
import {IMentorSession} from '../../interfaces/Mentor.interface';
import BaseRequest from '../BaseRequest';

class MentorService extends BaseRequest {
    private verifyMenorCancelToken: any = null;

    public list(skillId?: string): Promise<IMentorBase[]> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo-admin/mentors?skill=' + skillId)
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

    public mentor(idMentor: string): Promise<IMentorBase> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo-admin/mentors/' + idMentor)
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

    public bulkWorkshop(idMentor: string, sessions: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo-admin/mentors/${idMentor}/sessions/workshops`, sessions)
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

    public bulk(idMentor: string, sessions: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.instance.post(`ugo-admin/mentors/${idMentor}/sessions/bulk`, sessions)
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

    public sessions(month: number, idMentor: string): Promise<IMentorSession[]> {
        return new Promise((resolve, reject) => {
            // ?month=' + month + '&year=2018
            this.instance.get('ugo-admin/mentors/' + idMentor + '/sessions')
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

    public verify(email: string): Promise<IMentorBaseForm> {
        if (!!this.verifyMenorCancelToken) {
            this.verifyMenorCancelToken.cancel();
        }
        this.verifyMenorCancelToken = this.generateCancelToken();
        const instance = this.getCustomInstance(this.verifyMenorCancelToken);
        return new Promise<IMentorBaseForm>((resolve, reject) => {
            instance.get('ugo-admin/mentors/verify/' + email.trim())
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch((error: any) => {
                    this.validSession();
                    reject(error);
                });
        });
    }

    public uploadPhoto(formData: FormData): Promise<IMentorSession[]> {
        return new Promise((resolve, reject) => {
            this.instance.post('ugo-admin/mentors/photo', formData)
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

    public save(mentor: IMentorBaseForm) {
        return new Promise((resolve, reject) => {
            this.instance.post('ugo-admin/mentors-full', mentor)
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

    public get(idMentor: string): Promise<IMentorBaseForm> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/mentors-full/${idMentor}`)
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

export default MentorService;
