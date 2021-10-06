export interface IItemApiSchedule {
    doctor_gender: string;
    doctor_id: string;
    doctor_last_name: string;
    doctor_link: string;
    doctor_name: string;
    from: string;
    id: string;
    patient_document_number: string | undefined;
    patient_id: string | undefined;
    patient_last_name: string | undefined;
    patient_name: string | undefined;
    patient_second_last_name: string | undefined;
    status: SessionStatusType;
    to: string;
    user_id: string;
}

export interface IAppoitmentData {
    Id: string;
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    IsReadonly: boolean;
    Doctor: IDoctor;
    Patient: IPatient | null;
    Session: ISession;
    Mode: AppointmentMode;
}

export interface IDoctor {
    id: string;
    name: string;
    lastname: string;
    gender: string;
    userId: string;
}

export interface ISession {
    id: string;
    status: SessionStatusType;
    from: Date;
    to: Date;
}

export interface IPatient {
    id: string | undefined;
    name: string | undefined;
    lastname: string | undefined;
    secondLastname: string | undefined;
}

export type SessionStatusType = 'SCHEDULED' | '';
export type AppointmentMode = 'VIEW' | 'EDIT';
