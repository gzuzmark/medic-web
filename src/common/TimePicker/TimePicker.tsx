import * as moment from 'moment';
import * as React from 'react';
import {default as FilterList, IListItem} from "../FilterList/FilterList";

interface IPropTimePicker {
    defaultText: string;
    from: Date;
    name: string;
    onChange: (item: IListItem) => void;
    step?: number;
    to: Date;
}

const listTimes = (from: Date, to: Date, step = 15): IListItem[] => {
    const times = [] as IListItem[];
    let startTime = moment(from);
    const finishTime = moment(to);
    startTime.set('seconds', 0);
    finishTime.set('seconds', 59);
    while (startTime <= finishTime) {
        times.push({
            id: startTime.toISOString(),
            name: startTime.format('hh:mm a')
        });
        startTime = startTime.add(step, 'minutes');
    }
    return times
};

const TimePicker: React.StatelessComponent<IPropTimePicker> = (props) => {
    return (
        <FilterList
            onChange={props.onChange}
            list={listTimes(props.from, props.to, props.step)}
            defaultText={props.defaultText}
            name={props.name} />
    );
};

TimePicker.defaultProps = {
    step: 15,
};


export default TimePicker;


