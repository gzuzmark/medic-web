import * as React from 'react';
import { Text1, Text2, Title1 } from '../../../../../common/ConsoleText';
import {IBoxDayDescription} from "../../../../../domain/Session/SessionCollector";
import './DayBox.scss';

interface IPropsDayBox {
    status: string;
    description: IBoxDayDescription;
    click(): void;
}


const DayBox: React.StatelessComponent<IPropsDayBox> = (props) => {
    return (
        <div className={`DayBox DayBox--${props.status}`} onClick={props.click}>
            <Text1>{props.description.topText}</Text1>
            <Title1>{props.description.mainText}</Title1>
            <Text2>{props.description.bottomText}</Text2>
        </div>
    );
};

export default DayBox;


