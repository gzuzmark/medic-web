import * as React from 'react';
import { SmallText1, Text1, Text2, Text3, TextBold1, TextBold3 } from '../../../../../common/ConsoleText';
import Icon from "../../../../../common/Icon/Icon";
import {MomentDateParser} from "../../../../../domain/DateManager/MomentDateParser";
import {SESSION_LIFE} from "../../../../../domain/Session/SessionBean";
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import './CardSession.scss';

interface IPropsCardSession {
    item: SessionMentorBean;
    click: () => void;
}


const CardSession: React.StatelessComponent<IPropsCardSession> = (props) => {

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
                        <a className={"CardSession_link"} href={props.item.getLocation()} target="_blank">
                            <Text3>{props.item.getLocation()}</Text3>
                        </a>:
                        <Text3>{props.item.getLocation()}</Text3>
                    }
                </div>
            </div>
            <div className={"CardSession_options"}>
                {
                    props.item.getStatus() === SESSION_LIFE.PENDING &&
                    <button className={"CardSession_options-button"} onClick={props.click}>
                        <Icon name={"users"}/>
                        <TextBold3>Ver alumnos</TextBold3>
                    </button>
                }
                {
                    props.item.getStatus() === SESSION_LIFE.ACTIVE &&
                    <button className={"CardSession_options-button"} onClick={props.click}>
                        <Icon name={"paper-pencil"}/>
                        <TextBold3>Tomar asistencia</TextBold3>
                    </button>
                }
                {
                    props.item.getStatus() === SESSION_LIFE.RESOLVE &&
                    <button className={"CardSession_options-button"} onClick={props.click}>
                        <Icon name={"paper-pencil"}/>
                        <TextBold3>Editar asistencia</TextBold3>
                    </button>
                }
            </div>
        </div>
    );
};

export default CardSession;


