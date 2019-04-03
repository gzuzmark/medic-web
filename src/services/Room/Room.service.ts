import {IRoom, IRoomAdminCreateRequest, IRoomAdminCreateResponse} from "../../domain/Room/Room";
import BaseRequest from "../BaseRequest";

class RoomService extends BaseRequest {
    private roomCancelToken: any = null;

    public searchRoom(blockId: string, description: string): Promise<IRoom> {
        if (!!this.roomCancelToken) {
            this.roomCancelToken.cancel();
        }
        this.roomCancelToken = this.generateCancelToken();
        const instance = this.getCustomInstance(this.roomCancelToken);
        return new Promise((resolve, reject) => {
            instance.get(`ugo-admin/blocks/${blockId}/rooms/description/${description}`)
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

    public create(blockId: string, data: IRoomAdminCreateRequest): Promise<IRoomAdminCreateResponse> {
        const {description, interestAreasId, maxStudents} = data;
        return new Promise<IRoomAdminCreateResponse>((resolve, reject) => {
            this.instance.post(`ugo-admin/blocks/${blockId}/rooms/full `,
                {description, interestAreasId, maxStudents})
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
        })
    }
}

export default RoomService;
