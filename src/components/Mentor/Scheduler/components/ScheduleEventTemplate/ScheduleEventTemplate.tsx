import * as React from 'react';
import { IAppoitmentData } from '../../interfaces';

const getTimeString = (value: any) => {
    const appointmentDate = new Date(value);
    return appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const ScheduleEventTemplate = (data: IAppoitmentData) => {
    console.log(data);
    return (
        <div
            className="template-wrap"
            style={{ background: '#adb7c4' }}
            // !args.HasPatient ? args.SecondaryColor :
        >
            { data.Patient &&
                <div className="subject">
                    {data.Patient.name} {data.Patient.lastname}
                </div>
            }
            <div
                className="time"
            >
                {getTimeString(data.StartTime)} -{" "}
                {getTimeString(data.EndTime)}
            </div>
        </div>
    )
}

export default ScheduleEventTemplate;
