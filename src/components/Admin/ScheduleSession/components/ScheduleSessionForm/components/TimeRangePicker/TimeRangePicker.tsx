import * as moment from 'moment';
import * as React from 'react';
import ConsoleColor from "../../../../../../../common/ConsoleColor";
import { Text } from '../../../../../../../common/ConsoleText';
import FormColumn from "../../../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../../../common/FormRow/FormRow";
import Icon from "../../../../../../../common/Icon/Icon";
import TimePicker from "../../../../../../../common/TimePicker/TimePicker";
import {IListItem} from "../../../../../../../domain/Lists";
import InputDatePicker from "../../../../../Reports/components/InputDatePicker/InputDatePicker";
import './TimeRangePicker.scss';

interface IPropsTimeRangePicker {
    id: number;
    total: number;
    onChange: (id: number, from: Date | null, to: Date | null, key: string) => void;
    onRemoveWorkshop: (id: number) => void;
    onAddWorkshop: (from: Date | null, to: Date | null) => void;
    uniqueKey: string;
}

interface IFormatDates {
    endDate: moment.Moment;
    initDate: moment.Moment;
}

interface IStateTimeRangePicker {
    currentDate: Date;
    fromDates: IFormatDates;
    toDates: IFormatDates;
    selectedFromDate: Date | null;
    selectedToDate: Date | null;
}


class TimeRangePicker extends React.Component<IPropsTimeRangePicker, {}> {
    public state: IStateTimeRangePicker;
    private actionColor: string;
    constructor(props: IPropsTimeRangePicker) {
        super(props);
        const currentDate = new Date();
        this.state = {
            currentDate,
            fromDates: this.getInitDate(currentDate),
            selectedFromDate: null,
            selectedToDate: null,
            toDates: this.getInitDate(currentDate),
        };
        this.onChangeDateBase = this.onChangeDateBase.bind(this);
        this.onSelectFromDate = this.onSelectFromDate.bind(this);
        this.onSelectToDate = this.onSelectToDate.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.actionColor = ConsoleColor.TEXT_COLORS.actionColor;
    }

    public render() {
        let counter = 0;
        const initDateName = this.state.selectedFromDate ?
            moment(this.state.selectedFromDate).format('hh:mm a') : '';
        const endDateName = this.state.selectedToDate ?
            moment(this.state.selectedToDate).format('hh:mm a') : '';
        return (
            <div className={'TimeRangePicker'} style={{marginTop: 30}}>
                <FormRow columns={[
                    <FormColumn key={`TimeRangePicker_${++counter}`}  width={4}>
                        <Text className='FormSession-label'>Fecha</Text>
                        <InputDatePicker
                            id={'startDate'}
                            date={this.state.currentDate}
                            updateState={this.onChangeDateBase} />
                    </FormColumn>,
                    <FormColumn key={`TimeRangePicker_${++counter}`} width={5}>
                        <Text className='FormSession-label'>
                            <Icon name={'clock'}/> Inicia</Text>
                        <TimePicker
                            defaultText={"11:00 am"}
                            name={initDateName}
                            onChange={this.onSelectFromDate}
                            from={this.state.fromDates.initDate.toDate()}
                            to={this.state.fromDates.endDate.toDate()}/>
                    </FormColumn>,
                    <FormColumn key={`TimeRangePicker_${++counter}`} width={5}>
                        <Text className='FormSession-label'>
                            <Icon name={'clock'}/> Termina</Text>
                        <TimePicker
                            defaultText={"12:00 pm"}
                            name={endDateName}
                            onChange={this.onSelectToDate}
                            from={this.state.toDates.initDate.toDate()}
                            to={this.state.toDates.endDate.toDate()}/>
                    </FormColumn>,
                    <FormColumn key={`TimeRangePicker_${++counter}`} width={3}>
                        <div className='TimeRangePicker_options'>
                            {this.props.id !== 4 &&
                            <div className='TimeRangePicker_option TimeRangePicker_option--add' onClick={this.onAdd}>
                                <Icon name='add'
                                      style={{fill: this.actionColor, borderRadius: '50%', border: `1px solid ${this.actionColor}`}}/>
                                <Text color='actionColor' className='TimeRangePicker_option-text'>Agregar horario</Text>
                            </div>}
                            {this.props.total > 1 &&
                            <div className='TimeRangePicker_option TimeRangePicker_option--delete' onClick={this.onRemove}>
                                <Icon name='trash' style={{fill: this.actionColor}} />
                                <Text color='actionColor' className='TimeRangePicker_option-text'>Eliminar</Text>
                            </div>}
                        </div>
                    </FormColumn>,
                ]} />
            </div>
        )
    }

    private onRemove() {
        this.props.onRemoveWorkshop(this.props.id);
    }

    private onAdd() {
        this.props.onAddWorkshop(null, null);
    }

    private updateWorkshops() {
        this.props.onChange(this.props.id, this.state.selectedFromDate, this.state.selectedToDate, this.props.uniqueKey);
    }

    private updateDate(date: Date, key: string) {
        this.setState({[key]: date}, () => {
            this.updateWorkshops();
        });
    }

    private onSelectToDate(item: IListItem) {
        this.updateDate(new Date(item.id), 'selectedToDate');
    }

    private onSelectFromDate(item: IListItem) {
        const fromDate = new Date(item.id);
        const toDate = new Date(item.id);
        toDate.setMinutes(toDate.getMinutes() + 45);
        const toDates = this.getInitDate(toDate, true);
        this.setState({
            selectedToDate: null,
            toDates
        }, () => {
            this.updateDate(fromDate, 'selectedFromDate');
        });
    }

    private onChangeDateBase(newDate: {startDate: Date}) {
        const currentDate = newDate.startDate;
        const initDates = this.getInitDate(currentDate);
        this.setState({
            currentDate,
            fromDates: initDates,
            selectedFromDate: null,
            selectedToDate: null,
            toDates: initDates
        }, () => {
            this.updateWorkshops();
        });
    }

    private getInitDate(date: Date, restrict = false) {
        let initDate = moment(date);
        const endDate = moment(date);
        const limitDate = moment();
        const isToday = initDate.format("YYYY-MM-DD") === limitDate.format("YYYY-MM-DD");
        let initMinutes = 0;
        let endMinutes= 0;
        if (restrict) {
            initMinutes = initDate.get('minutes');
            endMinutes = 59;
        } else if (isToday) {
            initDate = moment();
            initMinutes = this.formatTime(limitDate);
        } else {
            initDate.set('hours', 8);
        }
        initDate.set('minutes', initMinutes).set('seconds', 0);
        endDate.set('hours', 23).set('minutes', endMinutes).set('seconds', 0);
        return { endDate, initDate }
    }

    private formatTime(date: moment.Moment): number {
        const format = 15;
        const minutes = date.get('minutes');
        return minutes + (format  - minutes % format)
    }


}

export default TimeRangePicker;


