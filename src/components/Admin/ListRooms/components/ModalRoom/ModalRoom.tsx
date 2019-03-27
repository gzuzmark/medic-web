import * as React from "react";
import styled from "styled-components";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import colors from "../../../../../common/MentorColor";
import {LIGHT_TEXT, Small2, Subhead1} from "../../../../../common/MentorText";
import {IBlock} from "../../../../../domain/Blocks/Blocks";
import {IRoom} from "../../../../../domain/Room/Room";
import {ISites} from "../../../../../domain/Sites/Sites";
import {IArea} from "../../../../../interfaces/Mentor.interface";
import InterestAreaService from "../../../../../services/InterestArea/InterestArea.service";

export interface IPropsModalRoom {
    modal: boolean;
    closeModal: () => void;
    block: IBlock;
    site: ISites;
    room: IRoom;
}

const ModalRoomContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const AreaContainer = styled.div`
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

const areaService = new InterestAreaService();

const ModalRoom: React.FC<IPropsModalRoom> = (props) => {
    const [areas, setAreas] = React.useState([] as IArea[]);
    React.useEffect(() => {
        areaService.listAreas().then((items: IArea[]) => {
            setAreas(items);
        })
    }, [0]);

    const getNameArea = (id: any): string => {
        let name = '';
        const area = areas.find((a) => a.id === id);
        if (area) {
            name = area.name
        }
        return name;
    };

    return (
        <MentorModalBase
            show={props.modal}
            closeOnOverlayClick={true}
            closeOnEsc={true}
            onCloseModal={props.closeModal}
            styles={{minHeight: 'auto', minWidth: 400, width: 'auto'}}>
            <ModalRoomContainer>
                <Subhead1>{props.room.description}</Subhead1>
                <Direction weight={LIGHT_TEXT}>{props.block.address} {props.site.name}</Direction>
                <SkillTitle>Áreas de Interés relacionadas:</SkillTitle>
                <AreaContainer>
                    {props.room.interestAreasId ?
                        props.room.interestAreasId.map((id: string) => (
                            <Small2 weight={LIGHT_TEXT} key={id}>{getNameArea(id)}</Small2>
                        )) :
                        <Small2 weight={LIGHT_TEXT}>No tiene áreas relacionadas</Small2>}
                </AreaContainer>
            </ModalRoomContainer>
        </MentorModalBase>
    )
}

export default ModalRoom;
