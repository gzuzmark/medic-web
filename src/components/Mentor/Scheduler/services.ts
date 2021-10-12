import { IAppoitmentData, IItemApiSchedule } from "./interfaces";
import { v4 as uuidv4 } from 'uuid';

export const mapApiResponse = (items: any[], user: any): IAppoitmentData[] => {
    const schedules = items.map<IAppoitmentData>(
        (item: IItemApiSchedule) => ({
            Guid: null,
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
        Guid: null,
        Id: uuidv4(),
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

export const isValidSlotInApppointments = (args: any, data: any[]) => {
    return isValidSlotWhenOccupied(args, data);
}

export const isValidSlotWhenOccupied = (args: any, data: any[]) => {
    const { startTime, endTime } = args;
    const totalSlots = data.filter((slot) => {
        return ((slot.StartTime >= startTime && slot.StartTime < endTime) ||
                (slot.StartTime <= startTime && slot.EndTime >= endTime) ||
                (slot.EndTime > startTime && slot.EndTime <= endTime))
    });
    return totalSlots.length === 0;
}

export const isDateValid = (from: Date) => new Date() < from;
