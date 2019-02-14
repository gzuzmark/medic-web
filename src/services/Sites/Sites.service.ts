import {ISites} from "../../domain/Sites/Sites";
import BaseRequest from '../BaseRequest';

class SitesService extends BaseRequest {
    public list(): Promise<ISites[]> {
        return new Promise((resolve, reject) => {
            this.instance.get(`ugo-admin/sites`)
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

export default SitesService;
