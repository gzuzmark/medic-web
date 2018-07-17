export interface ILocationPhysicalRoom {
    id: string;
    room: string;
    maxStudents: number;
}

export interface ILocationVirtualRoom {
    id: string;
    room: string;
    maxStudents: number;
}

export interface ILocationPhysical {
    site: string;
    rooms: ILocationPhysicalRoom[];
}

export interface ILocationVirtual {
    site?: string;
    rooms: ILocationVirtualRoom[];
}