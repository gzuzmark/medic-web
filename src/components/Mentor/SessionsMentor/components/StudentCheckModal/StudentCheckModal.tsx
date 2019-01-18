import * as React from 'react';
import attened from '../../../../../assets/images/student_check_modal/attended.png';
import noAttened from '../../../../../assets/images/student_check_modal/no_attended.png';
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import Icon from "../../../../../common/Icon/Icon";
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
    description: string;
    button: string;
}

const getScreenData = (screen: string): IStudentCheckModalScreen => {
    let image = null;
    let title = '';
    let description = '';
    let button = '';
    if (screen === StudentCheckModalScreens.ATTENDED) {
        image = <img src={attened} />;
        title = '¿Estás seguro que deseas guardar la lista de asistencia?';
        description = 'Si seleccionas aceptar, luego no podrás modificar la(s) persona(s) marcada(s).';
        button = ' Aceptar';
    } else if (screen === StudentCheckModalScreens.NO_ATTENDED) {
        image = <img src={noAttened} />;
        title = 'Nadie se presentó';
        description = 'Al parecer los alumnos no se presentaron, por favor presiona aceptar para cerrar la lista.';
        button = ' Aceptar';
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

const StudentCheckModal: React.StatelessComponent<IPropsStudentCheckModalCard> = (props) => {
    const confirm = () => {
        props.confirm(props.options.screen)
    };

    const generic = getScreenData(props.options.screen);
    return props.options.screen === StudentCheckModalScreens.SUCCESS ?
        <ContentModal.Success description="Asistencia guardada"/> :
        <ContentModal.Generic generic={generic} loading={props.options.loading} confirm={confirm} />;
};

export default StudentCheckModal;
