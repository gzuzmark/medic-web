import * as moment from 'moment';
import * as React from 'react';
import ConsoleColor from "../../../../../../common/ConsoleColor";
import { Text } from '../../../../../../common/ConsoleText';
import Icon from "../../../../../../common/Icon/Icon";
import TimePicker from "../../../../../../common/TimePicker/TimePicker";
import InputDatePicker from "../../../../../Reports/components/InputDatePicker/InputDatePicker";
import FormColumn from "../../../FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../FormRow/FormRow";
import './TimeRangePicker.scss';

interface IPropsTimeRangePicker {
    date: Date;
    onChange: (params: object) => void;
}

const formatTime = (date: moment.Moment) => {
    const format = 15;
    const minutes = date.get('minutes');
    return minutes + (format  - minutes % format)
};

const getInitDate = (date: Date, limit: Date) => {
    const initDate = moment(date);
    const endDate = moment(date);
    const limitDate = moment(limit);
    if (initDate.format("YYYY-MM-DD") === limitDate.format("YYYY-MM-DD")) {
        const extraMinutes = formatTime(initDate);
        initDate.set('minutes', extraMinutes);
    } else {
        initDate.set('minutes', 0);
        initDate.set('hours', 0);
    }
    initDate.set('seconds', 0);
    endDate.set('hours', 23);
    endDate.set('minutes', 59);
    endDate.set('seconds', 0);
    return { endDate, initDate }
};

const TimeRangePicker: React.StatelessComponent<IPropsTimeRangePicker> = (props) => {
    let counter = 0;
    const initDates = getInitDate(props.date, new Date());
    const endDates = getInitDate(props.date, new Date());
    const actionColor = ConsoleColor.TEXT_COLORS.actionColor;
    return (
        <div className={'TimeRangePicker'} style={{marginTop: 30}}>
            <FormRow columns={[
                <FormColumn key={`TimeRangePicker_${++counter}`}  width={4}>
                    <Text className='FormSession-label'>Fecha</Text>
                    <InputDatePicker
                        id={'startDate'}
                        date={props.date}
                        updateState={props.onChange} />
                </FormColumn>,
                <FormColumn key={`TimeRangePicker_${++counter}`} width={5}>
                    <Text className='FormSession-label'>Inicia</Text>
                    <TimePicker
                        defaultText={"11:00 am"}
                        name={''}
                        onChange={props.onChange}
                        from={initDates.initDate}
                        to={initDates.endDate}/>
                </FormColumn>,
                <FormColumn key={`TimeRangePicker_${++counter}`} width={5}>
                    <Text className='FormSession-label'>Termina</Text>
                    <TimePicker
                        defaultText={"12:00 pm"}
                        name={''}
                        onChange={props.onChange}
                        from={endDates.initDate}
                        to={endDates.endDate}/>
                </FormColumn>,
                <FormColumn key={`TimeRangePicker_${++counter}`} width={3}>
                    <div className='TimeRangePicker_options'>
                        <div className='TimeRangePicker_option TimeRangePicker_option--add'>
                            <Icon name='add'
                                  style={{fill: actionColor, borderRadius: '50%', border: `1px solid ${actionColor}`}}/>
                            <Text color='actionColor' className='TimeRangePicker_option-text'>Agregar horario</Text>
                        </div>
                        <div className='TimeRangePicker_option TimeRangePicker_option--delete'>
                            <Icon name='trash' style={{fill: actionColor}} />
                            <Text color='actionColor' className='TimeRangePicker_option-text'>Eliminar</Text>
                        </div>
                    </div>
                </FormColumn>,
            ]} />
        </div>

    );
};

export default TimeRangePicker;


