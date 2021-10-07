import * as moment from 'moment';
import * as React from 'react';
import { IAppoitmentData, IPatient } from '../../interfaces';
import { CitaNoReservadaPast, CitaReservada, CitaReservadaPast, HourDiv, HourPatiendDiv, PatientDiv, CitaReservadaWithPatient, HourPastDiv } from './ScheduleStyled';

const getTimeString = (value: any) => {
    const appointmentDate = new Date(value);
    return appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const timesToString = (startTime: Date, endTime: Date): string => {
    return `${getTimeString(startTime)} - ${getTimeString(endTime)}`;
}

const patientToString = (patient: IPatient): string => {
    const { name, lastname, secondLastname } = patient;
    return `${name} ${lastname} ${secondLastname}`;
}

const ScheduleEventTemplate = (data: IAppoitmentData) => {
    const { StartTime, EndTime, Patient } = data;
    const limitNow = moment().add(1, 'hour');

    // PAST

    if (moment(StartTime) < limitNow) {
        if (!Patient) {
            return (
                <CitaNoReservadaPast>
                    <HourPastDiv>{timesToString(StartTime, EndTime)}</HourPastDiv>
                </CitaNoReservadaPast>
            );
        }
        return (
            <CitaReservadaPast>
                <HourPatiendDiv>{timesToString(StartTime, EndTime)}</HourPatiendDiv>
                <PatientDiv>{patientToString(Patient)}</PatientDiv>
            </CitaReservadaPast>
        );
    }

    // FUTURE

    if (Patient) {
        return (
            <CitaReservadaWithPatient>
                <HourPatiendDiv>{timesToString(StartTime, EndTime)}</HourPatiendDiv>
                <PatientDiv>{patientToString(Patient)}</PatientDiv>
            </CitaReservadaWithPatient>
        );
    }
    return (
        <CitaReservada>
            <HourDiv>{timesToString(StartTime, EndTime)}</HourDiv>
        </CitaReservada>
    );
}

export default ScheduleEventTemplate;
