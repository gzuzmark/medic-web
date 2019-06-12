const keyRoomAdded = 'ROOM_CREATE_UPDATE';
export const ROOM_CREATE_ACTION = 'ROOM_CREATE_ACTION';
export const ROOM_UPDATE_ACTION = 'ROOM_UPDATE_ACTION';

export interface IRoomRepository {
    action: string;
    site: string;
    blocks: string[];
    rooms: string[];
}

export interface IRoomRepositoryInsert {
    block: string;
    room: string;
    site: string;
    action: string;
}

export const RoomRepository = {
    addedRoomClean() {
        localStorage.setItem(keyRoomAdded, "");
    },
    addedRoomGet(): IRoomRepository {
        const empty = JSON.stringify({site: '', blocks: [], rooms: [], action: ''});
        const repository = localStorage.getItem(keyRoomAdded) || empty;
        return JSON.parse(repository);
    },
    addedRoomInsert(insert: IRoomRepositoryInsert) {
        let roomRepository = this.addedRoomGet();
        if (roomRepository && roomRepository.site === insert.site && roomRepository.action === ROOM_CREATE_ACTION) {
            roomRepository.rooms.push(insert.room);
            roomRepository.blocks.push(insert.block);
        } else {
            roomRepository = {
                action: insert.action,
                blocks: [insert.block],
                rooms: [insert.room],
                site: insert.site
            }
        }
        localStorage.setItem(keyRoomAdded, JSON.stringify(roomRepository));
    }
};

export default RoomRepository;

