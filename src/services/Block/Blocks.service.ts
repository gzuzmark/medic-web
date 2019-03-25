import {IBlock} from "../../domain/Blocks/Blocks";
import BaseRequest from '../BaseRequest';

class BlocksService extends BaseRequest {
    private listBlocksCancelToken: any = null;

    public listBlocks(siteId: string): Promise<IBlock[]> {
        if (!!this.listBlocksCancelToken) {
            this.listBlocksCancelToken.cancel();
        }
        this.listBlocksCancelToken = this.generateCancelToken();
        const instance = this.getCustomInstance(this.listBlocksCancelToken);
        return new Promise((resolve, reject) => {
            instance.get(`ugo-admin/sites/${siteId}/blocks/full `)
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

export default BlocksService;
