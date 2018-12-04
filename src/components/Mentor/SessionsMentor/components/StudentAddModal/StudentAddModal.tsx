import * as React from 'react';
import { Text2, Text3, TextBold1 } from '../../../../../common/ConsoleText';
import Utilities from "../../../../../common/Utilities";
import {IStudentChecklist} from "../../../../../domain/StudentChecklist/StudentChecklistBean";
import './StudentAddModal.scss';


export interface IStudentModal {
    message: string;
    user?: IStudentChecklist | null;
    loading: boolean;
}

interface IPropsStudentModalCard {
    options: IStudentModal;
    confirm(user: IStudentChecklist): void;
}


const StudentAddModal: React.StatelessComponent<IPropsStudentModalCard> = (props) => {

    const onClick = () => {
        if (props.options.user) {
            props.confirm(props.options.user);
        }
    };

    let propsButton = {};
    if (props.options.loading) {
        propsButton = {
            disabled: "true",
            loading: "true"
        }
    }
    return !!props.options.user && (
        <div className={`StudentModalCard`}>
            <div className={"StudentModalCard_body"}>
                <div className={"StudentModalCard_message"}>
                    <TextBold1>{props.options.message}</TextBold1>
                </div>
            </div>
            <div className={"StudentModalCard_custom-width"}>
                <div className={"StudentModalCard_body-left"}>
                    <div className={"StudentModalCard_image-container u-ImageContainer"}>
                        <img src={props.options.user.student.photo}
                             title={"Estudiante"}
                             className={"StudentModalCard_image"}
                             onError={Utilities.onErrorStudentImage} />
                    </div>
                </div>
                <div className={"StudentModalCard_body-right"}>
                    <Text2>{props.options.user.student.name}</Text2>
                    <Text3>{props.options.user.student.code}</Text3>
                </div>
            </div>
            <div className={"StudentModalCard_footer"}>
                <button onClick={onClick}
                        className="StudentModalCard_button u-Button"
                        {...propsButton}
                >Aceptar</button>
            </div>
        </div>
    ) || null;
};

export default StudentAddModal;
