import * as React from 'react';
import { Text } from '../ConsoleText';
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
            <Text style={{fontSize: 16}}>{props.title}</Text>
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