import * as React from 'react';
import './Loader.scss';

export interface IPropsLoader {
    className?: string;
    top?: number;
    height?: number;
    style?: React.CSSProperties;
}

const Loader: React.StatelessComponent<IPropsLoader> = (props) => {
    return (
        <div className={`Loader ${props.className}`} style={{...props.style}}>
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
        </div>
    );
};

export default Loader;


