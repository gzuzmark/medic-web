import { IAppoitmentData, IItemApiSchedule } from "./interfaces";

export const mapApiResponse = (items: any[], user: any): IAppoitmentData[] => {
    const schedules = items.map<IAppoitmentData>(
        (item: IItemApiSchedule) => ({
            Id: item.id,
            Subject: '',
            StartTime: new Date(item.from),
            EndTime: new Date(item.to),
            IsReadonly: !isDateValid(new Date(item.from)),
            Session: {
                id: item.id,
                from: new Date(item.from),
                to: new Date(item.to),
                status: item.status || 'SCHEDULED',
            },
            Mode: 'VIEW',
            Doctor: {
                id: item.doctor_id,
                name: item.doctor_name,
                lastname: item.doctor_last_name,
                gender: item.doctor_gender,
                userId: item.user_id,
            },
            Patient: item.patient_id ? {
                id: item.patient_id,
                name: item.patient_name,
                lastname: item.patient_last_name,
                secondLastname: item.patient_second_last_name,
            }: null,
        })
    );
    return schedules;
}

export const changeDataToModeEdit = (data: IAppoitmentData[]): IAppoitmentData[] => {
    return data.map<IAppoitmentData>((item: IAppoitmentData) => {
        return {
            ...item,
            Mode: 'EDIT',
        };
    });
}

export const createTemporalAppointment = (startTime: Date, endTime: Date): IAppoitmentData => {
    return {
        Id: null,
        Subject: '',
        StartTime: startTime,
        EndTime: endTime,
        IsReadonly: false,
        Doctor: null,
        Patient: null,
        Session: null,
        Mode: 'EDIT',
    };
}

export const isDateValid = (from: Date) => new Date() < from;
