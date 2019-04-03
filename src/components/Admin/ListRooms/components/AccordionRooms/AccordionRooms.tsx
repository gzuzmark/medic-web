import * as React from "react";
import styled from "styled-components";
import Accordion from "../../../../../common/Accordion/Accordion";
import colors, {FONTS} from "../../../../../common/MentorColor";
import {Body1, LIGHT_TEXT, Small2, Subhead1} from "../../../../../common/MentorText";
import {IBlock} from "../../../../../domain/Blocks/Blocks";
import {IRoom} from "../../../../../domain/Room/Room";

const AccordionHeader = styled.div`
    align-items: center;
    display: flex;
    height: 50px;
    padding: 0 16px;
`;

const AccordionOrnament = styled.div`
    border: 1px solid ${colors.MISC_COLORS.background_grey_2};
    color: ${colors.MISC_COLORS.background_grey_2};
    height: 13px;
    line-height: 10px;
    margin: 0 24px 0 0;
    text-align: center;
    width: 13px;
    vertical-align: middle;
`;

interface IRoomStyled {
    empty: boolean;
    isNew: boolean;
}

const RoomStyled = styled.div`
    align-items: center;
    background: ${(props: IRoomStyled) => {
        return props.empty ? colors.BACKGROUND_COLORS.background_disabled_button : colors.BACKGROUND_COLORS.background_white
    }};
    border-bottom: 1px solid ${colors.MISC_COLORS.background_grey_1};
    border-right: 1px solid ${colors.MISC_COLORS.background_grey_1};
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 50px;
    justify-content: center;
    order: ${(props: IRoomStyled) => props.isNew ? '-1' : 'initial'}
    padding: 0 6px;
    width: 98px;
    &:hover {
        background: ${(props: IRoomStyled) => props.empty ? colors.BACKGROUND_COLORS.background_disabled_button : colors.MISC_COLORS.background_grey_1}; 
    }
`;

const RoomContainer = styled.div`
    border-left: 1px solid ${colors.MISC_COLORS.background_grey_1};
    border-top: 1px solid ${colors.MISC_COLORS.background_grey_1};
    display: ${(props: {empty: boolean}) => props.empty ? 'inline-flex' : 'flex'};
    flex-wrap: wrap;
    margin-right: 1px;
`;

const AccordionRooms = styled(Accordion)`
    & > div {
        background: ${colors.BACKGROUND_COLORS.background_white}
    }
`;

const EmptyRooms = styled.div`
    background: ${colors.BACKGROUND_COLORS.background_disabled_button};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
`;

const RoomName = styled(Small2)`
    text-align: center;
    word-break: break-word;
`;

const AccordionTitle = styled(Subhead1)`
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    width: 90%;
    word-break: break-word;
`

export const buildTitle = (block: IBlock) => {
    return (
        <AccordionHeader>
            <AccordionOrnament>-</AccordionOrnament>
            <AccordionTitle>{block.address} ({block.name})</AccordionTitle>
        </AccordionHeader>)
}

const LIMIT_NAME_ROOM = 25;

export const buildBody = (rooms: IRoom[], click: (r: IRoom) => void, defaultRooms: string[]) => {
    const onClick = (r: IRoom) => {
        return () => click(r);
    };
    const empty = rooms.length % 12 !== 0 ? (rooms.length % 12 - 12) * -1 : 0;
    return(
        <RoomContainer empty={!!rooms.length}>
            {rooms.length === 0 && <EmptyRooms><Body1 color={FONTS.light}>Aún no hay aulas</Body1></EmptyRooms>}
            {rooms.map((room) => (
                <RoomStyled onClick={onClick(room)} empty={false} key={room.id} isNew={defaultRooms.indexOf(room.id) !== -1}>
                    <RoomName weight={LIGHT_TEXT} color={FONTS.medium} >
                        {room.description.length > LIMIT_NAME_ROOM ?
                            `${room.description.substring(0, LIMIT_NAME_ROOM)}...` :
                            room.description}
                    </RoomName>
                </RoomStyled>
            ))}
            {Array.apply(null, Array(empty)).map((n: any, index: number) => (
                <RoomStyled empty={true} key={`NullRoom_${index}`} isNew={false}>
                    &nbsp;
                </RoomStyled>
            ))}
        </RoomContainer>)
}

export default AccordionRooms;
