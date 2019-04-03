const keyRoomAdded = 'NEW_ROOM_ADDED';

export interface IRoomRepository {
    site: string;
    blocks: string[];
    rooms: string[];
}

export const RoomRepository = {
    addedRoomClean() {
        localStorage.setItem(keyRoomAdded, "");
    },
    addedRoomGet(): IRoomRepository {
        const repository = localStorage.getItem(keyRoomAdded) || JSON.stringify({site: '', blocks: [], rooms: []});
        return JSON.parse(repository);
    },
    addedRoomInsert(id: string, block: string, room: string) {
        let roomRepository = this.addedRoomGet();
        if (roomRepository && roomRepository.site === id) {
            roomRepository.rooms.push(room);
            roomRepository.blocks.push(block);
        } else {
            roomRepository = {
                blocks: [block],
                rooms: [room],
                site: id
            }
        }
        localStorage.setItem(keyRoomAdded, JSON.stringify(roomRepository));
    }
};

export default RoomRepository;

