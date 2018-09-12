import * as moment from "moment";
import * as React from 'react';
import ConsoleInputRadio from "../../../../../../../../common/ConsoleInputRadio/ConsoleInputRadio";
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
                <ConsoleInputRadio
                    title={'No se repite'}
                    name={'repeat'}
                    value={'false'}
                    checked={!this.props.repeatSession}
                    onChange={this._onRepeatChange}/>
                <ConsoleInputRadio
                    title={'Repetir semanalmente'}
                    name={'repeat'}
                    value={'true'}
                    checked={this.props.repeatSession}
                    onChange={this._onRepeatChange}/>
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
