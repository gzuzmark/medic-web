import * as React from 'react';
import {Body1, LIGHT_TEXT} from '../MentorText';
import './ConsoleInputRadio.scss';

interface IPropsConsoleInputRadio {
    title: string;
    name: string;
    checked: boolean;
    value: string;
    onChange: (event?: any) => void
}
const ConsoleInputRadio: React.StatelessComponent<IPropsConsoleInputRadio> = (props) => {
    return (
        <label className="ConsoleInputRadio">
            <Body1 weight={LIGHT_TEXT} style={{marginLeft: 5, display: 'block'}}>{props.title}</Body1>
            <input className="ConsoleInputRadio--input"
                   type="radio"
                   name={props.name}
                   value={props.value}
                   checked={props.checked}
                   onChange={props.onChange}/>
            <span className="ConsoleInputRadio--radio">&nbsp;</span>
        </label>
    );
};

export default ConsoleInputRadio;
