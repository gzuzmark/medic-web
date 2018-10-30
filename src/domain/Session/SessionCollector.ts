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
    constructor(sessions: T[], selectedDate: string) {
        // , private createSession: { new(...args : any[]): T; }
        // new this.createSession(sessions);
        this.sessions = sessions;
        this.selectedDate = selectedDate;
        this.sessionCollector = [];
        this.buildStructure();
        this.filterSessions(this.sessions);
    }

    public getSessionsFrom(day: number) {
        return this.sessionCollector[day];
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

    private filterSessions(sessions: T[]) {
        sessions.forEach((item: T) => {
            const date = new Date(item.session.to);
            const collector = this.sessionCollector[date.getDay()];
            collector.status = "default" ;
            if (item.session.isActive) {
                collector.pending_sessions.push(item);
            } else {
                collector.resolve_sessions.push(item);
            }
        })
    }

    private buildStructure() {
        const date = new Date(this.selectedDate);
        for (let index = 0; index < 7; index++) {
            const month = this.monthFormatter.format(new Date(this.selectedDate));
                this.sessionCollector[index] = {
                    date: date.toString(),
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
        switch (index) {
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