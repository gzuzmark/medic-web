import * as React from 'react';
import './Loader.scss';

interface IPropsLoader {
    top: number;
    height: number;
    style?: React.CSSProperties;
}

const Loader: React.StatelessComponent<IPropsLoader> = (props) => {
    return (
        <div className="Loader" style={{...props.style}}>
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
            <div className="Loader Loader-child" />
        </div>
    );
}

export default Loader;


