import {IMentor, IMentorSession} from '../../interfaces/Mentor.interface';
import BaseRequest from '../BaseRequest';

class MentorService extends BaseRequest {

    public list(skillId?: string): Promise<IMentor[]> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo-admin/mentors?status=PUBLISHED&skill=' + skillId)
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

    public mentor(idMentor: string): Promise<IMentor> {
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

    // Mentor Service
    public getMentor(id: string = ''): Promise<any> {
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
            instance.get(`me`)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
}

export default MentorService;
