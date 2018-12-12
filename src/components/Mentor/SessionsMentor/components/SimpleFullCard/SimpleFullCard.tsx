import * as React from 'react';
import { Text3, TextBold3, Title2 } from '../../../../../common/ConsoleText';
import './SimpleFullCard.scss';

export interface ISimpleFullCard {
    description: string;
    subtitle: string;
    title: string;
    isLink: boolean;
}

export interface IPropsSimpleFullCard {
    card: ISimpleFullCard;
}

const SimpleFullCard: React.StatelessComponent<IPropsSimpleFullCard> = (props) => {
    return (
        <div className={`SimpleFullCard`}>
            <div className={"SimpleFullCard_header"}>
                <Title2>{props.card.title}</Title2>
                <TextBold3>{props.card.subtitle}</TextBold3>
                {props.card.isLink ?
                    <a className={"SimpleFullCard_description"} href={props.card.description} target="_blank">
                        <Text3>{props.card.description}</Text3>
                    </a> :
                    <span className={"SimpleFullCard_description"}>
                        <Text3>{props.card.description}</Text3>
                    </span>
                }
            </div>
            <div className={"SimpleFullCard_body"}>
                {props.children}
            </div>
        </div>
    );
};

export default SimpleFullCard;
