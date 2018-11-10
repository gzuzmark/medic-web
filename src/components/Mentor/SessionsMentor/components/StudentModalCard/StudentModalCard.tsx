import * as React from 'react';
import { Text2, Text3 } from '../../../../../common/ConsoleText';
import {IStudentChecklist} from "../../../../../domain/StudentChecklist/StudentChecklistBean";
import './StudentModalCard.scss';

interface IPropsStudentModalCard {
    user: IStudentChecklist;
    confirm(user: IStudentChecklist): void;
}


const StudentModalCard: React.StatelessComponent<IPropsStudentModalCard> = (props) => {

    const onClick = () => {
        props.confirm(props.user);
    };

    return (
        <div className={`StudentModalCard`}>
            <div className={"StudentModalCard_header"}>
                <div className={"StudentModalCard_pri-art"}>
                    <img src={props.user.student.photo} title={"Estudiante"} className={"StudentModalCard_image"} />
                </div>
            </div>
            <div className={"StudentModalCard_body"}>
                <div className={"StudentModalCard_body-left"}>
                    <div className={"StudentModalCard_image-container"}>
                        <img src={props.user.student.photo} title={"Estudiante"} className={"StudentModalCard_image"} />
                    </div>
                </div>
                <div className={"StudentModalCard_body-right"}>
                    <Text2>{props.user.student.name}</Text2>
                    <Text3>{props.user.student.code}</Text3>
                </div>
            </div>
            <div className={"StudentModalCard_footer"}>
                <button onClick={onClick}>Aceptar</button>
            </div>
        </div>
    );
};

export default StudentModalCard;
