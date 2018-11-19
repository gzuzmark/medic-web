import * as React from 'react';
import {FONTS} from "../../../../../common/MentorColor";
import {Display1, Heading3, LIGHT_TEXT, Subhead1} from '../../../../../common/MentorText';
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
            {props.status === 'active' ?
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


