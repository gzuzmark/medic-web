import * as moment from "moment";
import * as React from 'react';
import { Text } from '../../../../../../common/ConsoleText';
import './RepeatSessionInput.scss';

interface IPropsRepeatSessionInput {
    repeatSession: boolean;
    onChange(): void;
}

interface IStateRepeatSessionInput {
    endDateFocus: boolean;
    endDate: moment.Moment;
    pickerRangeDateFocus: boolean;
    repeatSession: boolean;
    startDateFocus: boolean;
    startDate: moment.Moment;
}

class RepeatSessionInput extends React.Component <IPropsRepeatSessionInput, IStateRepeatSessionInput> {
    public state: IStateRepeatSessionInput;

    constructor(props: IPropsRepeatSessionInput) {
        super(props);
        this._onRepeatChange = this._onRepeatChange.bind(this);
    }

    public render() {
        return (
            <React.Fragment>
                <label className="InputRadio">
                    <Text>No se repite</Text>
                    <input className="InputRadio--input"
                           type="radio"
                           name="repeat"
                           value='false'
                           checked={!this.props.repeatSession}
                           onChange={this._onRepeatChange}/>
                    <span className="InputRadio--radio">&nbsp;</span>
                </label>
                <label className="InputRadio">
                    <Text>Repetir semanalmente</Text>
                    <input className="InputRadio--input"
                           type="radio"
                           name="repeat"
                           value='true'
                           checked={this.props.repeatSession}
                           onChange={this._onRepeatChange}/>
                    <span className="InputRadio--radio">&nbsp;</span>
                </label>
            </React.Fragment>
        );
    }

    private _onRepeatChange() {
        const state = {...this.state};
        if (state.repeatSession) {
            state.startDate = moment();
            state.endDate = moment().endOf('week');
        }
        state.repeatSession = !state.repeatSession;
        this.setState({...state});
        this.props.onChange();
    }
}

export default RepeatSessionInput;
