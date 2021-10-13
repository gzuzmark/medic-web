import * as React from 'react';
import * as moment from "moment";
import '../../Scheduler.scss';

const ScheduleCellTemplate = (props: any) => {
    const { type, date } = props;
    const mdate = moment(date).locale('es');
    
    if (type === 'alldayCells') {
        return <></>;
    }

    const mNow = moment(new Date).add(1, 'hour');
    if (mNow > mdate) {
        return <div className="cell-template-hour cell-template-hour-disabled">{mdate.format('hh:mm a')}</div>
    }

    return (
        <div className="cell-template-hour">{mdate.format('hh:mm a')}</div>
    );
}

export default ScheduleCellTemplate;
