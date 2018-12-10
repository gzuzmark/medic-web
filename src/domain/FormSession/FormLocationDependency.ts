import {IListItem} from "../../common/FilterList/FilterList";

export interface IRoomTree {
    id?: string;
    room?: string;
    maxStudents: number;
}

export interface IBlockTree {
    block?: string;
    rooms: IRoomTree[];
}

export interface ILocationTree {
    site?: string;
    blocks: IBlockTree[]
}

export class FormLocationDependency {
    public locationVirtual: ILocationTree[];
    public locationPhysical: ILocationTree[];

    public setLocationVirtual(tree: ILocationTree[]) {
        this.locationVirtual = tree;
    }

    public setLocationPhysical(tree: ILocationTree[]) {
        this.locationPhysical = tree;
    }

    public getVirtualLocations(): IListItem[] {
        return [{
            id: 'videoconferencia',
            name: 'Videoconferencia'
        }];
    }

    public getPhysicalLocations(): IListItem[] {
        return this.locationPhysical.map((tree: ILocationTree) => {
            const site = tree.site || '';
            return {
                id: site,
                name: site
            }
        });
    }

    public getPhysicalBlocks(site: string) : IListItem[] {
        return this.getSelectedSite(site).blocks.map((tree: IBlockTree) => {
            const block = tree.block || '';
            return {
                id: block,
                name: block
            }
        })
    }

    public getPhysicalRooms(site: string, block: string) : IListItem[] {
        const selectedSite = this.getSelectedSite(site);
        return this.getSelectedBlock(selectedSite, block).rooms.map((tree: IRoomTree) => {
            const room = tree.room || '';
            const id = tree.id || '';
            return {
                id,
                name: room
            }
        })
    }

    public getSelectedSite(site: string): ILocationTree {
        return this.locationPhysical.filter((tree: ILocationTree) => {
            return tree.site === site
        })[0];
    }

    public getSelectedBlock(location: ILocationTree, block: string): IBlockTree {
        return location.blocks.filter((tree: IBlockTree) => {
            return tree.block === block
        })[0];
    }

    public getSelectedRoom(block: IBlockTree, roomId: string): IRoomTree {
        return block.rooms.filter((tree: IRoomTree) => {
            return tree.id === roomId
        })[0];
    }

    public getVirtualMaxStudents () {
        return this.locationVirtual[0].blocks[0].rooms[0].maxStudents;
    }

}
