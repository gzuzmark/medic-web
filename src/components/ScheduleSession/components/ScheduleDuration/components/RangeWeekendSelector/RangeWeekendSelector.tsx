import * as moment from "moment";
import * as React from 'react';
import { DayPickerRangeController } from 'react-dates';
import {findDOMNode} from 'react-dom';
import { BaseConfigCalendar } from './../../components/Calendar.const';
import './RangeWeekendSelector.scss';

interface IPropsRangeWeekendSelector {
    endDate: moment.Moment;
    startDate: moment.Moment;
    onChangeDuration(startDate: moment.Moment, endDate: moment.Moment, action: string): void;
}

interface IStateRangeWeekendSelector {
    pickerRangeDateFocus: boolean;
}

class RangeWeekendSelector extends React.Component <IPropsRangeWeekendSelector, IStateRangeWeekendSelector> {
    public state: IStateRangeWeekendSelector;

    private baseConfigCalendar = BaseConfigCalendar;
    private pickerRef: HTMLInputElement;
    constructor(props: IPropsRangeWeekendSelector) {
        super(props);
        this.state = {
            pickerRangeDateFocus: false
        };

        moment.updateLocale('es', {
            weekdaysMin : ['D', 'L', 'M', 'M', 'J', 'V', 'S']
        });

        this._onPickerRangeChange = this._onPickerRangeChange.bind(this);
        this._onPickerRangeFocus = this._onPickerRangeFocus.bind(this);
        this._isOutsideRange = this._isOutsideRange.bind(this);
        this._startDateOffset = this._startDateOffset.bind(this);
        this._endDateOffset = this._endDateOffset.bind(this);
        this._setPickerRef = this._setPickerRef.bind(this);
    }

    public componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    public render() {
        return (
            <React.Fragment>
                <div className={'InputText'}>
                    <input className={'InputText-input'}
                           id={'startDate'}
                           value={this.props.startDate.format('DD/MM/YYYY')}
                           onFocus={this._onPickerRangeFocus}
                           onChange={undefined}
                           readOnly={true}/>
                </div>
                {this.state.pickerRangeDateFocus &&
                <div style={{'position': 'relative'}}>
                    <div ref={this._setPickerRef}  style={{position: 'absolute', width: 250, height: 300}}>
                        <DayPickerRangeController
                            startDate={this.props.startDate} // momentPropTypes.momentObj or null
                            endDate={this.props.endDate}
                            onDatesChange={this._onPickerRangeChange} // PropTypes.func.isRequired
                            onFocusChange={this._onPickerRangeFocus} // PropTypes.func.isRequired
                            isOutsideRange={this._isOutsideRange}
                            startDateOffset={this._startDateOffset}
                            endDateOffset={this._endDateOffset}
                            focusedInput={'startDate'}
                            {...this.baseConfigCalendar} />
                    </div>
                </div>
                }

            </React.Fragment>
        );
    }

    private _setPickerRef(ref: any) {
        this.pickerRef = ref;
    }

    private handleClickOutside = (event: any) => {
        const domNode = findDOMNode(this);
        if (this.pickerRef && this.pickerRef.contains(event.target)) {
            return;
        } else if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                pickerRangeDateFocus : false
            });
        }
    };

    private _onPickerRangeFocus(focus: any) {
        this.setState({pickerRangeDateFocus: true});
    }

    // On Date Change
    private _onPickerRangeChange({ startDate, endDate }: any) {
        this.setState({ pickerRangeDateFocus: false });
        this.props.onChangeDuration(startDate, endDate, '_onPickerRangeChange');
    }

    // Others

    private _isOutsideRange(day: moment.Moment) {
        return day.startOf('day').diff(moment().startOf('day'), 'days') < 0;
    }

    private _startDateOffset(day: moment.Moment) {
        return day.startOf('week');
    }

    private _endDateOffset(day: moment.Moment) {
        return day.endOf('week');
    }

}

export default RangeWeekendSelector;
