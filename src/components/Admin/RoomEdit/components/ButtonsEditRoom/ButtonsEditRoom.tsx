import * as React from "react";
import styled from "styled-components";
import {ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import RoomEditContext from "../../RoomEdit.context";

interface IPropsButtonEditRoom {
    onSubmit: (e: any) => void;
}

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 40px auto;
`;

const ButtonsEditRoom: React.FC<IPropsButtonEditRoom> = (props) => {
    const [modal, setModal] = React.useState(false);
    const [valid, setValid] = React.useState(false);
    const [empty, setEmpty] = React.useState(true);
    const ctxt = React.useContext(RoomEditContext);

    React.useEffect(() => {
        const description = !ctxt.errors.description;
        const maxStudents = !ctxt.errors.maxStudents;
        const interestAreasId = !ctxt.errors.interestAreasId;
        setValid(description && maxStudents && interestAreasId && !ctxt.isRepeated && ctxt.values.interestAreasId.length > 0);
    }, [ctxt.errors, ctxt.touched, ctxt.values, ctxt.isRepeated]);

    React.useEffect(() => {
        const description = !!ctxt.values.description.length;
        const maxStudents = ctxt.values.maxStudents !== 1;
        const interestAreasId = !!ctxt.values.interestAreasId.length;
        const block = !!ctxt.values.block.length;
        const site = !!ctxt.values.site.length;
        setEmpty(!(description || maxStudents || interestAreasId || block || site));
    }, [ctxt.values]);

    const goToListRoom = () => {
        window.location.assign('/admin/aulas')
    };

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    return (
        <React.Fragment>
            <ButtonsContainer>
                <MentorModalBase show={modal} onCloseModal={closeModal}>
                    <ContentModal.Generic
                        loading={false}
                        confirm={goToListRoom}
                        generic={{
                            button: "Sí, cancelar",
                            description: "Si cancelas, perderás todos los datos ingresados",
                            image: <Icon name={'alert'} />,
                            title: "¿Seguro que deseas cancelar?"
                        }} />
                </MentorModalBase>
                <ButtonNormal text={"Cancelar"}
                              attrs={{
                                  onClick: empty ? goToListRoom : openModal,
                                  style: {marginLeft: 24, width: 150},
                                  type: "button",
                              }}
                              type={THEME_SECONDARY}/>
                <ButtonNormal text={"Guardar Cambios"}
                              attrs={{
                                  disabled: !valid,
                                  onClick: props.onSubmit,
                                  style: {marginLeft: 24, width: 150},
                                  type: "button"
                              }}/>
            </ButtonsContainer>
        </React.Fragment>
    )
}

export default ButtonsEditRoom;
