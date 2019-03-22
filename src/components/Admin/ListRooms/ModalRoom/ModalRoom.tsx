import * as React from "react";
import styled from "styled-components";
import MentorModalBase from "../../../../common/ConsoleModal/MentorModalBase";
import colors from "../../../../common/MentorColor";
import {LIGHT_TEXT, Small2, Subhead1} from "../../../../common/MentorText";

export interface IPropsModalRoom {
    modal: boolean;
    closeModal: () => void;
    selectedRoom: any;
}

const ModalRoomContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const SkillContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const Direction = styled(Small2)`
    border-bottom: 1px solid ${colors.MISC_COLORS.background_grey_2};
    margin-top: 10px;
    padding-bottom: 9px;
`;

const SkillTitle = styled(Small2)`
    margin: 8px 0;
`;

const ModalRoom: React.FC<IPropsModalRoom> = (props) => {
    return (
        <MentorModalBase show={props.modal} onCloseModal={props.closeModal} styles={{minHeight: 220, minWidth: 400, width: 'auto'}}>
            <ModalRoomContainer>
                <Subhead1>{props.selectedRoom}</Subhead1>
                <Direction weight={LIGHT_TEXT}>Av. Petit Thouars 118. Lima-Centro</Direction>
                <SkillTitle>Áreas de Interés relacionadas:</SkillTitle>
                <SkillContainer>
                    <Small2 weight={LIGHT_TEXT}>Av. Petit Thouars 118. Lima-Centro</Small2>
                    <Small2 weight={LIGHT_TEXT}>Av. Petit Thouars 118. Lima-Centro</Small2>
                    <Small2 weight={LIGHT_TEXT}>Av. Petit Thouars 118. Lima-Centro</Small2>
                </SkillContainer>
            </ModalRoomContainer>
        </MentorModalBase>
    )
}

export default ModalRoom;
