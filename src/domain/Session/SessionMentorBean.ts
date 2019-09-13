import {ISessionBase, SESSION_STATUS, SessionBean} from "./SessionBean";

export interface ISessionAvailability {
    limit: number;
    count: number;
}

export interface ISessionMentor extends ISessionBase {
    availability?: ISessionAvailability;
    isEnabledForAttendance?: boolean;
    isEnabledForComment?: boolean;
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
        return !(
            this.session.status === SESSION_STATUS.RATED ||
            this.session.status === SESSION_STATUS.SCHEDULED ||
            this.session.status === SESSION_STATUS.ATTENDED
        )
    }

    get locationType(): string {
        let type = '';
        if (this.session.location) {
            type = this.session.location.type;
        }
        return type;
    }

    get isNoAttended() {
        return this.session.status === SESSION_STATUS.NO_ATTENDED;
    }

    get isDisableNoAttended() {
        return this.isNoAttended || !this.session.isEnabledForAttendance;
    }

    get isDisableAttended() {
        const current = new Date();
        const to = new Date(this.session.from);
        const sessionStart = to.getTime() - current.getTime() <= 0;
        return this.isNoAttended ||  !sessionStart;
    }

    public setAsNoAttended() {
        this.session.status = SESSION_STATUS.NO_ATTENDED;
    }

    public setAsAttended() {
        if (this.session.status === SESSION_STATUS.SCHEDULED) {
            this.session.status = SESSION_STATUS.ATTENDED
        }
    }

    public setAsScheduled() {
        if (this.session.status === SESSION_STATUS.AVAILABLE || this.session.status === SESSION_STATUS.CADUCED) {
            this.session.status = SESSION_STATUS.SCHEDULED
        }
    }

    public incrementStudent() {
        if (this.session.availability) {
            ++this.session.availability.count;
        }
        this.setAsScheduled();
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
