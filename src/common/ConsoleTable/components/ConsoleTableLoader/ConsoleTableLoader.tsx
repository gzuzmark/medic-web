import * as React from "react";
import { TextBold1 } from '../../../ConsoleText';
import Loader from "../../../Loader/Loader";
import './ConsoleTableLoader.scss'

interface IPropsConsoleTableLoader {
    loading: boolean;
    center: boolean;
    style?: React.CSSProperties;
}

const ConsoleTableLoader: React.StatelessComponent<IPropsConsoleTableLoader> = (props) => {
    if (!props.loading) {
        return null;
    }
    return (
        <div className={`ConsoleTableLoader ${props.center && 'ConsoleTableLoader--center'}`} style={{...props.style}}>
            <Loader top={50} height={100} style={{top: -37}}/>
            <TextBold1 style={{fontWeight: 'bold', marginLeft: 30}}>
                {props.children}
            </TextBold1>
        </div>
    )
};


export default ConsoleTableLoader;