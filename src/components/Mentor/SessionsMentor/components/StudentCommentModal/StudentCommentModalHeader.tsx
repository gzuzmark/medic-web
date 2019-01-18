import * as React from 'react';
import colors from "../../../../../common/MentorColor";
import {Body1, Heading3, LIGHT_TEXT} from '../../../../../common/MentorText';
import Utilities from "../../../../../common/Utilities";
import {IStudentChecklistCard} from "../StudentFullCard/StudentFullCard";
import './StudentCommentModalHeader.scss';

export interface IPropsStudentCommentModalHeader {
    student: IStudentChecklistCard;
}


const StudentCommentModalHeader: React.StatelessComponent<IPropsStudentCommentModalHeader> = (props) => {
    return !!props.student && (
        <div className={"StudentCommentModalHeader"}>
            <div className={"StudentCommentModalHeader_title"}>
                <div className={"StudentCommentModalHeader_message"}>
                    <Heading3>Escribe una observación sobre</Heading3>
                </div>
            </div>
            <div className={"StudentCommentModalHeader_custom-width"}>
                <div className={"StudentCommentModalHeader_body-left"}>
                    <div className={"StudentCommentModalHeader_image-container u-ImageContainer"}
                         style={{borderColor: colors.MISC_COLORS.background_grey_2}}>
                        <img src={props.student.photo}
                             title={"Estudiante"}
                             className={"StudentCommentModalHeader_image"}
                             onError={Utilities.onErrorStudentImage} />
                    </div>
                </div>
                <div className={"StudentCommentModalHeader_body-right"}>
                    <Body1>{props.student.name}</Body1>
                    <Body1 weight={LIGHT_TEXT}>{props.student.code}</Body1>
                </div>
            </div>
        </div>
    ) || null;
};

export default StudentCommentModalHeader;
