import * as React from 'react';
import { Text } from '../../../../../../../common/ConsoleText';
import {getFullHour, getHour} from '../../../../../../../common/Utils/DateUtilities';
import { FactorySessionBean } from '../../../../../../../domain/FactorySession/FactorySessionBean';
import { IMentorDescription } from '../../../../../../../interfaces/Mentor.interface';
import { ISessionSchedule } from '../../../../../../../interfaces/Session.interface';
import ScheduleSessionContext, {IScheduleContext} from '../../../../ScheduleSession.context';
import './WeekendPicker.scss';

interface IPropsWeekendPicker {
    onChange(sessionSchedule: ISessionSchedule): void;
}


interface IStateWeekendPicker {
    mentor?: IMentorDescription;
}

const ColumnTable: React.FC<{type: string, style?: React.CSSProperties}> = ({children, type, style}) => {
    return (
        <div className="WeekendPicker-column">
            <Text style={{...style}} className={`WeekendPicker-${type}`}>{children}</Text>
        </div>
    );
};

const ColumnInput: React.FC<{value: string, onChange(): void}> = ({value, onChange}) => {
    return (
        <label className="WeekendPicker-column WeekendPicker--box-selection">
            <input type="checkbox" value={value} name="WeekendPickerInput" onChange={onChange}/>
        </label>
    );
};

class WeekendPicker extends React.Component <IPropsWeekendPicker, IStateWeekendPicker> {
    public state: IStateWeekendPicker;
    private header = [
        'Hora', 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ];
    constructor(props: IPropsWeekendPicker) {
        super(props);
        this.state = {
            mentor: undefined,
        };
    }

    public render() {
        return (
            <ScheduleSessionContext.Consumer>
                {
                    (scheduleSessionContext: IScheduleContext) => {
                        return (
                            <React.Fragment>
                                <Text>Haz click en el calendario para seleccionar la hora y el día</Text>
                                <div className="WeekendPicker">
                                    <div className="WeekendPicker-row">
                                        {this.header.map((text, index) =>
                                            <ColumnTable style={{fontWeight: 700}}
                                                         key={`HeaderColumn_${index}`}
                                                         type={'title'}>{text}</ColumnTable>
                                        )}
                                    </div>
                                    {this._renderBody(scheduleSessionContext.session)}
                                </div>
                            </React.Fragment>
                        )
                    }
                }
            </ScheduleSessionContext.Consumer>
        );
    }

    private _renderBody(session: FactorySessionBean): JSX.Element[] {
        const firstSession = 540;
        const nextSession = session.factorySession.skillId !== 1 ? 30 : 15;
        const lastSession = 1170;
        const duration = session.factorySession.skillId !== 1 ? 30 : 15;
        const rows = [];
        for(let timer = firstSession; timer <= lastSession; timer += nextSession) {
            rows.push(
                <div className="WeekendPicker-row" key={`WeekendPicker-row_${timer}`}>
                    {this._renderRow(timer, duration)}
                </div>
            )
        }
        return rows;
    }

    private _renderRow(timer: number, duration: number) {
        const firstDay = 1;
        const lastDay = 7;
        const row = [
            <ColumnTable key={`BodyColumn_${'1'}`} type={'text'}>{getFullHour(timer)} - {getFullHour(timer + duration)}</ColumnTable>
        ];
        for(let i = firstDay; i <= lastDay; i++) {
            const from = getHour(timer);
            const to = getHour(timer + duration);
            const weekDay = i;
            const onChange = () => {
                this.props.onChange({from, to, weekDay});
            };
            row.push(
                <ColumnInput key={`${from}@${to}@${weekDay}`} value={`${from}@${to}@${weekDay}`} onChange={onChange}/>
            )
        }
        return row
    }
}

export default WeekendPicker;
