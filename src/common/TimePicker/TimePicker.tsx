import * as moment from 'moment';
import * as React from 'react';
import {default as FilterList, IListItem} from "../FilterList/FilterList";

interface IPropTimePicker {
    defaultText: string;
    from?: moment.Moment;
    name: string;
    onChange: (item: IListItem) => void;
    step?: number;
    to?: moment.Moment;
}

const listTimes = (from = moment(), to = moment(), step = 15): IListItem[] => {
    const times = [] as IListItem[];
    let startTime = moment(from);
    const finishTime = moment(to);
    startTime.set('seconds', 0);
    finishTime.set('seconds', 59);
    while (startTime <= finishTime) {
        times.push({
            id: startTime.toISOString(),
            name: startTime.format('HH:mm')
        });
        startTime = startTime.add(step, 'minutes');
    }
    return times
};

const TimeRangePicker: React.StatelessComponent<IPropTimePicker> = (props) => {
    return (
        <FilterList
            onChange={props.onChange}
            list={listTimes(props.from, props.to, props.step)}
            defaultText={props.defaultText}
            enableClearSearch={false}
            name={props.name} />
    );
};

TimeRangePicker.defaultProps = {
    from: moment(),
    step: 15,
    to: moment()
};


export default TimeRangePicker;


