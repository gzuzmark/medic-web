import {ISessionBase, SESSION_STATUS, SessionBean} from "./SessionBean";

export interface ISessionAvailability {
    limit: number;
    count: number;
}

export interface ISessionMentor extends ISessionBase {
    availability?: ISessionAvailability;
    isEnabledForAttendance?: boolean;
    status?: string;
}
export const minuteTime = 14000;

export class SessionMentorBean extends SessionBean {
    public session: ISessionMentor;

    constructor(session: ISessionMentor) {
        super(session);
        this.session = session;
    }

    get isDisabled(): boolean {
        return (
            this.session.status !== SESSION_STATUS.RATED &&
            this.session.status !== SESSION_STATUS.SCHEDULED &&
            this.session.status !== SESSION_STATUS.ATTENDED
        )
    }

    get isNoAttended() {
        return this.session.status === SESSION_STATUS.NO_ATTENDED;
    }

    get isDisableNoAttended() {
        const current = new Date()
        const to = new Date(this.session.to);

        const enableNoAttended = minuteTime * 15;
        const isEnableNoAttended = to.getTime() - current.getTime() <= enableNoAttended;
        return this.isNoAttended && isEnableNoAttended
    }

    public setAsNoAttended() {
        this.session.status = SESSION_STATUS.NO_ATTENDED;
    }

    public setAsAttended() {
        if (this.session.status === SESSION_STATUS.SCHEDULED) {
            this.session.status = SESSION_STATUS.ATTENDED
        }
    }

    public incrementStudent() {
        if (this.session.availability) {
            ++this.session.availability.count;
        }
        this.setAsAttended();
    }

    public getTotalStudents(): number {
        let total = 0;
        if (this.session.availability) {
            total = this.session.availability.count;
        }
        return total;
    }

    public getAvailability(): string {
        let text = 'alumno inscrito';
        let count = 0;
        let limit = 0;
        if (this.session.availability) {
            count = this.session.availability.count;
            limit = this.session.availability.limit;
        }

        if (limit > 1) {
            text = 'alumnos inscritos'
        }
        return `${count} de ${limit} ${text}`;
    }
}
