import * as moment from "moment";
import * as React from "react";
import DatePickerBase from "../../../../../common/DatePickerBase/DatePickerBase";
import './InputDatePicker.scss';

interface IStateInputDatePicker {
    focus: boolean;
}

interface IPropsInputDatePicker {
    id: string;
    configDate?: object;
    date: Date;
    error?: boolean;
    updateState: (params: object) => void;
}

class InputDatePicker extends React.Component <IPropsInputDatePicker, IStateInputDatePicker> {
    public state: IStateInputDatePicker;
    constructor(props: IPropsInputDatePicker) {
        super(props);
        this.state = {
            focus: false
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.onDateFocusChange = this.onDateFocusChange.bind(this);
    }

    public render() {
        return (
            <div className={`InputDatePicker ${this.props.error ? 'InputDatePicker--error' : ''}`}>
                <DatePickerBase
                    id={this.props.id}
                    date={moment(this.props.date)}
                    focus={this.state.focus}
                    onDateChange={this.onDateChange}
                    onDateFocusChange={this.onDateFocusChange}
                    configs={this.props.configDate} />
            </div>
        )
    }

    private onDateChange(date: moment.Moment) {
        this.props.updateState({[this.props.id]: date.toDate()})

    }

    private onDateFocusChange(focusedInput: any) {
        const focus = focusedInput ? focusedInput.focused : false;
        this.setState({focus});
    }


}

export default InputDatePicker;
