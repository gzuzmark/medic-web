import { ISessionBase, SessionBean } from "./SessionBean";

export interface ISessionAvailability {
    limit: number;
    counter: number;
}

export interface ISessionMentor extends ISessionBase {
    availability?: ISessionAvailability;
    isEnabledForAttendance?: boolean;
    status?: string;
}

export class SessionMentorBean extends SessionBean {
    public session: ISessionMentor;

    constructor(session: ISessionMentor) {
        super(session);
        this.session = session;
    }

    public getAvailability(): string {
        let text = '';
        if (this.session.availability) {
            text = `${this.session.availability.counter} de ${this.session.availability.limit}`;
        }

        if (this.session.location && this.session.location.location && this.session.availability) {
            text = `${this.session.availability.counter} de ${this.session.location.location.maxStudents}`
        }
        return text;
    }
}