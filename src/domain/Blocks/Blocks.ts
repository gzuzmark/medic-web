export interface IBlock {
    id: string;
    siteId: string;
    name: string;
    address: string;
    rooms?: IRoom[];
}

export interface IRoom {
    id: string;
    blockId: string;
    description: string;
    status: string;
    maxStudents: number;
    interestAreasId?: string[];
}
