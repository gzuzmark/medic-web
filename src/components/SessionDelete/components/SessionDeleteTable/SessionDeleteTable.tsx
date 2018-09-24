import * as moment from 'moment';
import * as React from 'react';
import {default as ConsoleTable, IRowConsoleTable} from "../../../../common/ConsoleTable/ConsoleTable";
import {ISessionsToDelete} from "../../../../domain/FormSessionDeleteBean";
import './SessionDeleteTable.scss';

interface IPropsSessionDeleteTable {
    items: ISessionsToDelete[];
    selection: string[];
    onSelectItem(id: string): void;
    onSelectAll():void;
}
const onClick = (onSelectItem: any, id: string) => {
    return () => {
        onSelectItem(id);
    }
};


const SessionDeleteTable: React.StatelessComponent<IPropsSessionDeleteTable> = (props) => {
    const tableBase = [{
        name: <div><input type={"checkbox"}
                          checked={props.items.length === props.selection.length}
                          onClick={props.onSelectAll}/></div>,
        value: (row: ISessionsToDelete) =>
            <div>
                <input
                    type={"checkbox"}
                    checked={props.selection.indexOf(row.id) !== -1}
                    onClick={onClick(props.onSelectItem, row.id)}/>
            </div>,
        width: 30
    },{
        name: 'Día',
        value: (row: ISessionsToDelete) => moment(row.from).format('ddd DD/MM/Y'),
        width: 124.5
    },{
        name: 'Hora',
        value: (row: ISessionsToDelete) =>
            `${moment(row.from).format('hh:mm a')} - ${moment(row.to).format('hh:mm a')}`,
        width: 160
    },{
        name: 'Tipo',
        value: (row: ISessionsToDelete) => row.interestArea,
        width: 75
    },{
        name: 'Sesión',
        value: (row: ISessionsToDelete) => row.skillName,
        width: 161.3
    },{
        name: 'Modalidad',
        value: (row: ISessionsToDelete) => row.type,
        width: 72.6
    },{
        name: 'Tutor',
        value: (row: ISessionsToDelete) => row.mentorName,
        width: 104
    },{
        name: 'Sede',
        value: (row: ISessionsToDelete) => row.sede || '_______',
        width: 113.3
    },{
        name: 'Aula',
        value: (row: ISessionsToDelete) => row.room || '_______',
        width: 62.6
    },{
        name: 'Cap.',
        value: (row: ISessionsToDelete) => row.maxStudents,
        width: 42.6
    }] as IRowConsoleTable[];

    return (
        <div className={"SessionDeleteTable"}>
            <ConsoleTable items={props.items} row={tableBase}/>
        </div>
    );
};

export default SessionDeleteTable;