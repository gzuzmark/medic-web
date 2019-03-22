import * as React from "react";
import styled from "styled-components";
import Accordion from "../../../../common/Accordion/Accordion";
import colors, {FONTS} from "../../../../common/MentorColor";
import {LIGHT_TEXT, Small2, Subhead1} from "../../../../common/MentorText";

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

const RoomStyled = styled.div`
    align-items: center;
    background: ${colors.BACKGROUND_COLORS.background_white};
    border-bottom: 1px solid ${colors.MISC_COLORS.background_grey_1};
    border-right: 1px solid ${colors.MISC_COLORS.background_grey_1};
    box-sizing: content-box;
    cursor: pointer;
    display: flex;
    height: 50px;
    justify-content: center;
    width: 97px;
    &:hover {
        background: ${colors.MISC_COLORS.background_grey_1};
    }
`;

const RoomContainer = styled.div`
    border-left: 1px solid ${colors.MISC_COLORS.background_grey_1};
    border-top: 1px solid ${colors.MISC_COLORS.background_grey_1};
    display: inline-flex;
    flex-wrap: wrap;
    margin-right: 1px;
`;

const AccordionRooms = styled(Accordion)`
    & > div {
        background: ${colors.BACKGROUND_COLORS.background_white}
    }
`;

export const buildTitle = () => {
    return (
        <AccordionHeader>
            <AccordionOrnament>-</AccordionOrnament>
            <Subhead1>Avenida Arequipa #2345</Subhead1>
        </AccordionHeader>)
}

export const buildBody = (item: any, click: (i: any) => void) => {
    const onClick = () => click(item);
    return (
        <RoomContainer>
            <RoomStyled onClick={onClick}>
                <Small2 weight={LIGHT_TEXT} color={FONTS.medium}>A2938</Small2>
            </RoomStyled>
        </RoomContainer>)
}

export default AccordionRooms;
