import * as React from 'react';
import {Link} from "react-router-dom";
import * as ReactTooltip from 'react-tooltip';
import Icon from "../../../../../common/Icon/Icon";
import colors, {FONTS} from "../../../../../common/MentorColor";
import {Body1, LIGHT_TEXT, Small1, Subhead1} from '../../../../../common/MentorText';
import Utilities from "../../../../../common/Utils/Utilities";
import './StudentFullCard.scss';

export interface IStudentChecklistCard {
    checked: boolean;
    commented: boolean;
    code: string;
    id: string;
    name: string;
    new: boolean;
    photo: string;
    disabled: boolean;
    studentId: string;
    tags: string[];
    mentorComment: string;
    isEnabledForComment: boolean;
}

export interface IPropsStudentFullCard {
    student: IStudentChecklistCard;
    styles: React.CSSProperties;
    hideObservations?: boolean;
    showTagModal: () => void;
    updateSelection: () => void;
}

const StudentFullCard: React.FC<IPropsStudentFullCard> = (props) => {
    let propsInput = {};
    if (props.student.disabled) {
        propsInput = {
            disabled: true
        }
    }
    const iconId = props.student.commented ? 'eye' : 'pencil';
    const iconTooltip = props.student.commented ? 'Ver observación' : 'Añadir observación';
    return (
        <div className={`StudentFullCard ${props.student.new ? 'StudentFullCard--new': ''}`} style={{...props.styles}}>
            <ReactTooltip effect={"solid"} place={"left"} id={"StudentFullCardToolTip"}/>
            <div className={"StudentFullCard_left"}>
                <Link to={`/doctor/paciente/${props.student.studentId}`}>
                    <div className={"StudentFullCard_image-container u-ImageContainer"}>
                        <img src={props.student.photo}
                             title={"Estudiante"}
                             className={"StudentFullCard_image"}
                             onError={Utilities.onErrorStudentImage}/>
                    </div>
                </Link>
            </div>
            <div className={"StudentFullCard_right"}>
                <Link to={`/doctor/paciente/${props.student.studentId}`}>
                    <Subhead1 color={FONTS.medium}>{props.student.name}</Subhead1>
                    <Body1 color={FONTS.medium} weight={LIGHT_TEXT} >{props.student.code}</Body1>
                </Link>
            </div>
            {!props.hideObservations && (
                <div className={`StudentFullCard_option
                                StudentFullCard_option-comment
                                ${props.student.isEnabledForComment && 'StudentFullCard_option-comment--active'}`}>
                    {props.student.isEnabledForComment ?
                        <Icon name={iconId}
                            click={props.showTagModal}
                            attr={{"data-tip": iconTooltip, "data-for": "StudentFullCardToolTip"}}
                            style={{
                                cursor: 'pointer',
                                fill: colors.BACKGROUND_COLORS.background_green,
                                height: 24,
                                width: 24
                                }}/>:
                        <Icon name={iconId} style={{
                            fill: colors.MISC_COLORS.background_grey_2,
                            height: 24,
                            width: 24,
                        }}/>
                    }
                </div>
            )}
            {!props.hideObservations && (
                <div className={"StudentFullCard_option StudentFullCard_option--checkbox"}>
                    <input
                        className={"StudentFullCard_input"}
                        type={"checkbox"}
                        value={props.student.id}
                        id={`StudentFullCard${props.student.id}`}
                        checked={props.student.checked}
                        onChange={props.updateSelection}
                        {...propsInput}/>
                    <label
                        className="StudentFullCard_label"
                        htmlFor={`StudentFullCard${props.student.id}`}>&nbsp;</label>
                </div>
            )}
        </div>
    );
};

export const StudentFullCardHeader: React.FC<any> = ({ hideObservations = false }) => {
    return (
        <div className="StudentFullCard_header" style={{background: colors.BACKGROUND_COLORS.background_blue}}>
            <div className="StudentFullCard_header-column-1">
                <Small1 color={FONTS.blue}>Paciente en la sesión</Small1></div>
            <div className="StudentFullCard_header-column-2">
                {!hideObservations && <Small1 color={FONTS.blue}>Observaciones</Small1>}</div>
            <div className="StudentFullCard_header-column-3">
                {!hideObservations && <Small1 color={FONTS.blue}>Tomar asistencia</Small1>}</div>
        </div>
    )
}


export default StudentFullCard;
