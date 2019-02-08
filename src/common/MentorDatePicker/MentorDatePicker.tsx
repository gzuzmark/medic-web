import * as moment from "moment";
import * as React from "react";
import DatePickerBase from "../DatePickerBase/DatePickerBase";

interface IStateMentorDatePicker {
    focus: boolean;
}

interface IPropsMentorDatePicker {
    id: string;
    configDate?: object;
    date: Date;
    error?: boolean;
    updateState: (params: object) => void;
    label: string;
    attrs: any;
}

// TODO: Se necesita actualizar estilos
class MentorDatePicker extends React.Component <IPropsMentorDatePicker, IStateMentorDatePicker> {
    public state: IStateMentorDatePicker;
    constructor(props: IPropsMentorDatePicker) {
        super(props);
        this.state = {
            focus: false
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.onDateFocusChange = this.onDateFocusChange.bind(this);
    }

    public render() {
        return (
            <div>
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

export default MentorDatePicker;
