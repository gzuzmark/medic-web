import * as React from 'react';
import './Icon.scss'
import './icons.svg'

interface IPropsIcon {
    name: string;
    style?: React.CSSProperties;
    click?: () => void;
}

const Icon: React.StatelessComponent<IPropsIcon> = (props) => {
    let events = {};
    if (!!props.click) {
        events = {
            onClick: props.click
        }
    }
    return (
        <svg className={`icon icon-${props.name}`} style={{...props.style}} {...events}>
            <use xlinkHref={`#icons_${props.name}`}/>
        </svg>
    );
};

export default Icon
