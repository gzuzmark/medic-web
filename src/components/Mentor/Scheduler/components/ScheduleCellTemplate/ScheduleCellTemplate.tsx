import * as React from 'react';
import * as moment from "moment";
import '../../Scheduler.scss';

const ScheduleCellTemplate = (props: any) => {
    const { type, date } = props;
    const mdate = moment(date).locale('es');
    const divRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
        if (type === 'alldayCells') {
            return;
        }
        const mNow = moment(new Date).add(1, 'hour');
        if (divRef.current && mdate < mNow ) {
            const { parentElement: divParent } = divRef.current;
            if (divParent) {
                const { parentElement: tdCell } =  divParent;
                if (tdCell) {
                    tdCell.classList.add('cell-template-hour-disabled');
                }
            }
        }
    }, []);

    if (type === 'alldayCells') {
        return <></>;
    }

    return (
        <div ref={divRef} className="cell-template-hour">{mdate.format('hh:mm a')}</div>
    );
}

export default ScheduleCellTemplate;
