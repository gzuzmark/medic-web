import { IAppoitmentData, IItemApiSchedule, ISessionCreate } from "./interfaces";
import { v4 as uuidv4 } from 'uuid';
import * as moment from "moment";
import MentorService from "src/services/Mentor/Mentor.service";

export const DAYS = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
};

export const FIRST_DAY_OF_WEEK = DAYS.SUNDAY;
export const DEFAULT_INTERVAL_MINUTES = 20;
export const WORKING_DAYS = [0, 1, 2, 3, 4, 5, 6];

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

export const isDateValid = (from: Date) => { 
    const nowLimit = moment(new Date()).add(1, 'hour');
    const mFrom = moment(from);
    return nowLimit < mFrom;
}

export const getRangeWeek = (date: Date): [Date, Date] => {
    const dayWeek = date.getDay();
    let leftDays = 0;
    let rightDays = 0;
    
    if (dayWeek >= FIRST_DAY_OF_WEEK) {
        leftDays = dayWeek - FIRST_DAY_OF_WEEK;
    } else {
        leftDays = dayWeek + 7 - FIRST_DAY_OF_WEEK;
    }
    rightDays = 6 - leftDays;

    const firstDate = moment(date).add(-leftDays, 'days').toDate();
    firstDate.setHours(0, 0, 0, 0);
    const lastDate = moment(date).add(rightDays, 'days').toDate();
	lastDate.setHours(23, 59, 59, 999);
    return [firstDate, lastDate];
}

export const removeItemFromAppointments = (data: IAppoitmentData[], remove: IAppoitmentData[]) => {
    if (remove.length === 0) {
        return [...data];
    }
    const idsRemove = remove.map((item) => item.Id);
    return [...(data.filter((item: IAppoitmentData) => {
        return !idsRemove.includes(item.Id);
    }))];
}



export const saveAppoitments = async (creates: any[], skillId: string, deletes: string[]): Promise<void> => {
    try {
        if (deletes.length > 0) {
            await deleteAppoitments(deletes);
        }
        if (creates.length > 0) {
            await createAppoitments(creates, skillId);
        }
    } catch (error) {
        console.error(error);
    }
}

const createAppoitments = (sessions: ISessionCreate[], skillId: string): Promise<any> => {
    const mentorService = new MentorService();
    const bulk = {
        credits: 0,
        interestAreaId: `${process.env.REACT_APP_INTEREST_AREA_ID}`,
        isWorkshop: false,
        maxStudents: 1,
        room: 1,
        sessions,
        skillId,
        type: 'VIRTUAL',
    };
    return mentorService.createSessionBulk(bulk);
}

const deleteAppoitments = (ids: string[]): Promise<any> => {
    const mentorService = new MentorService();
    return mentorService.deleteSession(ids);
}
