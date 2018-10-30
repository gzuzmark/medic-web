import * as React from 'react';
import { SmallText1, Text1, Text2, Text3, TextBold1, TextBold3 } from '../../../../../common/ConsoleText';
import Icon from "../../../../../common/Icon/Icon";
import {MomentDateParser} from "../../../../../domain/DateManager/MomentDateParser";
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import './CardSession.scss';

interface IPropsCardSession {
    item: SessionMentorBean;
}


const CardSession: React.StatelessComponent<IPropsCardSession> = (props) => {

    return (
        <div className={`CardSession CardSession--${props.item.getStatus()}`}>
            <div className={"CardSession_aside"}>
                <div className={"CardSession_icon"}>
                    <Icon name={"calendar"}/>
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
                    <Text3>{props.item.session.location && props.item.session.location.location && props.item.session.location.location.location}</Text3>
                </div>
            </div>
        </div>
    );
};

export default CardSession;


