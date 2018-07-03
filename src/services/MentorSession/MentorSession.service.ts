import { IMentorSession } from '../../interfaces/MentorSession.interface';
import BaseRequest from '../BaseRequest';

class MentorSessionService extends BaseRequest {

    public list(skillName?: string): Promise<IMentorSession[]> {
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
}

export default MentorSessionService;