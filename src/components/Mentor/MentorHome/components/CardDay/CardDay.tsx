import * as React from 'react';
import { Text1, Text2, Title1 } from '../../../../../common/ConsoleText';
import {IBoxDayDescription} from "../../../../../domain/Session/SessionCollector";
import './CardDay.scss';

interface IPropsCardDay {
    status: string;
    description: IBoxDayDescription;
    click(): void;
}


const CardDay: React.StatelessComponent<IPropsCardDay> = (props) => {
    return (
        <div className={`CardDay CardDay--${props.status}`} onClick={props.click}>
            <Text1>{props.description.topText}</Text1>
            <Title1>{props.description.mainText}</Title1>
            <Text2>{props.description.bottomText}</Text2>
        </div>
    );
};

export default CardDay;


