import * as moment from 'moment';
import * as React from 'react';
import TimePicker from "../../../../../../common/TimePicker/TimePicker";
import InputDatePicker from "../../../../../Reports/components/InputDatePicker/InputDatePicker";
import FormColumn from "../../../FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../FormRow/FormRow";
// import './TimeRangePicker.scss';

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
    return (
        <div style={{marginTop: 30}}>
            <FormRow columns={[
                <FormColumn key={`TimeRangePicker_${++counter}`}  width={4}>
                    <InputDatePicker
                        id={'startDate'}
                        date={props.date}
                        updateState={props.onChange} />
                </FormColumn>,
                <FormColumn key={`TimeRangePicker_${++counter}`} width={5}>
                    <TimePicker
                        defaultText={"11:00 am"}
                        name={'Inicia'}
                        onChange={props.onChange}
                        from={initDates.initDate}
                        to={initDates.endDate}/>
                </FormColumn>,
                <FormColumn key={`TimeRangePicker_${++counter}`} width={5}>
                    <TimePicker
                        defaultText={"11:00 am"}
                        name={'Termina'}
                        onChange={props.onChange}
                        from={endDates.initDate}
                        to={endDates.endDate}/>
                </FormColumn>,
                <FormColumn key={`TimeRangePicker_${++counter}`} width={3}>
                    &nbsp;
                </FormColumn>,
            ]} />
        </div>

    );
};

export default TimeRangePicker;


