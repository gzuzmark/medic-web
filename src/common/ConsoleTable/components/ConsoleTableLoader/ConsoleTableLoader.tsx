import * as React from "react";
import Loader from "../../../Loader/Loader";
import './ConsoleTableLoader.scss'

interface IPropsConsoleTableLoader {
    loading: boolean;
    center: boolean;
    style?: React.CSSProperties;
}

const ConsoleTableLoader: React.FC<IPropsConsoleTableLoader> = (props) => {
    if (!props.loading) {
        return null;
    }
    return (
        <div className={`ConsoleTableLoader ${props.center && 'ConsoleTableLoader--center'}`} style={{...props.style}}>
            <Loader />
        </div>
    )
};


export default ConsoleTableLoader;
