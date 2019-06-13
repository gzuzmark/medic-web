import * as React from "react";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {Body1, LIGHT_TEXT} from "../../../../../common/MentorText";

interface IPropsRoomModalFail {
    show: boolean;
}

const RoomModalEditFail: React.FC<IPropsRoomModalFail> = (props) => {

    const reloadPage = () => {
        window.location.reload();
    };


    return (
        <MentorModalBase show={props.show} >
            <ContentModal.Generic
                loading={false}
                confirm={reloadPage}
                generic={{
                    button: "Entendido",
                    description: <Body1 style={{margin: '0'}} weight={LIGHT_TEXT}>Parece que ocurrió un error. Revisa los datos e inténtalo <br/> nuevamente.</Body1>,
                    image: <Icon name={'alert'} />,
                    title: "¡Uy! No se pudo editar el aula"
                }} />
        </MentorModalBase>
    )
};

export default RoomModalEditFail;
