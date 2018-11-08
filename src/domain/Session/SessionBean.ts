import {AbstractDateParser} from "../DateManager/AbstractDateParser";

export const SESSION_STATUS = {
    ATTENDED: 'ATTENDED',
    EXPIRED: 'CADUCED',
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
    location?: {
        id: string,
        site: string,
        room: string,
        address: string,
        status: string,
        maxStudents: number,
        location: string
    }
    sessionUrl?: string;
}


export interface ISessionBase {
    id?: string;
    from: string;
    to: string;
    location?: ISessionLocation;
    skill?: ISessionItemBase;
    isActive?: boolean;
}
export const SESSION_VIRTUAL = "VIRTUAL";
export const SESSION_UNDEFINED = "UNDEFINED";
export const SESSION_PHYSICAL = "PHYSICAL";

export class SessionBean {
    public session: ISessionBase;

    constructor(session: ISessionBase) {
        this.session = session;
    }

    public getTime(dateFormatter: AbstractDateParser): string {
        return `${dateFormatter.parseDateToString(this.session.from, "h:mm a")} - ${dateFormatter.parseDateToString(this.session.to, "h:mm a")}`;
    }

    public isVirtual(): boolean {
        return !!this.session.location && this.session.location.type === SESSION_VIRTUAL;
    }

    public getLocation(): string {
        let location = '';
        if (!!this.session.location && this.isVirtual()) {
            location = this.session.location.sessionUrl ? this.session.location.sessionUrl : '';
        } else if (this.session.location) {
            location = this.session.location.location ? this.session.location.location.location : '';
        }

        return location;
    }

    public getStatus() {
        let text = 'pending';
        const from = new Date(this.session.from);
        const to = new Date(this.session.to);
        const now = new Date();
        if (now.getTime() <= to.getTime() && now.getTime() >= from.getTime()) {
            text = 'active';
        } else if (!this.session.isActive) {
            text = 'resolve';
        }
        return text;
    }
}
