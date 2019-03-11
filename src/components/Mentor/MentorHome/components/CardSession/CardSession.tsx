import * as React from 'react';
import { SmallText1, Text1, Text2, Text3, TextBold1, TextBold3 } from '../../../../../common/ConsoleText';
import Icon from "../../../../../common/Icon/Icon";
import {MomentDateParser} from "../../../../../domain/DateManager/MomentDateParser";
import {SESSION_LIFE} from "../../../../../domain/Session/SessionBean";
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import './CardSession.scss';

export interface IPropsCardSession {
    item: SessionMentorBean;
    link: string;
}


const CardSession: React.FC<IPropsCardSession> = (props) => {

    return (
        <div className={`CardSession CardSession--${props.item.getStatus()}`}>
            <div className={"CardSession_aside"}>
                <div className={"CardSession_icon"}>
                    <Icon name={"calendar-check"}/>
                </div>
                <div className={"CardSession_aside-description"}>
                    <SmallText1>{props.item.session.location && props.item.session.location.typeLabel}</SmallText1>
                </div>
                <div className={"CardSession_aside-main"}>
                    <TextBold1>{props.item.getTime(new MomentDateParser())}</TextBold1>
                </div>
            </div>
            <div className={"CardSession_body"}>
                <div className={"CardSession_body-flag"}>
                    <Text2>Sesión en curso</Text2>
                </div>
                <div className={"CardSession_body-main"}>
                    <Text1>{props.item.session.skill && props.item.session.skill.name}</Text1>
                </div>
                <div className={"CardSession_body-sub-main"}>
                    <TextBold3>{props.item.getAvailability()}</TextBold3>
                </div>
                <div className={"CardSession_body-bottom"}>
                    {props.item.isVirtual() ?
                        <a className={"CardSession_location"} href={props.item.getLocation()} target="_blank">
                            <Text3>{props.item.getLocation()}</Text3>
                        </a>:
                        <span className={"CardSession_location"}>
                            <Text3>{props.item.getLocation()}</Text3>
                        </span>
                    }
                </div>
            </div>
            <div className={"CardSession_options"}>
                {
                    props.item.getStatus() === SESSION_LIFE.PENDING &&
                    <a href={props.link} className={"CardSession_options-button"}>
                        <Icon name={"users"}/>
                        <TextBold3>Ver alumnos</TextBold3>
                    </a>
                }
                {
                    props.item.getStatus() === SESSION_LIFE.ACTIVE &&
                    <a href={props.link} className={"CardSession_options-button"}>
                        <Icon name={"paper-pencil"}/>
                        <TextBold3>Tomar asistencia</TextBold3>
                    </a>
                }
                {
                    props.item.getStatus() === SESSION_LIFE.RESOLVE &&
                    <a href={props.link} className={"CardSession_options-button"}>
                        <Icon name={"paper-pencil"}/>
                        <TextBold3>Editar asistencia</TextBold3>
                    </a>
                }
            </div>
        </div>
    );
};

export default CardSession;


