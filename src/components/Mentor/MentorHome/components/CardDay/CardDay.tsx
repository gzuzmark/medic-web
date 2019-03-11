import * as React from 'react';
import {FONTS} from "../../../../../common/MentorColor";
import {Display1, Heading3, LIGHT_TEXT, Subhead1} from '../../../../../common/MentorText';
import {IBoxDayDescription, STATUS_DAY_SESSIONS} from "../../../../../domain/Session/SessionCollector";
import './CardDay.scss';

export interface IPropsCardDay {
    status: string;
    description: IBoxDayDescription;
    today: boolean;
    click(): void;
}


const CardDay: React.FC<IPropsCardDay> = (props) => {
    const classToday = props.today ? 'CardDay--today' : '';
    return (
        <div className={`CardDay CardDay--${props.status} ${classToday}`} onClick={props.click}>
            {props.status === STATUS_DAY_SESSIONS.ACTIVE ?
                <React.Fragment>
                    <Heading3>{props.description.topText}</Heading3>
                    <Display1>{props.description.mainText}</Display1>
                    <Subhead1>{props.description.bottomText}</Subhead1>
                </React.Fragment> :
                <React.Fragment>
                    <Heading3 color={FONTS.medium} weight={LIGHT_TEXT}>{props.description.topText}</Heading3>
                    <Display1 color={FONTS.medium}>{props.description.mainText}</Display1>
                    <Subhead1 color={FONTS.medium} weight={LIGHT_TEXT}>{props.description.bottomText}</Subhead1>
                </React.Fragment>
            }
        </div>
    );
};

export default CardDay;


