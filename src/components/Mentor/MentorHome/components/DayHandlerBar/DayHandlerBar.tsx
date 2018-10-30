import * as moment from 'moment';
import * as React from 'react';
import Icon from "../../../../../common/Icon/Icon";
import {IRangeDay} from "../../MentorHome";
import CardDay from "../CardDay/CardDay";
import './DayHandlerBar.scss';

interface IPropsDayHandlerBar {
    loading: boolean;
    selectedDate: string;
    weekDate: string;
    rangeDays: IRangeDay[];
    counter: number;
    onChangeWeek(from: string, counter: number): void;
    onChangeDate(selectedDate: string): void;
}


class DayHandlerBar extends React.Component<IPropsDayHandlerBar, {}> {
    private selectedDate: moment.Moment;
    private weekDate: moment.Moment;

    constructor(props: any) {
        super(props);
        this.beforeWeek = this.beforeWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.triggerClick = this.triggerClick.bind(this);
    }

    public render() {
        let buttonPrevOpts = {};
        let buttonNextOpts = {};
        if (this.props.counter >= 1) {
            buttonNextOpts = {
                disable: "true"
            }
        } else if (this.props.counter <= -1) {
            buttonPrevOpts = {
                disable: "true"
            }
        }
        this.selectedDate = moment(this.props.selectedDate);
        this.weekDate = moment(this.props.weekDate);
        return(
            <div className="DayHandlerBar">
                <button className="DayHandlerBar_button DayHandlerBar_button--left"
                        onClick={this.beforeWeek} {...buttonPrevOpts}>
                    <Icon name="navigation-arrow" />
                </button>
                {this.props.rangeDays.map((day: IRangeDay, index) => {
                    const click = this.triggerClick(day.date);
                    let status = day.status;
                    if (this.selectedDate.format("YYYY-MM-DD") === moment(day.date).format("YYYY-MM-DD")) {
                        status = 'active';
                    }
                    return (
                        <CardDay
                            status={status}
                            description={day.description}
                            click={click}
                            key={"DayHandlerBar_" + index} />
                    )
                })}
                <button className="DayHandlerBar_button DayHandlerBar_button--right"
                        onClick={this.nextWeek} {...buttonNextOpts}>
                    <Icon name="navigation-arrow"/>
                </button>
            </div>
        )
    }

    private triggerClick(day: string) {
        return () => {
            this.props.onChangeDate(day);
        }
    }

    private beforeWeek() {
        if (this.props.counter > -1) {
            const from = this.weekDate.subtract(1, 'weeks').toDate();
            this.props.onChangeWeek(from.toISOString(), -1)
        }
    }

    private nextWeek() {
        if (this.props.counter < 1) {
            const to = this.weekDate.add(1, 'weeks').toDate();
            this.props.onChangeWeek(to.toISOString(), 1)
        }
    }
}

export default DayHandlerBar;