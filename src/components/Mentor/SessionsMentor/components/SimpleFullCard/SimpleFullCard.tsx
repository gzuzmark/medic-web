import * as React from 'react';
import { Text3, TextBold3, Title2 } from '../../../../../common/ConsoleText';
import './SimpleFullCard.scss';

export interface ISimpleFullCard {
    description: string;
    subtitle: string;
    title: string;
}

interface IPropsSimpleFullCard {
    card: ISimpleFullCard;
}

const SimpleFullCard: React.StatelessComponent<IPropsSimpleFullCard> = (props) => {
    return (
        <div className={`SimpleFullCard`}>
            <div className={"SimpleFullCard_header"}>
                <Title2>{props.card.title}</Title2>
                <TextBold3>{props.card.subtitle}</TextBold3>
                <Text3>{props.card.description}</Text3>
            </div>
            <div className={"SimpleFullCard_body"}>
                {props.children}
            </div>
        </div>
    );
};

export default SimpleFullCard;
