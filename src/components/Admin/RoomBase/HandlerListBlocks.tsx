import * as React from "react";
import {IBlock} from "../../../domain/Blocks/Blocks";
import BlocksService from "../../../services/Block/Blocks.service";

interface IPropsHandlerListBlocks {
    blocks: IBlock[];
    loadingBlocks: boolean;
}

const blocksService = new BlocksService();

const HandlerListBlocks = (id: string): IPropsHandlerListBlocks => {
    const [blocks, setBlocks] = React.useState([] as IBlock[]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (id) {
            setLoading(true);
            blocksService.listBlocks(id).then((response: IBlock[]) => {
                setBlocks(response);
                setLoading(false);
            })
        }
    }, [id]);
    return {blocks, loadingBlocks: loading }
};

export default HandlerListBlocks;
