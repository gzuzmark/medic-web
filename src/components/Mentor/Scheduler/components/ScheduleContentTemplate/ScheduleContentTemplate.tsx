import * as React from 'react';
import { Link } from 'react-router-dom';

const getTimeString = (value: any) => {
    const appointmentDate = new Date(value);
    return appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const hide = true;

const ScheduleContentTemplate = (props: any) => {

    if (hide) {
        return <></>;
    }

    return (
        <div>
            {props.elementType === "cell" ? (
                <div className="e-cell-content e-template">
                    <form className="e-schedule-form">
                        <div className="content-area">
                            <input
                                className="e-subject e-field e-input"
                                type="text"
                                name="Subject"
                                placeholder="Agregar Título"
                                aria-placeholder="Agregar Título"
                            />
                        </div>

                        <div className="content-area">
                            <div className="e-date-time">
                                <div className="e-date-time-icon e-icons">
                                    {" "}
                                </div>
                                <div className="e-date-time-details e-text-ellipsis">
                                    {props.StartTime.toDateString()}
                                    {"("}
                                    {getTimeString(
                                        props.StartTime
                                    )}{" "}
                                        -{" "}
                                    {getTimeString(
                                        props.EndTime
                                    )}
                                    {")"}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="event-content">
                    {props.Subject !== undefined ? (
                        <div className="meeting-type-wrap">
                            {props.Subsubject}
                        </div>
                    ) : (
                        ""
                    )}
                    {props.StartTime !== undefined &&
                        props.EndTime !== undefined ? (
                        <div className="meeting-subject-wrap">
                            <div className="e-date-time-icon e-icons">
                                {" "}
                            </div>
                            <div className="e-date-time-details e-text-ellipsis">
                                {props.StartTime.toDateString()}
                                {"("}
                                {getTimeString(
                                    props.StartTime
                                )}{" "}
                                    -{" "}
                                {getTimeString(
                                    props.EndTime
                                )}
                                {")"}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {props.HasPatient ? (
                        <Link
                            to={{
                                pathname: `/doctor/sesion/${props.SessionId
                                    }`,
                                state: {
                                    fromScheduler: true
                                }
                            }}
                        >
                            Ver formato clínico
                        </Link>
                    ) : (
                        ""
                    )}
                </div>
            )}
        </div>
    );
}

export default ScheduleContentTemplate;
