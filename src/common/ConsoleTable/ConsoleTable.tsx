import * as React from 'react';
import { Text3 } from '../ConsoleText';
import ConsoleTableLoader from "./components/ConsoleTableLoader/ConsoleTableLoader";
import './ConsoleTable.scss';


export interface IRowConsoleTable {
    name: string | JSX.Element;
    value: (row: object) => string | JSX.Element;
    width: number;
}

interface IPropsConsoleTable {
    style?: React.CSSProperties;
    items: any[];
    loading?: boolean;
    row: IRowConsoleTable[];
}


const ConsoleTable: React.StatelessComponent<IPropsConsoleTable> = (props) => {
    return (
        <div style={{position: 'relative'}}>
            <div className={`ConsoleTable ${!!props.loading ? 'ConsoleTable--loading' : ''}`} style={{...props.style}}>
                <div className="ConsoleTable-header">
                    <div className="ConsoleTable-row">
                        {props.row.map((header, i) =>
                            <div key={`ConsoleTable-header_${i}`} className="ConsoleTable-column" style={{minWidth: header.width, maxWidth: header.width}}>
                                <Text3 color="textLight" style={{lineHeight: '14px'}}>{header.name}</Text3>
                            </div>
                        )}
                    </div>
                </div>
                <div className="ConsoleTable-body">
                    {props.items.map((item, index) =>
                        <div key={`ConsoleTable-body_${index}`} className="ConsoleTable-row ConsoleTable-row--line">
                            {props.row.map((header, i) =>
                                <div key={`ConsoleTable-body_${i}`} className="ConsoleTable-column" style={{minWidth: header.width, maxWidth: header.width}}>
                                    <Text3 className="ConsoleTable-text">{header.value(item)}</Text3>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {!!props.loading  &&
            <ConsoleTableLoader loading={true} center={true} style={{top: 0}}>{props.children}</ConsoleTableLoader>}
        </div>
    );
};

export default ConsoleTable;


