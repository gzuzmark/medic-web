import {ISkill} from "../../domain/Skill/Skill";
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
                    this.validSession();
                    reject(error);
                });
        });
    }

    public listBySite(id: string): Promise<ISkill[]> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/sites/${id}/skills`)
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

export default SkillService;
