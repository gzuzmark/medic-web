import * as moment from "moment";
import * as React from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { BaseConfigCalendar } from "../Calendar.const";


interface IPropsConsoleDatePicker {
    id: string;
    date: moment.Moment;
    focus: boolean;
    onDateChange: (date: moment.Moment) => void;
    onDateFocusChange: (args: { focused: boolean | null }) => void;
    configs?: object;
}
const baseConfigCalendar = BaseConfigCalendar;
const ConsoleDatePicker: React.StatelessComponent<IPropsConsoleDatePicker> = (props) => {
    return (
        <SingleDatePicker
            date={props.date} // momentPropTypes.momentObj or null
            onDateChange={props.onDateChange} // PropTypes.func.isRequired
            focused={props.focus} // PropTypes.bool
            onFocusChange={props.onDateFocusChange} // PropTypes.func.isRequired
            id={props.id} // PropTypes.string.isRequired,
            verticalSpacing={0}
            readOnly={true}
            {...baseConfigCalendar}
            {...props.configs}
        />
    );
};

export default ConsoleDatePicker;