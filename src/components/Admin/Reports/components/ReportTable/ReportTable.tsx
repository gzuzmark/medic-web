import * as moment from "moment";
import * as React from "react";
import {REPORT_SESSIONS, ReportType} from "../../../../../beans/ReportRequest.bean";
import ConsoleTable, {IRowConsoleTable} from "../../../../../common/ConsoleTable/ConsoleTable";

interface IPropsReportTable {
    items: any[];
    type: ReportType;
    loading: boolean;
}

const tableBase = [{
    name: 'Día',
    value: (row: any) => moment(row.from).format('ddd DD/MM/Y'),
    width: 124.5
},{
    name: 'Hora de inicio',
    value: (row: any) => moment(row.from).format('hh:mm a'),
    width: 88.7
},{
    name: 'Hora de fin',
    value: (row: any) => moment(row.to).format('hh:mm a'),
    width: 88.7
},{
    name: 'Tipo',
    value: (row: any) => row.interestArea,
    width: 75
},{
    name: 'Sesión',
    value: (row: any) => row.skillName,
    width: 161.3
},{
    name: 'Modalidad',
    value: (row: any) => row.type,
    width: 72.6
},{
    name: 'Tutor',
    value: (row: any) => row.mentorName,
    width: 104
},{
    name: 'Sede',
    value: (row: any) => row.sede || '_______',
    width: 113.3
},{
    name: 'Aula',
    value: (row: any) => row.room || '_______',
    width: 62.6
},{
    name: 'Cap.',
    value: (row: any) => row.maxStudents,
    width: 42.6
}] as IRowConsoleTable[];

const tableStudents = [...tableBase, {
    name: 'Cod. de alumno',
    value: (row: any) => row.studentCode,
    width: 88.7
}, {
    name: 'N. de alumno',
    value: (row: any) => row.studentName,
    width: 161.3
}, {
    name: 'Asistencia',
    value: (row: any) => row.studentAttended ? 'Sí' : 'No',
    width: 72.6
}] as IRowConsoleTable[];

const tableRating = [{
    name: 'Estado',
    value: (row: any) => row.status,
    width: 120
},{
    name: 'Calif.',
    value: (row: any) => row.rating ? row.rating : '--',
    width: 40
}] as IRowConsoleTable[];

const tableRatingComment = [...tableRating, {
    name: 'Comentario',
    value: (row: any) => row.studentComment,
    width: 140
}] as IRowConsoleTable[];

const ReportTable: React.StatelessComponent<IPropsReportTable> = (props) => {
    let table = props.type === REPORT_SESSIONS ? tableBase : tableStudents;
    table = props.type === REPORT_SESSIONS ? table.concat(tableRating) : table.concat(tableRatingComment);
    return (
        <ConsoleTable items={props.items} row={table} loading={props.loading} style={{position: 'initial'}} >
            {props.children}
        </ConsoleTable>
    );
};


export default ReportTable;
