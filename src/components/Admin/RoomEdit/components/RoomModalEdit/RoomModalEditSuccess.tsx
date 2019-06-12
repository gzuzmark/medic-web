import * as React from "react";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {Heading3, LIGHT_TEXT} from "../../../../../common/MentorText";

interface IPropsRoomModalSuccess {
    show: boolean;
}

const RoomModalEditSuccess: React.FC<IPropsRoomModalSuccess> = (props) => {

    const onCloseModal = () => {
        window.location.assign('/admin/aulas');
    };

    return (
        <MentorModalBase show={props.show} onCloseModal={onCloseModal} >
            <ContentModal.Generic
                loading={false}
                generic={{
                    description: <Heading3 style={{margin: '14px auto 22px auto'}} weight={LIGHT_TEXT}>¡Listo! El aula se editó con éxito.</Heading3>,
                    image: <Icon name={'check-circle'} />
                }} />
        </MentorModalBase>
    )
};

export default RoomModalEditSuccess;
