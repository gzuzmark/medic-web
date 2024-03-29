import { AbstractDateParser } from "../DateManager/AbstractDateParser";
import { IBaseUser } from "../User/AbstractUser";
import { ISessionPatient } from "./SessionMentorBean";

export const SESSION_STATUS = {
    ATTENDED: 'ATTENDED',
    AVAILABLE: 'AVAILABLE',
    CADUCED: 'CADUCED',
    NO_ATTENDED: 'NO_ATTENDED',
    RATED: 'RATED',
    SCHEDULED: 'SCHEDULED',
};

export interface ISessionConsult {
    has_treatments: boolean;
    has_prescription: boolean;
    medicalLeaveEndDate: string | null,
    medicalLeaveStartDate: string | null,
    medicalLeaveIndication?: string,
    prescriptionPath: string | null | undefined;
    url_medical_exams: string | null |undefined;
    url_medical_leave: string | null |undefined;
    url_interconsult: string | null |undefined;
    url_medical_certificate: string | null |undefined;
}

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

export interface ISessionPaginated {
    pageSize: number;
    totalItems: number;
    currentPage: number;
    items: ISessionBody[];
}

export interface ISessionBody extends ISessionBase {
    doctor: IBaseUser;
    patient: ISessionPatient;
    patient_link: string;
    paid: string;
}

export interface ISessionPayment {
    paid: string;
    pending: boolean;
    cipUrl: string;
    benefit_id: string | null;
    company_benefit_name: string | null;
}

export interface ISessionBase {
    id?: string;
    from: string; 
    to: string;
    location?: ISessionLocation;
    skill?: ISessionItemBase;
    isActive?: boolean;
    reservation_date?: string;
    consult?: ISessionConsult;
    payment: ISessionPayment;
}
export const SESSION_VIRTUAL = "VIRTUAL";
export const SESSION_UNDEFINED = "UNDEFINED";
export const SESSION_PHYSICAL = "PHYSICAL";

export const SESSION_LIFE = {
    ACTIVE: 'active',
    PENDING: 'pending',
    RESOLVE: 'resolve'
};

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

    public getAssistance() {
        const now = new Date();
        const date = new Date(this.session.from);
        const isConsult = !!this.session.consult && this.session.consult.has_treatments;
        if (date.getTime() < now.getTime() && !isConsult) {
            return 'No Asistió';
        } else if (date.getTime() <= now.getTime() && isConsult) {
            return 'Confirmada';
        } else if (date.getTime() > now.getTime()) {
            return 'Por Confirmar';
        }
        return '';
    }

    public isValidPrescription() {
        const isConsult = !!this.session.consult && this.session.consult.has_prescription;
        return isConsult;
    }
    public getURL_prescription(){
        if(!!this.session.consult){
           if(!! this.session.consult.prescriptionPath){
               return this.session.consult.prescriptionPath
           }
        }
        return null
    }
    public getMedicalLeave(){
        if(!!this.session.consult){
            if(!! this.session.consult.url_medical_leave){
                return this.session.consult.url_medical_leave
            }
            }
        return null
    }
    public getMedicalExams(){
        if(!!this.session.consult){
            if(!! this.session.consult.url_medical_exams){
                return this.session.consult.url_medical_exams
            }
            }
        return null
    }
    public getInterconsult(){
        if(!!this.session.consult){
            if(!! this.session.consult.url_interconsult){
                return this.session.consult.url_interconsult
            }
            }
        return null
    }
    public getMedicalCertificate(){
        if(!!this.session.consult){
            if(!! this.session.consult.url_medical_certificate){
                return this.session.consult.url_medical_certificate
            }
            }
        return null
    }
    public getReservationDate(dateFormatter: AbstractDateParser): string {
        if (!this.session.reservation_date) {
            return '';
        }
        return `${dateFormatter.parseDateToString(this.session.reservation_date, "DD [de] MMMM")}`;
    }

    public getReservationTime(dateFormatter: AbstractDateParser): string {
        if (!this.session.reservation_date) {
            return '';
        }
        return `${dateFormatter.parseDateToString(this.session.reservation_date, "h:mm a")}`;
    }

    public getTime(dateFormatter: AbstractDateParser): string {
        return `${dateFormatter.parseDateToString(this.session.from, "h:mm a")} - ${dateFormatter.parseDateToString(this.session.to, "h:mm a")}`;
    }

    public getDate(dateFormatter: AbstractDateParser): string {
        return `${dateFormatter.parseDateToString(this.session.from, "dddd, DD [de] MMMM")}`;
    }

    public getShorterDay(dateFormatter: AbstractDateParser): string {
        return `${dateFormatter.parseDateToString(this.session.from, "DD [de] MMMM")}`;
    }

    public getFromTime(dateFormatter: AbstractDateParser): string {
        return `${dateFormatter.parseDateToString(this.session.from, "h:mm a")}`;
    }

    public isVirtual(): boolean {
        return !!this.session.location && this.session.location.type === SESSION_VIRTUAL;
    }

    public isPhysical(): boolean {
        return !!this.session.location && this.session.location.type === SESSION_PHYSICAL;
    }

    public isUndefined(): boolean {
        return !!this.session.location && this.session.location.type === SESSION_UNDEFINED;
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

    public getLocationV2(): string {
        const sessionId = this.session.id;
        if (sessionId) {
            return `${process.env.REACT_APP_CONFERENCE_BASE_URL}?room=${sessionId}&passcode=${process.env.REACT_APP_CONFERENCE_CODE}&doctor=1`;
        }
        return '';
    }

    public getSessionType(text?: string) {
        const before = text ? text + ' ' : '';
        let type = '';
        if (this.isVirtual()) {
            type = 'virtual';
        } else if (this.isPhysical()) {
            type = 'presencial';
        } else {
            type = 'indefinido'
        }
        return `${before}${type}`;
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
