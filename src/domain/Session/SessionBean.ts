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

    public getTime(): string {
        return `${this.session.from} - ${this.session.to}`;
    }

    /*

    Abtract Class
    --------------

    public numero_zapatos(){
        let n=this.get_num_piernas();
    }

    public abstract get_num_piernas(): number;

    */
}