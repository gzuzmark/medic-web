import * as React from 'react';
import { Text2, Text3 } from '../../../../../common/ConsoleText';
import './StudentFullCard.scss';

export interface IStudentChecklistCard {
    checked: boolean;
    code: string;
    id: string;
    name: string;
    new: boolean;
    photo: string;
}

interface IPropsStudentFullCard {
    student: IStudentChecklistCard;
    styles: React.CSSProperties;
}

const StudentFullCard: React.StatelessComponent<IPropsStudentFullCard> = (props) => {
    return (
        <div className={`StudentFullCard ${props.student.new ? 'StudentFullCard--new': ''}`} style={{...props.styles}}>
            <div className={"StudentFullCard_left"}>
                <div className={"StudentFullCard_image-container"}>
                    <img src={props.student.photo} title={"Estudiante"} className={"StudentFullCard_image"} />
                </div>
            </div>
            <div className={"StudentFullCard_right"}>
                <Text2>{props.student.name}</Text2>
                <Text3>{props.student.code}</Text3>
            </div>
        </div>
    );
};

export default StudentFullCard;
