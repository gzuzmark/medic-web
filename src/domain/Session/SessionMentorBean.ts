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
}