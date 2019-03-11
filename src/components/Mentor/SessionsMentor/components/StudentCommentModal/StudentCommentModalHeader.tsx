import * as React from 'react';
import colors from "../../../../../common/MentorColor";
import {Body1, Heading3, LIGHT_TEXT} from '../../../../../common/MentorText';
import Utilities from "../../../../../common/Utils/Utilities";
import {ITagModalStudentChecklistBoard} from "./StudentCommentModal";
import './StudentCommentModalHeader.scss';

export interface IPropsStudentCommentModalHeader {
    modal: ITagModalStudentChecklistBoard;
}


const StudentCommentModalHeader: React.FC<IPropsStudentCommentModalHeader> = (props) => {
    const isAddForm = props.modal.tags && props.modal.tags.every(tag => !!tag.id);

    return !!props.modal.student && (
        <div className={"StudentCommentModalHeader"}>
            <div className={"StudentCommentModalHeader_title"}>
                <div className={"StudentCommentModalHeader_message"}>
                    <Heading3>{isAddForm ? 'Escribe una observación sobre' : 'Escribiste una observación sobre'}</Heading3>
                </div>
            </div>
            <div className={"StudentCommentModalHeader_custom-width"}>
                <div className={"StudentCommentModalHeader_body-left"}>
                    <div className={"StudentCommentModalHeader_image-container u-ImageContainer"}
                         style={{borderColor: colors.MISC_COLORS.background_grey_2}}>
                        <img src={props.modal.student.photo}
                             title={"Estudiante"}
                             className={"StudentCommentModalHeader_image"}
                             onError={Utilities.onErrorStudentImage} />
                    </div>
                </div>
                <div className={"StudentCommentModalHeader_body-right"}>
                    <Body1>{props.modal.student.name}</Body1>
                    <Body1 weight={LIGHT_TEXT}>{props.modal.student.code}</Body1>
                </div>
            </div>
        </div>
    ) || null;
};

export default StudentCommentModalHeader;
