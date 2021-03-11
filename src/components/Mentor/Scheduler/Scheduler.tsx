import * as React from 'react';
// tslint:disable:ordered-imports
import {
	Day,
	Inject,
	Month,
	ScheduleComponent,
	Week,
	ViewsDirective,
	ViewDirective,
} from '@syncfusion/ej2-react-schedule';
import { localeTranslations } from './locale';
// tslint:disable:ordered-imports
import { L10n } from '@syncfusion/ej2-base';
import LayoutContext from '../../../common/Layout/Layout.context';

import Loader from '../../../common/Loader/Loader';
import { Headline1 } from '../../../common/MentorText';
import MentorService from '../../../services/Mentor/Mentor.service';
import './Scheduler.scss';
import { Link } from 'react-router-dom';

const headerStyle = {
	display: 'flex',
	justifyContent: 'center' as 'center',
	marginBottom: '20px',
	textAlign: 'center' as 'center',
};

const titleStyle = {
	fontSize: 30,
	marginBottom: 20,
	textAlign: 'center' as 'center',
};

// tslint:disable:object-literal-sort-keys
L10n.load({
	'en-US': localeTranslations,
});

interface IAppointments {
	Id: number;
	Subject: string;
	StartTime: Date;
	EndTime: Date;
}

const isDateValid = (from: Date) => new Date() < from;

const Scheduler = () => {
	const { user } = React.useContext(LayoutContext);	
	let scheduleObj: any = React.useRef();
	const mentorService = new MentorService();
	const [loading, setLoading] = React.useState(false);
	const [appointments, setAppointments] = React.useState<IAppointments[]>([]);
	const [skills, setSkills] = React.useState<any[]>([]);
	const onPopUpOpen = (args: any) => {
		if (args.type === 'Editor') {
			// removing unnecessary fields
			const elements = [
				'.e-location-container',
				'.e-all-day-time-zone-row',
				'.e-control.e-recurrenceeditor.e-lib',
			];
			elements.forEach((sel) => {
				args.element.querySelector(sel).style.display = 'none';
			});
		} else if (args.type === 'QuickInfo') {
			// removing unnecessary fields
			const elements = ['.e-event-details'];
			elements.forEach((sel) => {
				args.element.querySelector(sel).style.display = 'none';
			});
		}
	};

	React.useEffect(() => {
		setLoading(true);
		mentorService.getSkills().then((response: any) => {
			setSkills(response.items);
		});
	}, []);

	React.useEffect(() => {
		if (skills && skills.length > 0) {
			const skillId = skills[0].id;
			const date = new Date();
			const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23);
			mentorService
				.getSchedules(skillId, firstDay.toISOString(), lastDay.toISOString())
				.then((response) => {
					const schedules = response.items.map(
                        (item: any) => ({
                            Id: item.id,
							Subject: `${
								item.doctor_name
							} ${
								item.doctor_last_name
							}`,
                            Subsubject:
                                item.patient_name &&
                                user.id === item.user_id &&
                                item.patient_name
                                    ? `Paciente: ${
                                          item.patient_name
                                      } ${
                                          item.patient_last_name
                                      } `
                                    : 'Sin paciente asignado',
                            StartTime: new Date(item.from),
                            EndTime: new Date(item.to),
                            IsReadonly:
                                item.doctor_id !==
                                    user.rolId ||
                                !isDateValid(
                                    new Date(item.from)
                                ),
                            HasPatient:
                                item.patient_name &&
                                user.id === item.user_id,
                            Doctor: item.doctor_id,
                            User: user.id,
                            SessionId: item.id,
                            Description: "fdsf"
                        })
                    );
					setAppointments(schedules);
					setLoading(false);
				});
		}
	}, [skills]);

	const onCellClick = (args: any) => {
		const { startTime, endTime } = args;
		const isValid = isDateValid(args.startTime);
		const isSlot = scheduleObj.isSlotAvailable(startTime, endTime);
		args.cancel = !isValid || !isSlot;
	};

	const onCellDoubleClick = (args: any) => (args.cancel = true);

	const onComplete = (args: any) => {
		if (args.requestType === 'eventCreated') {
			const { data } = args;
			const created = (data && data.length > 0 && data[0]) || {};
			const startTime: Date = created && (created.StartTime as Date);
			const endTime: Date = created && (created.EndTime as Date);
			const bulk = {
				credits: 0,
				interestAreaId: '49024bf6-c767-44ea-b4a5-983d008e0613',
				isWorkshop: false,
				maxStudents: 1,
				room: 1,
				sessions: [
					{
						from: startTime.toISOString(),
						to: endTime.toISOString(),
					},
				],
				skillId: skills[0].id,
				type: 'VIRTUAL',
			};
			mentorService.createSessionBulk(bulk).then((response) => {
				return;
			});
		} else if (args.requestType === 'eventRemoved') {
			const { data } = args;
			const toRemove = (data && data.length > 0 && data[0]) || {};
			mentorService.deleteSession([toRemove.Id]).then((response) => {
				return;
			});
		}
	};

	const onActionBegin = (args: any) => {
		if (args.requestType === 'eventCreate') {
			const { data } = args;
			if (data && data.length > 0) {
				args.data[0].Subject = `${user.name} ${user.lastname}`;
			}
		}
	};

	const getTimeString = (value: any) => {
		const appointmentDate = new Date(value);
        return appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

	const eventTemplate = (args: any) => {
        return (
			<>
            <div
                className="template-wrap"
                style={{  background: !args.HasPatient ? args.SecondaryColor : '#adb7c4' }}
            >
                <div
                    className="subject"
                    style={{ background: !args.HasPatient ? args.PrimaryColor : '#adb7c4' }}
                >
                    {args.Subject}
                </div>
                <div
                    className="time"
                    style={{ background: args.PrimaryColor }}
                >
                    {getTimeString(args.StartTime)} -{" "}
                    {getTimeString(args.EndTime)}
                </div>
            </div>
			</>
        );
    };

	const contentTemplate = (props: any) => {

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
                                        pathname: `/doctor/sesion/${
                                            props.SessionId
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

	return (
		<div className='u-LayoutMargin' style={{ padding: '0 35px' }}>
			<div style={headerStyle}>
				<div>
					<Headline1 style={titleStyle}>Calendario de Citas</Headline1>
				</div>
			</div>
			<div>
				{loading && <Loader />}
				{!loading && (
					<ScheduleComponent
						cssClass='event-template quick-info-template'
						ref={(schedule) => (scheduleObj = schedule)}
						eventSettings={{ dataSource: appointments, template: eventTemplate }}
						quickInfoTemplates={{ content: contentTemplate }}
						popupOpen={onPopUpOpen}
						timeScale={{ enable: true, interval: 60, slotCount: 3 }}
						cellClick={onCellClick}
						cellDoubleClick={onCellDoubleClick}
						actionBegin={onActionBegin}
						actionComplete={onComplete}

					>
						<ViewsDirective>
							<ViewDirective option='Month' displayName='Vista mensual' />
							<ViewDirective
								option='Week'
								displayName='Vista semanal'
								startHour='08:00'
								endHour='20:00'
							/>
							<ViewDirective
								option='Day'
								displayName='Vista diaria'
								startHour='08:00'
								endHour='20:00'
							/>
						</ViewsDirective>
						<Inject services={[Day, Week, Month]} />
					</ScheduleComponent>
				)}
			</div>
		</div>
	);
};

export default Scheduler;
