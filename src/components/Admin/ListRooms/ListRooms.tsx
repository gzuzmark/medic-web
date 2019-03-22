import * as React from "react";
import styled from "styled-components";
import roomActive from '../../../assets/images/room_active.png';
import roomInactive from '../../../assets/images/room_inactive.png';
import {ButtonNormal} from "../../../common/Buttons/Buttons";
import Card from "../../../common/Card/Card";
import colors from "../../../common/MentorColor";
import {Heading3} from "../../../common/MentorText";
import {CARD_STATUS} from "../../../domain/Card";
import {ISites} from "../../../domain/Sites/Sites";
import SitesService from "../../../services/Sites/Sites.service";
import AccordionRooms, {buildBody, buildTitle} from "./AccordionRooms/AccordionRooms";
import ModalRoom from "./ModalRoom/ModalRoom";

const CardRoom = styled(Card)`
    height: 108px;
    width: 295px;
`;

const CardRoomContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const HeaderRoomContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 60px;
`;

const DescriptionContainer = styled.div`
    background: ${colors.MISC_COLORS.background_grey_1};  
    border-radius: 8px;
    margin-top: 28px;
    padding: 16px;
`;

const RoomText = styled(Heading3)`
    margin-top: 10px;
`;

interface IPropsHandlerCardRoom {
    click: (site: ISites) => void;
}

const HandlerCardRoom: React.FC<IPropsHandlerCardRoom> = (props) => {
    const [loading, setLoading] = React.useState(true);
    const [sites, setSites] = React.useState([] as ISites[]);
    const src = roomActive || roomInactive;
    React.useEffect(() => {
        const sitesService = new SitesService();
        sitesService.list().then((items: ISites[]) => {
            setSites(items);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    });

    const selectSite = (site: ISites) => {
        return () => {
            props.click(site);
        };
    }
    return (
        <CardRoomContainer>
            {loading && ["1", "2", "3", "4"].map((item) => (
                <CardRoom status={CARD_STATUS.DISABLED} key={item}>
                    <img src={roomInactive} width={24} />
                    <RoomText>&nbsp;</RoomText>
                </CardRoom>
            ))}
            {sites.map((site) => (
                <CardRoom status={CARD_STATUS.ACTIVE} click={selectSite(site)} key={site.id}>
                    <img src={src} width={24} />
                    <RoomText>{site.name}</RoomText>
                </CardRoom>
            ))}
        </CardRoomContainer>
    )
}

const ListRooms: React.FC<{}> = () => {
    const [modal, setModal] = React.useState(false);
    const [selectedSite, setSelectedSite] = React.useState('');
    const [selectedRoom, setSelectedRoom] = React.useState('');
    const loadSite = () => {
        alert(selectedSite);
        setSelectedSite('');
    };
    const showModal = (item: any) => {
        setModal(true);
        setSelectedRoom(item);
    };
    const closeModal = () => setModal(false);

    return (
        <div className="u-LayoutMargin" style={{padding: '0 35px'}}>
            <ModalRoom modal={modal} closeModal={closeModal} selectedRoom={selectedRoom}/>
            <HeaderRoomContainer>
                <ButtonNormal text={"Crear nueva aula"}/>
            </HeaderRoomContainer>
            <HandlerCardRoom click={loadSite} />
            <DescriptionContainer>
                <AccordionRooms
                    iconStyle={{right: 16}}
                    bodyStyle={{marginTop: 8, marginBottom: 21}}
                    headerStyle={{ marginBottom: 1}}
                    title={buildTitle()}
                    body={buildBody("modal", showModal)}/>
                <AccordionRooms
                    iconStyle={{right: 16}}
                    bodyStyle={{marginTop: 8, marginBottom: 21}}
                    headerStyle={{ marginBottom: 1}}
                    title={buildTitle()}
                    body={buildBody("modal 2", showModal)}/>
                <AccordionRooms
                    iconStyle={{right: 16}}
                    bodyStyle={{marginTop: 8, marginBottom: 21}}
                    headerStyle={{ marginBottom: 1}}
                    title={buildTitle()}
                    body={buildBody("modal 3", showModal)}/>
            </DescriptionContainer>
        </div>
    )
};

export default ListRooms;
