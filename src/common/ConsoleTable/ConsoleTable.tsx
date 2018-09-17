import * as React from 'react';
import { Text } from '../ConsoleText';
import './ConsoleTable.scss';


export interface IRowConsoleTable {
    name: string;
    value: (row: object) => string | JSX.Element;
    width: number;
}

interface IPropsConsoleTable {
    style?: React.CSSProperties;
    items: any[];
    row: IRowConsoleTable[];
}

const ConsoleTable: React.StatelessComponent<IPropsConsoleTable> = (props) => {
    return (
        <div className="ConsoleTable" style={{...props.style}}>
            <div className="ConsoleTable-header">
                <div className="ConsoleTable-row">
                    {props.row.map((header, i) =>
                        <div key={`ConsoleTable-header_${i}`} className="ConsoleTable-column" style={{minWidth: header.width, maxWidth: header.width}}>
                            <Text color="textLight" style={{lineHeight: '14px'}}>{header.name}</Text>
                        </div>
                    )}
                </div>
            </div>
            <div className="ConsoleTable-body">
                {props.items.map((item, index) =>
                    <div key={`ConsoleTable-body_${index}`} className="ConsoleTable-row ConsoleTable-row--line">
                        {props.row.map((header, i) =>
                            <div key={`ConsoleTable-body_${i}`} className="ConsoleTable-column" style={{minWidth: header.width, maxWidth: header.width}}>
                                <Text className="ConsoleTable-text">{header.value(item)}</Text>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsoleTable;


