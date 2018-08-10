import * as moment from "moment";
import * as React from "react";
import {REPORT_SESSIONS, ReportType} from "../../../../beans/ReportRequest.bean";
import { Text } from '../../../../common/ConsoleText';
import './ReportTable.scss';

interface IPropsReportTable {
    items: any[];
    type: ReportType;
}

interface IReportTableHeader {
    name: string;
    width: number;
    value: (row: object) => string
}

const tableBase = [{
    name: 'Día',
    value: (row: any) => moment(row.from).format('d'),
    width: 84.5
},{
    name: 'Hora de inicio',
    value: (row: any) => moment(row.from).format('hh:mm'),
    width: 88.7
},{
    name: 'Hora de fin',
    value: (row: any) => moment(row.to).format('hh:mm'),
    width: 88.7
},{
    name: 'Sesión',
    value: (row: any) => row.skillName,
    width: 161.3
},{
    name: 'Tipo',
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
}] as IReportTableHeader[];

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
}] as IReportTableHeader[];




const ReportTable: React.StatelessComponent<IPropsReportTable> = (props) => {
    const table = props.type === REPORT_SESSIONS ? tableBase : tableStudents;
    return (
        <div className="ReportTable">
            <div className="ReportTable-header">
                <div className="ReportTable-row">
                {table.map((header, i) =>
                    <div key={`ReportTable-header_${i}`} className="ReportTable-column" style={{minWidth: header.width, maxWidth: header.width}}>
                        <Text color="textLight">{header.name}</Text>
                    </div>
                )}
                </div>
            </div>
            <div className="ReportTable-body">
            {props.items.map((item, index) =>
                <div key={`ReportTable-body_${index}`} className="ReportTable-row ReportTable-row--line">
                {table.map((header, i) =>
                    <div key={`ReportTable-body_${i}`} className="ReportTable-column" style={{minWidth: header.width, maxWidth: header.width}}>
                        <Text className="ReportTable-text">{header.value(item)}</Text>
                    </div>
                )}
                </div>
            )}
            </div>
        </div>
    );
};


export default ReportTable;