export interface ISessionItemBase {
    id: string;
    name: string;
}

export interface ISessionLocation {
    typeLabel: string;
    type: string;
}

export interface ISessionBase {
    id?: string;
    from: string;
    to: string;
    location?: ISessionLocation;
    skill?: ISessionItemBase;
    isActive?: boolean;
}

export class SessionBean {
    public session: ISessionBase;

    constructor(session: ISessionBase) {
        this.session = session;
    }
}