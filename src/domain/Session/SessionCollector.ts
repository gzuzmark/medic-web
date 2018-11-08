import { SessionBean } from "./SessionBean";

export interface IBoxDayDescription {
    topText: string;
    mainText: string;
    bottomText: string;
}

export interface ISessionCollector<T> {
    description: IBoxDayDescription;
    status: string;
    date: string;
    pending_sessions: T[];
    resolve_sessions: T[];
}

export class SessionCollector<T extends SessionBean> {
    public sessions: T[];
    public sessionCollector: Array<ISessionCollector<T>>;
    public monthFormatter = new Intl.DateTimeFormat("es", { month: "long" });
    public selectedDate: string;
    public firstEnableDate: string;
    public initDay: number;
    private daysInWeek = 7;
    constructor(sessions: T[], selectedDate: string, initDay: number) {
        // , private createSession: { new(...args : any[]): T; }
        // new this.createSession(sessions);
        this.sessions = sessions;
        this.selectedDate = selectedDate;
        this.sessionCollector = [];
        this.firstEnableDate = "";
        this.initDay = initDay;
        this.buildStructure();
        this.filterSessions(this.sessions);
        this.orderSessions();
    }

    public getSessionsFrom(day: number) {
        let selectedDay = day - this.initDay;
        // tslint:disable:no-console
        console.log(selectedDay)
        selectedDay = selectedDay < 0 ? 6 : selectedDay;
        return this.sessionCollector[selectedDay];
    }

    public getRangeDays() {
        return this.sessionCollector.map((item: ISessionCollector<T>) => {
            return {
                date: item.date,
                description: item.description,
                status: item.status
            }
        })
    }

    public getFirstDate(currentWeek: boolean) {
        return currentWeek ?
            new Date() :
            new Date(this.firstEnableDate);
    }

    private orderSessions() {
        this.sessionCollector.sort((itemA, itemB) => {
            const dateA = new Date(itemA.date);
            const dateB = new Date(itemB.date);
            return dateA.getTime() - dateB.getTime();
        })
    }

    private filterSessions(sessions: T[]) {
        sessions.forEach((item: T) => {
            const date = new Date(item.session.from);
            const collector = this.sessionCollector[date.getDay()];
            if (collector) {
                collector.status = 'default';
                if (item.session.isActive) {
                    collector.pending_sessions.push(item);
                } else {
                    collector.resolve_sessions.push(item);
                }
            }
        });
    }

    private buildStructure() {
        const date = new Date(this.selectedDate);
        for (let index = this.initDay; index < this.initDay + this.daysInWeek; index++) {
            if (index === 1) {
                this.firstEnableDate = date.toString();
            }

            const month = this.monthFormatter.format(date);
            const day = index === 7 ? 0 : index;
            this.sessionCollector[day] = {
                date: date.toISOString(),
                description: {
                    bottomText: month[0].toUpperCase() + month.slice(1),
                    mainText: date.getDate().toString(),
                    topText: this.getStringDay(index)
                },
                pending_sessions: [] as T[],
                resolve_sessions: [] as T[],
                status: "disabled"
            };
            date.setDate(date.getDate() + 1);
        }
    }

    private getStringDay(index: number): string {
        let day = '';
        switch (index % this.daysInWeek) {
            case 0:
                day = 'Domingo';
                break;
            case 1:
                day = 'Lunes';
                break;
            case 2:
                day = 'Martes';
                break;
            case 3:
                day = 'Miércoles';
                break;
            case 4:
                day = 'Jueves';
                break;
            case 5:
                day = 'Viernes';
                break;
            case 6:
                day = 'Sábado';
                break;
        }
        return day;
    }
}
