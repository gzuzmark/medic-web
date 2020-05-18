import * as React from 'react';
import attened from '../../../../../assets/images/student_check_modal/attended.png';
import noAttened from '../../../../../assets/images/student_check_modal/no_attended.png';
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import Icon from "../../../../../common/Icon/Icon";
import {Body1, LIGHT_TEXT} from "../../../../../common/MentorText";
import './StudentCheckModal.scss';


export const StudentCheckModalScreens= {
    ATTENDED: 'attended',
    NO_ATTENDED: 'no_attended',
    SUCCESS: 'success'
};

export interface IStudentCheckModal {
    loading: boolean;
    screen: string;
}

interface IPropsStudentCheckModalCard {
    options: IStudentCheckModal;
    confirm(screen: string): void;
}

interface IStudentCheckModalScreen {
    image: JSX.Element | null;
    title: string;
    description: JSX.Element | string;
    button: string;
}

const getScreenData = (screen: string): IStudentCheckModalScreen => {
    let image = null;
    let title = '';
    let description: string | JSX.Element= '';
    let button = '';
    if (screen === StudentCheckModalScreens.ATTENDED) {
        image = <img src={attened} />;
        title = '¿Estás seguro que deseas guardar la lista de asistencia?';
        description = 'Si seleccionas guardar, luego no podrás modificar la(s) persona(s) marcada(s).';
        button = ' Guardar';
    } else if (screen === StudentCheckModalScreens.NO_ATTENDED) {
        image = <img src={noAttened} />;
        title = 'Nadie se presentó';
        description = <Body1 weight={LIGHT_TEXT} style={{margin: '0 auto'}}>
            Al parecer el/los paciente(s) no se presentaron, por favor presiona confirmar para <br/> cerrar la lista.</Body1>;
        button = ' Confirmar';
    } else if (screen === StudentCheckModalScreens.SUCCESS) {
        image = <Icon name={'check-circle'} style={{marginTop: 20}}/>;
        title = '¡Listo!';
        description = 'Asistencia guardada';
    }
    return {
        button,
        description,
        image,
        title
    }
};

const StudentCheckModal: React.FC<IPropsStudentCheckModalCard> = (props) => {
    const confirm = () => {
        props.confirm(props.options.screen)
    };

    const generic = getScreenData(props.options.screen);
    return props.options.screen === StudentCheckModalScreens.SUCCESS ?
        <ContentModal.Success description="Asistencia guardada"/> :
        <ContentModal.Generic generic={generic} loading={props.options.loading} confirm={confirm} />;
};

export default StudentCheckModal;
