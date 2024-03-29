import * as React from "react";
import styled from "styled-components";
import {ButtonNormal} from "../../../common/Buttons/Buttons";
import LoaderFullScreen from "../../../common/Loader/LoaderFullsScreen";
import colors, {FONTS} from "../../../common/MentorColor";
import {Body1} from "../../../common/MentorText";
import {IBlock} from "../../../domain/Blocks/Blocks";
import {IRoom} from "../../../domain/Room/Room";
import {ISites} from "../../../domain/Sites/Sites";
import RoomRepository, {IRoomRepository} from "../../../repository/RoomRepository";
import BlocksService from "../../../services/Block/Blocks.service";
import AccordionRooms, {buildBody, buildTitle} from "./components/AccordionRooms/AccordionRooms";
import HandlerCardRoom from "./components/HandlerCardRoom/HandlerCardRoom";
import ModalRoom from "./components/ModalRoom/ModalRoom";
import './Slides.scss';


const HeaderRoomContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 60px;
`;

const DescriptionContainer = styled.div`
    background: ${(props: {isEmpty: boolean}) => props.isEmpty ?  colors.BACKGROUND_COLORS.background_white : colors.MISC_COLORS.background_grey_1 };   
    border-radius: 8px;
    margin-top: 28px;
    min-height: 100px;
    padding: ${(props: {isEmpty: boolean}) => props.isEmpty ?  '0' : '16px'};
    position: relative;
`;

const DescriptionEmpty = styled.div`
    align-items: center;
    background: ${colors.BACKGROUND_COLORS.background_disabled_button}; 
    border-radius: 8px;
    display: flex;
    height: 56px;
    justify-content: center;
    width: 100%;
`;
const roomService = new BlocksService();

const RoomList: React.FC<{}> = () => {
    const [modal, setModal] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [selectedSite, setSelectedSite] = React.useState({} as ISites);
    const [selectedBlock, setSelectedBlock] = React.useState({} as IBlock);
    const [selectedRoom, setSelectedRoom] = React.useState({} as IRoom);
    const [blocks, setBlocks] = React.useState([] as IBlock[]);
    const [repository, setRepository] = React.useState({} as IRoomRepository);

    React.useEffect(() => {
        const repo = RoomRepository.addedRoomGet();
        if (repo) {
            setRepository(repo);
            if (repo.site === selectedSite.id) {
                RoomRepository.addedRoomClean();
            }
        }
    }, [selectedSite]);

    const loadSite = (site: ISites) => {
        setSelectedSite(site);
        setLoading(true);
        roomService.listBlocks(site.id).then((items: IBlock[]) => {
            setBlocks(items);
            setLoading(false);
        }).catch(() => {
            setBlocks([]);
            setLoading(false);
        })
    };

    const showModal = (block: IBlock) => {
        return (item: IRoom) => {
            setSelectedBlock(block);
            setSelectedRoom(item);
            setModal(true);
        };
    };

    const closeModal = () => setModal(false);

    return (
        <div className="u-LayoutMargin" style={{padding: '0 35px'}}>
            <ModalRoom modal={modal} closeModal={closeModal} room={selectedRoom} block={selectedBlock} site={selectedSite}/>
            <HeaderRoomContainer>
                <ButtonNormal text={"Crear nueva aula"} link={true} attrs={{href: '/admin/aulas/crear'}}/>
            </HeaderRoomContainer>
            <HandlerCardRoom click={loadSite} selectedSite={selectedSite} defaultSite={repository.site}/>
            <DescriptionContainer isEmpty={blocks.length === 0}>
                {loading && <LoaderFullScreen size={12} styleLoaderContainer={{margin: '15px auto auto auto'}}/>}
                {(!loading && blocks.length === 0) && <DescriptionEmpty><Body1 color={FONTS.light}>Aún no tienes direcciones</Body1></DescriptionEmpty>}
                {blocks.map((block: IBlock) => {
                    const repositoryRoom =  { action: repository.action, defaultRooms: repository.rooms};
                    return (
                        <AccordionRooms
                            key={block.id}
                            open={repository.blocks.indexOf(block.id) !== -1}
                            iconStyle={{right: 16}}
                            bodyStyle={{marginTop: 8, marginBottom: 21}}
                            headerStyle={{ marginBottom: 1}}
                            title={buildTitle(block)}
                            body={buildBody(
                                block.rooms || [] as IRoom[],
                                showModal(block),
                                repositoryRoom)}/>
                    )
                })}
            </DescriptionContainer>
        </div>
    )
};

export default RoomList;
