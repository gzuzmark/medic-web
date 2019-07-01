import * as React from "react";
import styled from "styled-components";
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import colors, {FONTS} from "../../../../../common/MentorColor";
import {LIGHT_TEXT, Small2, Subhead1} from "../../../../../common/MentorText";
import {STATUS_NEW} from "../../../../../domain/Area/const";
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

const ButtonsContainer = styled.div`
    display: flex;
    padding: 38px 0 0 0;
    justify-content: center;
    width: 100%;
`;

const areaService = new InterestAreaService();

const sortAreaByName = (a: IArea, b: IArea) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
};

const ModalRoom: React.FC<IPropsModalRoom> = (props) => {
    const [areas, setAreas] = React.useState([] as IArea[]);
    React.useEffect(() => {
        areaService.listAreas('all').then((items: IArea[]) => {
            setAreas(items);
        })
    }, [0]);

    const getArea = (id: any): IArea => {
        const area = areas.find((a) => a.id === id);
        return area || {} as IArea;
    };

    const getOrderedAreas = (ids: string[]) => {
        const areasList = ids.map(id => getArea(id));
        const areasNew = areasList.filter((area) => area.status === STATUS_NEW);
        const areasPublished = areasList.filter((area) => area.status !== STATUS_NEW);
        areasNew.sort(sortAreaByName);
        areasPublished.sort(sortAreaByName);
        return [...areasPublished, ...areasNew]
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
                        getOrderedAreas(props.room.interestAreasId).map((area, index) => (
                            <Small2 weight={LIGHT_TEXT} key={`area_index_${index}`}
                                    color={area.status === STATUS_NEW ? FONTS.disabled : FONTS.dark}>
                                {area.name}
                            </Small2>
                        )) :
                        <Small2 weight={LIGHT_TEXT}>No tiene áreas relacionadas</Small2>}
                </AreaContainer>
                <ButtonsContainer>
                    <ButtonNormal link={true} attrs={{href: `/admin/aulas/editar/${props.room.id}/${props.block.id}`}} text="Editar"/>
                </ButtonsContainer>
            </ModalRoomContainer>
        </MentorModalBase>
    )
}

export default ModalRoom;
