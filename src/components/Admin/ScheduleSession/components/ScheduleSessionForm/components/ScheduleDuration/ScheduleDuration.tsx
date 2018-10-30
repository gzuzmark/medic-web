import * as moment from "moment";
import * as React from 'react';
import { SingleDatePicker } from 'react-dates';
import { BaseConfigCalendar } from '../../../../../../../common/Calendar.const';
import { Text } from '../../../../../../../common/ConsoleText';
import FormColumn from '../../../FormRow/components/FormColumn/FormColumn';
import FormRow from '../../../FormRow/FormRow';
import RangeWeekendSelector from './components/RangeWeekendSelector/RangeWeekendSelector';
import RepeatSessionInput from './components/RepeatSessionInput/RepeatSessionInput';

interface IPropsScheduleSession {
    endDate: moment.Moment;
    startDate: moment.Moment;
    onChangeDuration(startDate: moment.Moment, endDate: moment.Moment, action: string): void;
}

interface IStateScheduleSession {
    endDateFocus: boolean;
    endDate: moment.Moment;
    repeatSession: boolean;
    startDateFocus: boolean;
    startDate: moment.Moment;
}

class ScheduleDuration extends React.Component <IPropsScheduleSession, IStateScheduleSession> {
    public state: IStateScheduleSession;

    private baseConfigCalendar = BaseConfigCalendar;

    constructor(props: IPropsScheduleSession) {
        super(props);
        this.state = {
            endDate: moment().endOf('week'),
            endDateFocus: false,
            repeatSession: false,
            startDate: moment(),
            startDateFocus: false
        };
        moment.updateLocale('es', {
            weekdaysMin : ['D', 'L', 'M', 'M', 'J', 'V', 'S']
        });
        this._onEndDateFocusChange = this._onEndDateFocusChange.bind(this);
        this._onStartDateFocusChange = this._onStartDateFocusChange.bind(this);
        this._onEndDateChange = this._onEndDateChange.bind(this);
        this._onStartDateChange = this._onStartDateChange.bind(this);
        this._onRepeatChange = this._onRepeatChange.bind(this);
        this._isDayBlocked = (day: moment.Moment) => day < this.props.startDate;
    }

    public render() {
        let counter = 0;
        return (
            <div style={{marginTop: 30}}>
            <FormRow columns={[
                <FormColumn key={`ScheduleDuration${++counter}`}  width={4}>
                    <RepeatSessionInput repeatSession={this.state.repeatSession} onChange={this._onRepeatChange}/>
                </FormColumn>,
                <FormColumn key={`ScheduleDuration${++counter}`} width={3}>
                    <Text>En la semana del:</Text>
                    {this.state.repeatSession ?
                        <SingleDatePicker
                            date={this.props.startDate} // momentPropTypes.momentObj or null
                            onDateChange={this._onStartDateChange} // PropTypes.func.isRequired
                            focused={this.state.startDateFocus} // PropTypes.bool
                            onFocusChange={this._onStartDateFocusChange} // PropTypes.func.isRequired
                            id="startDate" // PropTypes.string.isRequired,
                            verticalSpacing={0}
                            {...this.baseConfigCalendar}
                        /> :
                        <RangeWeekendSelector
                            endDate={this.props.endDate}
                            startDate={this.props.startDate}
                            onChangeDuration={this.props.onChangeDuration}/>}
                </FormColumn>,
                <FormColumn key={`ScheduleDuration${++counter}`} width={3}>
                    { this.state.repeatSession &&
                        <React.Fragment>
                            <Text>Termina la semana del:</Text>
                            <SingleDatePicker
                                date={this.props.endDate} // momentPropTypes.momentObj or null
                                onDateChange={this._onEndDateChange} // PropTypes.func.isRequired
                                focused={this.state.endDateFocus} // PropTypes.bool
                                onFocusChange={this._onEndDateFocusChange} // PropTypes.func.isRequired
                                id="endDate" // PropTypes.string.isRequired,
                                isDayBlocked={this._isDayBlocked}
                                verticalSpacing={0}
                                {...this.baseConfigCalendar}
                            />
                        </React.Fragment>
                    }
                </FormColumn>
            ]}/>
            </div>
        );
    }

    // On Focus Change
    private _onStartDateFocusChange(focusedInput: any) {
        const focus = focusedInput ? focusedInput.focused : false;
        this.setState({startDateFocus: focus});
    };

    private _onEndDateFocusChange(focusedInput: any) {
        const focus = focusedInput ? focusedInput.focused : false;
        this.setState({endDateFocus: focus});
    };

    // On Date Change
    private _onEndDateChange(endDate: moment.Moment) {
        this.props.onChangeDuration(this.props.startDate, endDate, '_onEndDateChange');
    }

    private _onStartDateChange(startDate: moment.Moment) {
        this.props.onChangeDuration(startDate, this.props.endDate, '_onStartDateChange');
    }

    private _onRepeatChange() {
        if (this.state.repeatSession) {
            this.props.onChangeDuration(moment(), moment().endOf('week'), '_onRepeatChange')
        }
        const repeatSession = !this.state.repeatSession;
        this.setState({repeatSession});
    }

    // Others
    private _isDayBlocked(day: moment.Moment) {
        return day < this.props.startDate;
    }

}

export default ScheduleDuration;
