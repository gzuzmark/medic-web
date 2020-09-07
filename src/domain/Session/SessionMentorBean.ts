import { IBaseUser } from "../User/AbstractUser";
import { ISessionBase, SESSION_STATUS, SessionBean } from "./SessionBean";

export interface ISessionStudentUser extends IBaseUser {
    document: string;
    documentType: string;
    status: string;
}

export interface ISessionStudent {
    id: string;
    code: string;
    user: ISessionStudentUser;
}

export interface ISessionPatient {
    id?: string;
    name: string;
    last_name: string;
    second_last_name: string;
    email: string;
    phone: string;
    birthdate: string;
    gender: number;
    allergies: string;
    meds: string;
    extra_info: string;
    full_last_name: string;
    document_number: string;
    has_account: boolean;
    address: string;
    ubigeo: string;
}

export interface ITriageQuestion {
    id: string;
    question: string;
    answer: string;
}

export interface ITriageUseCase {
    id: string;
    title: string;
    description: string;
}

export interface ISessionTriage {
    id: string;
    questions: ITriageQuestion[];
    use_case: ITriageUseCase;
}

export interface ISessionTriageResponse {
    sessionId: string;
    triage: ISessionTriage;
}

export interface ISessionAvailability {
    limit: number;
    count: number;
}

export interface ISessionDoctor {
    id: string;
    cmp: string;
    description: string;
    name: string;
    last_name: string;
    speciality_name: string;
}

export interface IReassignSession {
    id: string;
    from: string;
    to: string;
}

export interface ISessionMentor extends ISessionBase {
    availability?: ISessionAvailability;
    isEnabledForAttendance?: boolean;
    isEnabledForComment?: boolean;
    status?: string;
    status_new?: string;
    student?: ISessionStudent;
    patient?: ISessionPatient;
    triage?: ISessionTriage;
}
export const minuteTime = 14000;

export class SessionMentorBean extends SessionBean {
    public session: ISessionMentor;

    constructor(session: ISessionMentor) {
        super(session);
        this.session = session;
    }

    get issueDate(): string {
        return this.session.from;
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
        return this.isNoAttended || !sessionStart;
    }

    public setSessionPatientTriage(patientCase?: ISessionTriageResponse) {
        this.session.triage = patientCase && patientCase.triage;
    }

    public filterStatusSession(status: string) {
        return this.session.status_new === status;
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
        let text = 'paciente inscrito';
        let count = 0;
        let limit = 0;
        if (this.session.availability) {
            count = this.session.availability.count;
            limit = this.session.availability.limit;
        }

        if (limit > 1) {
            text = 'pacientes inscritos'
        }
        return `${count} de ${limit} ${text}`;
    }

    public getPatientSubInfo(): string {
        const student = this.session.student;
        if (student) {
            const { name, lastname, email } = student.user;
            return `${name} ${lastname} (${email})`;
        }
        return '';
    }
}
