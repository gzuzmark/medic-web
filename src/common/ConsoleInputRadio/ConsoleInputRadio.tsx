import * as React from 'react';
import {Body1, LIGHT_TEXT} from '../MentorText';
import './ConsoleInputRadio.scss';

interface IPropsConsoleInputRadio {
    title: string;
    attrs: any;
}
const ConsoleInputRadio: React.StatelessComponent<IPropsConsoleInputRadio> = (props) => {
    return (
        <label className="ConsoleInputRadio">
            <Body1 weight={LIGHT_TEXT} style={{marginLeft: 5, display: 'block'}}>{props.title}</Body1>
            <input className="ConsoleInputRadio--input"
                   type="radio"
                   {...props.attrs}/>
            <span className="ConsoleInputRadio--radio">&nbsp;</span>
        </label>
    );
};

export default ConsoleInputRadio;
