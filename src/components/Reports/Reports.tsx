import * as moment from 'moment';
import * as React from "react";
import { SingleDatePicker } from 'react-dates';
import { Text } from '../../common/ConsoleText';
import FormColumn from "../ScheduleSession/components/FormRow/components/FormColumn/FormColumn";
import FormRow from "../ScheduleSession/components/FormRow/FormRow";
import FormSection from "../ScheduleSession/components/FormSection/FormSection";
import { BaseConfigCalendar } from "../ScheduleSession/components/ScheduleDuration/components/Calendar.const";


class Reports extends React.Component <{}, {}> {

    private baseConfigCalendar = BaseConfigCalendar;
    constructor(props: any) {
        super(props);
    }


    public render() {
        let counter = 0;
        return (
            <div className="u-LayoutMargin">
                <FormSection title={'Fecha'} style={{marginTop: 10, marginBottom: 10, display: 'block'}} itemStyle={{width: 650}}>
                    <Text>Elige las semanas de las sesiones que quieres ver</Text>
                    <FormRow style={{marginTop: 20}} columns={[
                        <FormColumn key={`Reports_${++counter}`}  width={2}>
                            <SingleDatePicker
                                date={moment()} // momentPropTypes.momentObj or null
                                onDateChange={this.func} // PropTypes.func.isRequired
                                focused={false} // PropTypes.bool
                                onFocusChange={this.func} // PropTypes.func.isRequired
                                id="startDate" // PropTypes.string.isRequired,
                                verticalSpacing={0}
                                {...this.baseConfigCalendar}
                            />
                        </FormColumn>,
                        <FormColumn key={`Reports_${++counter}`}  width={2}>
                            <SingleDatePicker
                                date={moment()} // momentPropTypes.momentObj or null
                                onDateChange={this.func} // PropTypes.func.isRequired
                                focused={false} // PropTypes.bool
                                onFocusChange={this.func} // PropTypes.func.isRequired
                                id="startDate" // PropTypes.string.isRequired,
                                verticalSpacing={0}
                                {...this.baseConfigCalendar}
                            />
                        </FormColumn>
                    ]}/>
                </FormSection>
                <hr className='u-Separator' />
                <FormSection title={'Reportes'} style={{marginTop: 32, marginBottom: 18}}>
                    <Text>Selecciona el tipo de reporte que te gustaría ver</Text>
                </FormSection>
            </div>
        )
    }

    private func() {
        return void(0);
    }
}

export default Reports;