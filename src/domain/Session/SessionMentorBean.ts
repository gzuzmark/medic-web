import { ISessionBase, SessionBean } from "./SessionBean";

export interface ISessionAvailability {
    limit: number;
    count: number;
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
        let text = 'alumno inscrito';
        let count = 0;
        let limit = 0;
        if (this.session.availability) {
            count = this.session.availability.count;
            limit = this.session.availability.limit;
        }

        if (this.session.location && this.session.location.location && this.session.availability) {
            count = this.session.availability.count;
            limit = this.session.location.location.maxStudents;
        }

        if (limit > 1) {
            text = 'alumnos inscritos'
        }
        return `${count} de ${limit} ${text}`;
    }
}