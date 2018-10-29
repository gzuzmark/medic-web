import * as moment from 'moment';
import * as React from 'react';
import Icon from "../../../../../common/Icon/Icon";
import {IRangeDay} from "../../MentorHome";
import DayBox from "../DayBox/DayBox";

interface IPropsDayHandlerBar {
    loading: boolean;
    selectedDate: string;
    rangeDays: IRangeDay[];
    onChangeWeek(from: Date): void;
    onChangeDate(selectedDay: number): void;
}


class DayHandlerBar extends React.Component<IPropsDayHandlerBar, {}> {
    private currentDate: moment.Moment;

    constructor(props: any) {
        super(props);
        this.currentDate = moment(this.props.selectedDate);
        this.beforeWeek = this.beforeWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.triggerClick = this.triggerClick.bind(this);
    }

    public render() {
        return(
            <React.Fragment>
                <div>
                    <button onClick={this.beforeWeek}><Icon name="navigation-arrow"/></button>
                    {this.props.rangeDays.map((day: IRangeDay, index) => {
                        const click = this.triggerClick(index);
                        return (
                            <DayBox
                                status={day.status}
                                description={day.description}
                                click={click}
                                key={"DayHandlerBar_" + index} />
                        )
                    })}
                    <button onClick={this.nextWeek}><Icon name="navigation-arrow"/></button>
                </div>
            </React.Fragment>
        )
    }

    private triggerClick(day: number) {
        return () => {
            this.props.onChangeDate(day);
        }
    }

    private beforeWeek() {
        const from = this.currentDate.subtract(1, 'weeks').toDate();
        this.props.onChangeWeek(from)
    }

    private nextWeek() {
        const to = this.currentDate.add(1, 'weeks').toDate();
        this.props.onChangeWeek(to)
    }
}

export default DayHandlerBar;