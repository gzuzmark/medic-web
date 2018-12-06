import {AbstractDateParser} from "../DateManager/AbstractDateParser";

export const SESSION_STATUS = {
    ATTENDED: 'ATTENDED',
    AVAILABLE: 'AVAILABLE',
    CADUCED: 'CADUCED',
    NO_ATTENDED: 'NO_ATTENDED',
    RATED: 'RATED',
    SCHEDULED: 'SCHEDULED',
};

export interface ISessionItemBase {
    id: string;
    name: string;
}

export interface ISessionLocation {
    typeLabel: string;
    type: string;
    room?: {
        id: string,
        site: string,
        siteId: string,
        roomString: string,
        address: string,
        status: string,
        maxStudents: number,
        room: string
    }
    sessionUrl?: string;
}


export interface ISessionBase {
    id?: string;
    from: string;
    to: string;
    room?: ISessionLocation;
    skill?: ISessionItemBase;
    isActive?: boolean;
}
export const SESSION_VIRTUAL = "VIRTUAL";
export const SESSION_UNDEFINED = "UNDEFINED";
export const SESSION_PHYSICAL = "PHYSICAL";

export const SESSION_LIFE = {
    ACTIVE: 'active',
    PENDING: 'pending',
    RESOLVE: 'resolve'
}

export class SessionBean {
    public session: ISessionBase;

    constructor(session: ISessionBase) {
        this.session = session;
    }

    get skillName() {
        let name = '';
        if (this.session.skill) {
            name = this.session.skill.name;
        }
        return name;
    }

    get isCurrentAccordingTime() {
        const from = new Date(this.session.from);
        const to = new Date(this.session.to);
        const now = new Date();
        return now.getTime() <= to.getTime() && now.getTime() >= from.getTime()
    }

    get isActiveAccordingTime() {
        const to = new Date(this.session.to);
        const now = new Date();
        return to.getTime() > now.getTime()
    }

    public getTime(dateFormatter: AbstractDateParser): string {
        return `${dateFormatter.parseDateToString(this.session.from, "h:mm a")} - ${dateFormatter.parseDateToString(this.session.to, "h:mm a")}`;
    }

    public getDate(dateFormatter: AbstractDateParser): string {
        return `${dateFormatter.parseDateToString(this.session.from, "dddd DD [de] MMMM")}`;
    }

    public isVirtual(): boolean {
        return !!this.session.room && this.session.room.type === SESSION_VIRTUAL;
    }

    public isPhysical(): boolean {
        return !!this.session.room && this.session.room.type === SESSION_PHYSICAL;
    }

    public getLocation(): string {
        let location = '';
        if (!!this.session.room && this.isVirtual()) {
            location = this.session.room.sessionUrl ? this.session.room.sessionUrl : '';
        } else if (this.session.room) {
            location = this.session.room.room ? this.session.room.room.roomString : '';
        }

        return location;
    }

    public getSessionType() {
        let type = '';
        if (this.isVirtual()) {
            type = 'virtual';
        } else if (this.isPhysical()) {
            type = 'presencial';
        } else {
            type = 'indefinido'
        }
        return `Sesión ${type}`;
    }

    public getStatus() {
        let text = SESSION_LIFE.PENDING;
        if (this.isCurrentAccordingTime) {
            text = SESSION_LIFE.ACTIVE;
        } else if (!this.session.isActive) {
            text = SESSION_LIFE.RESOLVE;
        }
        return text;
    }
}
