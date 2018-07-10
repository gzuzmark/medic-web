import * as React from 'react';
import { Text } from '../../../../common/ConsoleText';
import { IMatchParam } from '../../../../interfaces/MatchParam.interface';
import { IMentorDescription } from '../../../../interfaces/Mentor.interface';
import './WeekendPicker.scss';

interface IPropsWeekendPicker {
    match?: IMatchParam;
}


interface IStateWeekendPicker {
    mentor?: IMentorDescription;
}


class WeekendPicker extends React.Component <IPropsWeekendPicker, IStateWeekendPicker> {
    public state: IStateWeekendPicker;

    constructor(props: IPropsWeekendPicker) {
        super(props);
        this.state = {
            mentor: undefined,
        };
    }

    public render() {
        return (
            <React.Fragment>
                <Text>Haz click en el calendario para seleccionar la hora y el día</Text>
                <div className="WeekendPicker">
                    <div className="WeekendPicker-row">
                        <div className="WeekendPicker-column">
                            <Text style={{fontWeight: 700}} className="WeekendPicker-title">Hora</Text
                            ></div>
                        <div className="WeekendPicker-column">
                            <Text style={{fontWeight: 700}} className="WeekendPicker-title">Lunes</Text>
                        </div>
                        <div className="WeekendPicker-column">
                            <Text style={{fontWeight: 700}} className="WeekendPicker-title">Martes</Text>
                        </div>
                        <div className="WeekendPicker-column">
                            <Text style={{fontWeight: 700}} className="WeekendPicker-title">Miércoles</Text>
                        </div>
                        <div className="WeekendPicker-column">
                            <Text style={{fontWeight: 700}} className="WeekendPicker-title">Jueves</Text>
                        </div>
                        <div className="WeekendPicker-column">
                            <Text style={{fontWeight: 700}} className="WeekendPicker-title">Viernes</Text>
                        </div>
                        <div className="WeekendPicker-column">
                            <Text style={{fontWeight: 700}} className="WeekendPicker-title">Sábado</Text>
                        </div>
                        <div className="WeekendPicker-column">
                            <Text style={{fontWeight: 700}} className="WeekendPicker-title">Domingo</Text>
                        </div>
                    </div>
                    <div className="WeekendPicker-row">
                        <div className="WeekendPicker-column">
                            <Text className="WeekendPicker-text">09:00 am - 09:45 am</Text></div>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                    </div>
                    <div className="WeekendPicker-row">
                        <div className="WeekendPicker-column ">
                            <Text className="WeekendPicker-text">09:45 am - 10:30 am</Text></div>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                    </div>
                    <div className="WeekendPicker-row">
                        <div className="WeekendPicker-column ">
                            <Text className="WeekendPicker-text">10:30 am - 11:15 am</Text></div>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                    </div>

                    <div className="WeekendPicker-row">
                        <div className="WeekendPicker-column ">
                            <Text className="WeekendPicker-text">10:30 am - 11:15 am</Text></div>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                    </div>

                    <div className="WeekendPicker-row">
                        <div className="WeekendPicker-column ">
                            <Text className="WeekendPicker-text">10:30 am - 11:15 am</Text></div>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                        <label className="WeekendPicker-column WeekendPicker--box-selection">
                            <input type="checkbox"/>
                        </label>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default WeekendPicker;
