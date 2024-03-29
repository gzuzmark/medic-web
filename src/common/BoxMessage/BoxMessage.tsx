import * as React from 'react';
import { Text } from '../ConsoleText';
import Icon from "../Icon/Icon";
import './BoxMessage.scss';


interface IPropsBoxMessage {
    type: string;
    show: boolean;
}

const getKeyIcon = (key: string): string => {
    let icon = '';
    if (key === 'error') {
        icon = 'exclamation'
    }
    return icon;
};

const BoxMessage: React.FC<IPropsBoxMessage> = (props) => {
    if (!props.show) {
        return null;
    }
    return (
        <div className={`BoxMessage BoxMessage--${props.type}`}>
            <Icon name={getKeyIcon(props.type)} style={{fill: 'white', paddingRight: 10, height: 30, width: 30}}/>
            <Text color={'textLight'}>{props.children}</Text>
        </div>
    );
};

export default BoxMessage;
