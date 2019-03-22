import * as moment from 'moment';
import * as React from 'react';
import Icon from "../../../../../common/Icon/Icon";
import {MomentDateParser} from "../../../../../domain/DateManager/MomentDateParser";
import {STATUS_DAY_SESSIONS} from "../../../../../domain/Session/SessionCollector";
import {IRangeDay} from "../../MentorHome";
import CardDay from "../CardDay/CardDay";
import './DayHandlerBar.scss';

interface IPropsDayHandlerBar {
    daysBar: IDayHandlerBar;
    loading: boolean;
    selectedDate: string;
    onChangeWeek(from: string, counter: number): void;
    onChangeDate(selectedDate: string): void;
}

export interface IDayHandlerBar {
    weekDate: string;
    rangeDays: IRangeDay[];
    counter: number;
}

class DayHandlerBar extends React.Component<IPropsDayHandlerBar, {}> {
    private weekDate: moment.Moment;
    private mdp: MomentDateParser;
    constructor(props: any) {
        super(props);
        this.beforeWeek = this.beforeWeek.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.triggerClick = this.triggerClick.bind(this);
        this.mdp = new MomentDateParser();
    }

    public render() {
        let buttonPrevOpts = {};
        let buttonNextOpts = {};
        if (this.props.daysBar.counter >= 1) {
            buttonNextOpts = {
                disable: "true"
            }
        } else if (this.props.daysBar.counter <= -1) {
            buttonPrevOpts = {
                disable: "true"
            }
        }
        this.weekDate = moment(this.props.daysBar.weekDate);
        const leftButton = this.props.daysBar.counter === -1 || this.props.loading ? 'DayHandlerBar_button--disabled' : '';
        const rightButton =  this.props.daysBar.counter === 1 || this.props.loading? 'DayHandlerBar_button--disabled' : '';
        return(
            <div className="DayHandlerBar">
                <button className={`DayHandlerBar_button DayHandlerBar_button--left ${leftButton}`}
                        onClick={this.beforeWeek} {...buttonPrevOpts}>
                    <Icon name="navigation-arrow" />
                </button>
                {this.props.daysBar.rangeDays.map((day: IRangeDay, index) => {
                    const click = this.triggerClick(day.date);
                    let status = day.status;
                    if (this.props.loading) {
                        status = STATUS_DAY_SESSIONS.DISABLED
                    } else if (this.mdp.isSameDate(this.props.selectedDate, day.date)) {
                        status = STATUS_DAY_SESSIONS.ACTIVE;
                    }
                    const today = this.props.daysBar.counter === 0 && this.mdp.isDateToday(day.date);
                    return (
                        <CardDay
                            status={status}
                            description={day.description}
                            click={click}
                            today={today}
                            key={"DayHandlerBar_" + index} />
                    )
                })}
                <button className={`DayHandlerBar_button DayHandlerBar_button--right ${rightButton}`}
                        onClick={this.nextWeek} {...buttonNextOpts}>
                    <Icon name="navigation-arrow"/>
                </button>
            </div>
        )
    }

    private triggerClick(day: string) {
        return () => {
            if (!this.props.loading) {
                this.props.onChangeDate(day);
            }
        }
    }

    private beforeWeek() {
        if (this.props.daysBar.counter > -1 && !this.props.loading) {
            const from = this.weekDate.subtract(1, 'weeks').toDate();
            this.props.onChangeWeek(from.toISOString(), -1)
        }
    }

    private nextWeek() {
        if (this.props.daysBar.counter < 1 && !this.props.loading) {
            const to = this.weekDate.add(1, 'weeks').toDate();
            this.props.onChangeWeek(to.toISOString(), 1)
        }
    }
}

export default DayHandlerBar;
