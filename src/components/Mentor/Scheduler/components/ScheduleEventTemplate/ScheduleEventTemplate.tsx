import * as moment from 'moment';
import * as React from 'react';
import { IAppoitmentData, IPatient } from '../../interfaces';
import { CitaNoReservadaPast, CitaNoReservada, CitaReservadaPast, HourDiv, HourPatiendDiv, PatientDiv, CitaReservadaWithPatient, HourPastDiv, CitaReservadaEditPast, CitaReservadaWithPatientEdit, CloseIcon } from './ScheduleStyled';
import * as Close from '../../../../../assets/images/close-deleted.png';

const getTimeString = (value: any) => {
    const appointmentDate = new Date(value);
    return appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const timesToString = (startTime: Date, endTime: Date): string => {
    return `${getTimeString(startTime)} - ${getTimeString(endTime)}`;
}

const patientToString = (patient: IPatient): string => {
    const { name, lastname } = patient;
    return `${name} ${lastname}`;
}

interface IScheduleEventTemplateProps extends IAppoitmentData {
    onDeleted: (Id: string | null) => void;
}

const ScheduleEventTemplate = (props: IScheduleEventTemplateProps) => {
    const { StartTime, EndTime, Patient, Session, Mode, Id, onDeleted } = props;
    const limitNow = moment().add(1, 'hour');

    const onClickDelete = () => {
        if (Session === null) {
            onDeleted(Id);
        }
    }

    // PAST

    if (moment(StartTime) < limitNow) {
        if (!Patient) {
            return (
                <CitaNoReservadaPast>
                    <HourPastDiv>{timesToString(StartTime, EndTime)}</HourPastDiv>
                </CitaNoReservadaPast>
            );
        }
        if (Mode === 'EDIT') {
            return (
                <CitaReservadaEditPast>
                    <HourPatiendDiv>{timesToString(StartTime, EndTime)}</HourPatiendDiv>
                    <PatientDiv>{patientToString(Patient)}</PatientDiv>
                </CitaReservadaEditPast>
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
        if (Mode === 'EDIT') {
            return (
                <CitaReservadaWithPatientEdit>
                    <HourPatiendDiv>{timesToString(StartTime, EndTime)}</HourPatiendDiv>
                    <PatientDiv>{patientToString(Patient)}</PatientDiv>
                </CitaReservadaWithPatientEdit>
            );
        }
        return (
            <CitaReservadaWithPatient>
                <HourPatiendDiv>{timesToString(StartTime, EndTime)}</HourPatiendDiv>
                <PatientDiv>{patientToString(Patient)}</PatientDiv>
            </CitaReservadaWithPatient>
        );
    }

    return (
        <CitaNoReservada>
            { (Mode === 'EDIT' && Session === null ) && <CloseIcon alt={'delete'} src={Close} width={12} onClick={onClickDelete} />}
            <HourDiv>{timesToString(StartTime, EndTime)}</HourDiv>
        </CitaNoReservada>
    );
}

export default ScheduleEventTemplate;
