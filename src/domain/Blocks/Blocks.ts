import {IRoom} from "../Room/Room";

export interface IBlock {
    id: string;
    siteId: string;
    name: string;
    address: string;
    rooms?: IRoom[];
}
