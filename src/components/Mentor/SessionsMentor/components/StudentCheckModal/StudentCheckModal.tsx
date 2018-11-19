import * as React from 'react';
import attened from '../../../../../assets/images/student_check_modal/attended.png';
import noAttened from '../../../../../assets/images/student_check_modal/no_attended.png';
import { Text3, TextBold1 } from '../../../../../common/ConsoleText';
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

    const onClick = () => {
        props.confirm(props.options.screen);
    };

    let propsButton = {};
    if (props.options.loading) {
        propsButton = {
            disabled: "true",
            loading: "true"
        }
    }
    const screenData = getScreenData(props.options.screen);
    return (
        <div className={`StudentCheckModalCard`}>
            <div className={"StudentCheckModalCard_header"}>
                {screenData.image}
            </div>
            <div className={"StudentCheckModalCard_body"}>
                <div className={"StudentCheckModalCard_custom-width"}>
                    {
                        !!screenData.title &&
                        <div className={"StudentCheckModalCard_title"}>
                            <TextBold1>{screenData.title}</TextBold1>
                        </div>
                    }
                    {
                        !!screenData.description &&
                        <div className={"StudentCheckModalCard_description"}>
                            <Text3>{screenData.description}</Text3>
                        </div>
                    }
                </div>
            </div>
            {
                !!screenData.button &&
                <div className={"StudentCheckModalCard_footer"}>
                    <button onClick={onClick}
                            className="StudentCheckModalCard_button u-Button"
                            {...propsButton}
                    >{screenData.button}</button>
                </div>
            }
        </div>
    )
};

export default StudentCheckModal;
