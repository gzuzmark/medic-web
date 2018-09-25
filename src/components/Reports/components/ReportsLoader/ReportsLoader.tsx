import * as React from "react";
import { Heading2 } from '../../../../common/ConsoleText';
import Loader from "../../../../common/Loader/Loader";
import './ReportsLoader.scss'

interface IPropsReportsLoader {
    loading: boolean;
    center: boolean;
}

const ReportsLoader: React.StatelessComponent<IPropsReportsLoader> = (props) => {
    if (!props.loading) {
        return null;
    }
    return (
        <div className={`ReportsLoader ${props.center && 'ReportsLoader--center'}`}>
            <Loader top={50} height={100} style={{top: -37}}/>
            <Heading2 style={{fontWeight: 'bold', marginLeft: 30}}>
                {props.children}
            </Heading2>
        </div>
    )
};


export default ReportsLoader;