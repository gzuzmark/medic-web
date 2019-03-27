import * as React from "react";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {Heading3, LIGHT_TEXT} from "../../../../../common/MentorText";

interface IPropsRoomModalSuccess {
    success: boolean;
}

const RoomModalSuccess: React.FC<IPropsRoomModalSuccess> = (props) => {

    const reloadPage = () => {
        window.location.reload();
    };

    const onCloseModal = () => {
        window.location.assign('/admin/aulas');
    };

    return (
        <MentorModalBase show={props.success} onCloseModal={onCloseModal} >
            <ContentModal.Generic
                confirm={reloadPage}
                loading={false}
                generic={{
                    button: "Agregar otra aula",
                    image: <Icon name={'check-circle'} />,
                    title: <Heading3 style={{margin: '14px auto 22px auto'}} weight={LIGHT_TEXT}>El aula se creo con éxito.</Heading3>
                }} />
        </MentorModalBase>
    )
}

export default RoomModalSuccess;
