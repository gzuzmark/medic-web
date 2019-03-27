import {IArea} from "../../interfaces/Mentor.interface";
import {IBlock} from "../Blocks/Blocks";
import {ISites} from "../Sites/Sites";

export interface IRoom {
    id: string;
    blockId: string;
    description: string;
    status: string;
    maxStudents: number;
    interestAreasId?: string[];
}

export interface IRoomAdminCreateResponse {
    id: string;
    blockId: string;
    description: string;
    status: string;
    maxStudents: number;
}

export interface IRoomAdminCreateRequest {
    description: string;
    maxStudents: number;
    interestAreasId: string[];
    block: string;
    site: string;
}

export interface IRoomAdminCreateForm {
    block?: IBlock;
    description?: string;
    interestAreas?: IArea[];
    maxStudents?: number;
    site?: ISites;
}

class RoomAdminCreate {
    public room: IRoomAdminCreateForm;
    constructor(room: IRoomAdminCreateForm) {
        this.room = room;
        this.room.block = room.block || {} as IBlock;
        this.room.site = room.site || {} as ISites;
        this.room.description = room.description || '';
        this.room.interestAreas = room.interestAreas || [] as IArea[];
        this.room.maxStudents = room.maxStudents || 1;
    }

    get getRequest():IRoomAdminCreateRequest {
        let areasIds = [] as string[];
        if (this.room.interestAreas) {
            areasIds = this.room.interestAreas.map((a) => a.id);
        }
        return {
            block: '',
            description: this.room.description || '',
            interestAreasId: areasIds,
            maxStudents: this.room.maxStudents || 1,
            site: ''
        }
    }
}

export default RoomAdminCreate;
