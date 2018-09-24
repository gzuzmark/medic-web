import * as moment from 'moment';
import * as React from 'react';
import {SessionBean} from "../../../../beans/Session.bean";
import ConsoleModalConfirm from "../../../../common/ConsoleModal/ConsoleModalConfirm";
import ConsoleTable from "../../../../common/ConsoleTable/ConsoleTable";
import { Text3 } from '../../../../common/ConsoleText';
import Icon from "../../../../common/Icon/Icon";

interface IPropsModalSessionHandler {
    title: string;
    show: boolean;
    _onCancel(): void;
}

const ModalSessionHandler: React.StatelessComponent<IPropsModalSessionHandler> = (props) => {
    return (
        <ConsoleModalConfirm
            show={props.show}
            title={props.title}
            onCloseModal={props._onCancel}>
            <div className={"ModalSessionHandler"}>
                <ConsoleTable items={[SessionBean]} row={[{
                    name: 'Día',
                    value: (row: SessionBean) => moment(row.from).format('ddd DD/MM/Y'),
                    width: 124.5
                },{
                    name: 'Hora',
                    value: (row: SessionBean) => {
                        return moment(row.from).format('hh:mm a') + ' - ' + moment(row.to).format('hh:mm a')
                    },
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
                }]}/>
                <div className={"ModalSessionHandler_bottom"}>
                    <ul>
                        <li>
                            <Icon name="Trash"/>
                            <Text3>Eliminar</Text3>
                        </li>
                    </ul>
                </div>
            </div>
        </ConsoleModalConfirm>
    );
};

export default ModalSessionHandler;


