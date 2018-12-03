import * as React from 'react';
import { Text3, TextBold1 } from '../../../../../common/ConsoleText';
import Icon from "../../../../../common/Icon/Icon";
import './SessionFullCard.scss';

export interface ISessionFullCard {
    title: string;
    type: string;
}

interface IPropsSessionFullCard {
    session: ISessionFullCard;
}

const SessionFullCard: React.StatelessComponent<IPropsSessionFullCard> = (props) => {
    return (
        <div className={`SessionFullCard`}>
            <div className={"SessionFullCard_left"}>
                <Icon name={"calendar-check"}/>
            </div>
            <div className={"SessionFullCard_right"}>
                <Text3>{props.session.type}</Text3>
                <TextBold1>{props.session.title}</TextBold1>
            </div>
        </div>
    );
};

export default SessionFullCard;
