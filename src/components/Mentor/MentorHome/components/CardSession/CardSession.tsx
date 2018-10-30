import * as React from 'react';
import { SmallText1, Text1, Text2, Text3, TextBold1, TextBold3 } from '../../../../../common/ConsoleText';
import Icon from "../../../../../common/Icon/Icon";
import {SessionMentorBean} from "../../../../../domain/Session/SessionMentorBean";
import './CardSession.scss';

interface IPropsCardSession {
    item: SessionMentorBean;
}


const CardSession: React.StatelessComponent<IPropsCardSession> = (props) => {
    return (
        <div className={`CardSession`}>
            <div>
                <div><Icon name={"calendar"}/></div>
                <SmallText1>{props.item.session.location && props.item.session.location.typeLabel}</SmallText1>
                <TextBold1>{props.item.getTime()}</TextBold1>
            </div>
            <div>
                <Text2>Sesión en curso</Text2>
                <Text1>{props.item.session.skill && props.item.session.skill.name}</Text1>
                <TextBold3>{props.item.getAvailability()}</TextBold3>
                <Text3>{props.item.session.location && props.item.session.location.location && props.item.session.location.location.location}</Text3>
            </div>
        </div>
    );
};

export default CardSession;


