import * as React from "react";
import styled from "styled-components";
import roomActive from '../../../assets/images/room_active.png';
import roomInactive from '../../../assets/images/room_inactive.png';
import {ButtonNormal} from "../../../common/Buttons/Buttons";
import Card from "../../../common/Card/Card";
import colors from "../../../common/MentorColor";
import {Heading3} from "../../../common/MentorText";
import {STATUS_DAY_SESSIONS} from "../../../domain/Session/SessionCollector";
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

const ListRooms: React.FC<{}> = () => {
    const [modal, setModal] = React.useState(false);
    const [selectedRoom, setSelectedRoom] = React.useState('');
    const click = () => void(0);
    const src = roomActive || roomInactive;
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
            <CardRoomContainer>
                <CardRoom status={STATUS_DAY_SESSIONS.ACTIVE} click={click}>
                    <img src={src} width={24} />
                    <RoomText>LIMA NORTE</RoomText>
                </CardRoom>
                <CardRoom status={STATUS_DAY_SESSIONS.DEFAULT} click={click}>
                    <img src={roomInactive} width={24} />
                    <RoomText>LIMA CENTRO</RoomText>
                </CardRoom>
                <CardRoom status={STATUS_DAY_SESSIONS.DEFAULT} click={click}>
                    <img src={roomInactive} width={24}/>
                    <RoomText>LIMA SUR</RoomText>
                </CardRoom>
            </CardRoomContainer>
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
