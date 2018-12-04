import * as React from 'react';
import { Text2, Text3 } from '../../../../../common/ConsoleText';
import Utilities from "../../../../../common/Utilities";
import './StudentFullCard.scss';

export interface IStudentChecklistCard {
    checked: boolean;
    code: string;
    id: string;
    name: string;
    new: boolean;
    photo: string;
    disabled: boolean;
}

interface IPropsStudentFullCard {
    student: IStudentChecklistCard;
    styles: React.CSSProperties;
}

const StudentFullCard: React.StatelessComponent<IPropsStudentFullCard> = (props) => {
    let propsInput = {};
    if (props.student.disabled) {
        propsInput = {
            disabled: 'true'
        }
    }
    return (
        <div className={`StudentFullCard ${props.student.new ? 'StudentFullCard--new': ''}`} style={{...props.styles}}>
            <div className={"StudentFullCard_left"}>
                <div className={"StudentFullCard_image-container u-ImageContainer"}>
                    <img src={props.student.photo}
                         title={"Estudiante"}
                         className={"StudentFullCard_image"}
                         onError={Utilities.onErrorStudentImage}/>
                </div>
            </div>
            <div className={"StudentFullCard_right"}>
                <Text2>{props.student.name}</Text2>
                <Text3>{props.student.code}</Text3>
            </div>
            <div className={"StudentFullCard_checkbox"}>
                <input
                    className={"StudentFullCard_input"}
                    type={"checkbox"}
                    value={props.student.id}
                    id={`StudentFullCard${props.student.id}`}
                    defaultChecked={props.student.checked}
                    {...propsInput}/>
                <label
                    className="StudentFullCard_label"
                    htmlFor={`StudentFullCard${props.student.id}`}>&nbsp;</label>
            </div>
        </div>
    );
};

export default StudentFullCard;
