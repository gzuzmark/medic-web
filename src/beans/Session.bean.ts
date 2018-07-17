import {lpad} from '../common/ConsoleUtils';
import { IListItem } from '../common/FilterList/FilterList';
import {ISession, ISessionSchedule} from '../interfaces/Session.interface';
import {SESSION_VIRTUAL} from "../repository/SessionTypeConstants";

export class SessionBean implements ISession {
    public from = new Date();
    public to = new Date();
    public type = '';
    public credits = 0;
    public location = '';
    public maxStudents: number;
    public mentorId = '';
    public sessions = [] as ISessionSchedule[];
    public skillId = '';
    public skillName = '';

    constructor(session?: ISession) {
        if (session) {
            this.from = session.from;
            this.to = session.to;
            this.type = session.type;
            this.credits = session.credits;
            this.location = session.location;
            this.maxStudents = session.maxStudents;
            this.mentorId = session.mentorId;
            this.sessions = session.sessions;
            this.skillId = session.skillId;
            this.skillName = session.skillName || '';
        } else {
            const date = new Date();
            const endOfWeek = 6 - date.getDay() + 1;
            date.setDate(date.getDate() + endOfWeek);
            this.from = new Date();
            this.to = date;
            this.maxStudents = 1;
        }
    }

    public typeName(listType: IListItem[]): string {
        const type = listType.filter(item => item.id === this.type);
        return type.length === 1 ? type[0].name : '';
    }

    get listSessions(): ISessionSchedule[] {
        const list = this.sessions.map((item) => {
            const initialDay = new Date(this.from);
            const from = this.getTime(initialDay, item.from);
            const to = this.getTime(initialDay, item.to);
            let weekDay = this.hasDayChange(initialDay, item.to) ? item.weekDay - 1: item.weekDay;
            weekDay = weekDay > 7 ? 1 : weekDay;
            return {
                from,
                to,
                weekDay,
            }
        });
        return  list;
    }

    public updateUTCSessions(values: ISessionSchedule[]): ISessionSchedule[] {
        this.sessions = values.map((item: ISessionSchedule):ISessionSchedule => {
            const initialDay = new Date(this.from);
            const from = this.getUTCTime(initialDay, item.from);
            const to = this.getUTCTime(initialDay, item.to);
            let weekDay = this.hasDayChange(initialDay, item.to) ? item.weekDay + 1 : item.weekDay ;
            weekDay = weekDay > 7 ? 1 : weekDay;
            return {
                from,
                to,
                weekDay,
            }
        });
        return this.sessions;
    }

    public isValid() {
        return this.from < this.to &&
               this.type !== '' &&
               (this.location !== '' || this.type === SESSION_VIRTUAL) &&
               this.maxStudents > 0 &&
               this.mentorId !== '' &&
               this.sessions.length > 0 &&
               this.skillId !== '';
    }

    private getTime(initialDay: Date, utcTime: string) {
        const time = utcTime.split(':');
        const hour = Number(time[0]);
        const minutes = Number(time[1]);
        initialDay.setUTCHours(hour, minutes);
        return `${lpad(initialDay.getHours(), 2)}:${lpad(initialDay.getMinutes(), 2)}:00`;
    }

    private hasDayChange(initialDay: Date, utcTime: string) {
        const time = utcTime.split(':');
        const hour = Number(time[0]);
        const minutes = Number(time[1]);
        initialDay.setHours(hour, minutes);
        return initialDay.getUTCHours() < initialDay.getHours();
    }

    private getUTCTime(initialDay: Date, utcTime: string) {
        const time = utcTime.split(':');
        const hour = Number(time[0]);
        const minutes = Number(time[1]);
        initialDay.setHours(hour, minutes);
        return `${lpad(initialDay.getUTCHours(), 2)}:${lpad(initialDay.getUTCMinutes(), 2)}:00`;
    }

}
