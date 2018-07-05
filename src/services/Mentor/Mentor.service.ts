import {IMentor, IMentorSession} from '../../interfaces/Mentor.interface';
import BaseRequest from '../BaseRequest';

class MentorService extends BaseRequest {

    public list(skillName?: string): Promise<IMentor[]> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo-admin/mentors?skill=' + skillName)
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

    public sessions(month: number, idMentor: string): Promise<IMentorSession[]> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo-admin/mentors/' + idMentor + '/sessions?month=' + month + '&year=2018')
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
}

export default MentorService;