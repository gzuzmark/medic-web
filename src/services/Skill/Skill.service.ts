import {ISkill} from '../../interfaces/Mentor.interface';
import BaseRequest from '../BaseRequest';

class SkillService extends BaseRequest {

    public list(): Promise<ISkill[]> {
        return new Promise((resolve, reject) => {
            this.instance.get('ugo-admin/skills')
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

export default SkillService;