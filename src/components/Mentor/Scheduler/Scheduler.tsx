import { L10n } from '@syncfusion/ej2-base';
// tslint:disable:ordered-imports
import {
	Inject,
	ScheduleComponent,
	ViewDirective, ViewsDirective, Week
} from '@syncfusion/ej2-react-schedule';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LayoutContext from '../../../common/Layout/Layout.context';
import Loader from '../../../common/Loader/Loader';
import { Headline1 } from '../../../common/MentorText';
import MentorService from '../../../services/Mentor/Mentor.service';
import MessageService from './components/MessageServices/MessageService';
import { localeTranslations } from './locale';
import './Scheduler.scss';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import * as _ from 'lodash';
import CaptionFilter from './components/CaptionFilter/CaptionFilter';

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
	Doctor: string;
	Subject: string;
	StartTime: Date;
	EndTime: Date;
}

// interface IDateHeaderTemplateProps {
// 	date: Date;
// }

const DEFAULT_INTERVAL_MINUTES = 20;
const WORKING_DAYS = [0,1,2,3,4,5,6]

const isDateValid = (from: Date) => new Date() < from;

const Scheduler = () => {
	const { user } = React.useContext(LayoutContext);
	let scheduleObj: any = React.useRef();
  	const mentorService = new MentorService();
	const [loading, setLoading] = React.useState(false);
	const [appointments, setAppointments] = React.useState<IAppointments[]>([]);
	const [skills, setSkills] = React.useState<any[]>([]);
	const [executeService, setExecuteService] = React.useState(false);
	const [durationInterval, setDurationInterval] = React.useState<number>(DEFAULT_INTERVAL_MINUTES);
    const timeZoneLocal = Intl.DateTimeFormat().resolvedOptions().timeZone // get customer's local zone
    // function that gets the time from the time zone
    const getTimeNowByTimeZone = (tz: any):any => {
        return new Date().toLocaleTimeString('ES',{
            timeZone: tz,
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    const hourPeru = moment(`2016-05-06 ${getTimeNowByTimeZone("America/Lima")}`) // time from Lima
    const houseLocalClient =  moment(`2016-05-06 ${getTimeNowByTimeZone(timeZoneLocal)}`) // time from customer
    const diffHoursTimeZone =  hourPeru.diff(houseLocalClient, "hours"); // difference between both hours
    const hourStartCalendar:number =  8 - (diffHoursTimeZone) // 8 = opening time in America/Lima
    const hourEndCalendar = 22 - (diffHoursTimeZone) // 20 = closing time in America/Lima

	const onPopUpOpen = (args: any) => {
		if (args.type === 'Editor') {
			// removing unnecessary fields
			const elements = [
				'.e-location-container',
				'.e-all-day-time-zone-row',
				'.e-control.e-recurrenceeditor.e-lib',
			];
			elements.forEach((sel) => {
				const querySelector = args.element.querySelector(sel);
				if (querySelector) {
					querySelector.style.display = 'none';
				}
			});
		} else if (args.type === 'QuickInfo') {
			// removing unnecessary fields
			const elements = ['.e-event-details'];
			elements.forEach((sel) => {
				const querySelector = args.element.querySelector(sel);
				if (querySelector) {
					querySelector.style.display = 'none'
				};
			});
			const selector = args.element.querySelector('.content-area');
			if (selector) {
				const father = selector.parentElement;
				const html = (
					<div className="calendar-create-container">
						<h4 className="calendar-create-title">Registrar en calendario</h4>
						<p>Recuerde que esta opción es irreversible</p>
						<p>Después de crear no podrá eliminar ni editar</p>
						<p>Verifique que la fecha y hora sean las correctas</p>
					</div>
				);
				ReactDOM.render(html, father);
			}
		} else if (args.type === 'EditEventInfo') {
			// removing close button and edit button
			const elements = ['.e-delete.e-icons.e-control', '.e-edit.e-icons.e-control'];
			elements.forEach((sel) => {
				const querySelector = args.element.querySelector(sel);
				if (querySelector) {
					querySelector.style.display = 'none'
				};
			});
		};
	}

	const fillSessionsInCalendar = (): Promise<void> => {
		return new Promise((resolve: any) => {
			if (skills && skills.length > 0) {
				// const skillId = skills[0].id;
				const date = new Date();
				const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
				const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23);
				mentorService
					.getSchedulesByMedic(firstDay.toISOString(), lastDay.toISOString())
					.then((response) => {
						const schedules = response.items.map(
							(item: any) => ({
								Id: item.id,
								Subject: `${item.doctor_name
									} ${item.doctor_last_name
									}`,
								Subsubject:
									item.patient_name &&
										user.id === item.user_id &&
										item.patient_name
										? `Paciente: ${item.patient_name
										} ${item.patient_last_name
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
						resolve();
					});
			}
		});
	}

	React.useEffect(() => {
		setLoading(true);
		mentorService.getSkills().then((response: any) => {
			if (response.duration) {
				setDurationInterval(Number(response.duration));
			}
			setSkills(response.skills);
		});
	}, []);

	React.useEffect(() => {
		fillSessionsInCalendar()
			.then(() => setLoading(false));
	}, [skills]);

	const onCellClick = (args: any) => {
		const { startTime, endTime } = args;
		const isValid = isDateValid(startTime);
		const isSlot = scheduleObj.isSlotAvailable(startTime, endTime);
		const isValidSlotDoctor = isValidSlotWhenOccupied(args);
		const cancel = !isValid || (!isSlot && false) || !isValidSlotDoctor; // (!isSlot && false) is a hack
		args.cancel = cancel;
	};

	const isValidSlotWhenOccupied = (args: any) => {
		const { startTime, endTime } = args;
		const totalSlots = appointments.filter((slot) => {
			return String(slot.Doctor) === String(user.rolId) &&
				((slot.StartTime >= startTime && slot.StartTime < endTime) ||
					(slot.StartTime <= startTime && slot.EndTime >= endTime) ||
					(slot.EndTime > startTime && slot.EndTime <= endTime))
		});
		return totalSlots.length === 0;
	}

	const onCellDoubleClick = (args: any) => (args.cancel = true);

	const onComplete = (args: any) => {
		if (args.requestType === 'eventCreated') {
			setExecuteService(true)
			const { data } = args;
			const created = (data && data.length > 0 && data[0]) || {};
			const startTime: Date = created && (created.StartTime as Date);
			const endTime: Date = created && (created.EndTime as Date);
			const bulk = {
				credits: 0,
				interestAreaId: `${process.env.REACT_APP_INTEREST_AREA_ID}`,
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
			mentorService.createSessionBulk(bulk)
				.finally(() => {
					fillSessionsInCalendar()
						.then(() => setExecuteService(false))
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
					style={{ background: !args.HasPatient ? args.SecondaryColor : '#adb7c4' }}
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

	const DateHeaderTemplate = (props: any) => {
		const { date } = props;
		const mdate = moment(date).locale('es');
		return (
			<>
				<div className='calendar-header-day-week'>{_.upperFirst(mdate.format('dddd'))}</div>
				<div className='calendar-header-day'>{mdate.format('DD')}</div>
			</>
		);
	}

	const CellTemplate = (props: any) => {
		// console.log(props);
		const { type, date } = props;
		const mdate = moment(date).locale('es');
		
		if (type === 'alldayCells') {
			return <></>;
		}

		const mNow = moment(new Date); // .add(1, 'hour');
		if (mNow > mdate) {
			return <div className="cell-template-hour cell-template-hour-disabled">{mdate.format('hh:mm a')}</div>
		}

		return (
			<div className="cell-template-hour">{mdate.format('hh:mm a')}</div>
		);
	}

	return (
		<div className='u-LayoutMargin'>
			<div style={headerStyle}>
				<div>
					<Headline1 style={titleStyle}>Calendario de Citas</Headline1>
				</div>
			</div>
			<CaptionFilter duration={durationInterval} />
			<div>
				{loading && <Loader className={'loader-scheduler'} />}
				{!loading && (
					<ScheduleComponent
						cssClass='event-template quick-info-template'
						height='calc(100vh - 320px)'
						ref={(schedule) => (scheduleObj = schedule)}
						eventSettings={{ dataSource: appointments, template: eventTemplate }}
						quickInfoTemplates={{ content: contentTemplate }}
						popupOpen={onPopUpOpen}
						timeScale={{ enable: true, interval: durationInterval, slotCount: 1 }}
						cellClick={onCellClick}
						cellDoubleClick={onCellDoubleClick}
						actionBegin={onActionBegin}
						actionComplete={onComplete}
						allowDragAndDrop={false}
                        timezone={timeZoneLocal}
                        showHeaderBar={true}
                        dateHeaderTemplate={DateHeaderTemplate}
                        cellTemplate={CellTemplate}
                        workHours={{
                            highlight: true,
                            start: "0" + hourStartCalendar + ":00",
                            end: hourEndCalendar + ":00"
                        }}
                        workDays={WORKING_DAYS}
                    >
                        <ViewsDirective>
                            {/* <ViewDirective option='Month' displayName='Vista mensual' /> */}
                            <ViewDirective
                                option={"Week"}
                                displayName="Vista semanal"
                                startHour={"0" + hourStartCalendar + ":00"}
                                endHour={hourEndCalendar + ":00"}
                            />
                            {/* <ViewDirective
								option='Day'
								displayName='Vista diaria'
                                startHour={"0"+hourStartCalendar+":00"}
                                endHour={hourEndCalendar+":00"}
                            /> */}
                        </ViewsDirective>
                        <Inject services={[Week]} />
                    </ScheduleComponent>
                )}
            </div>
            <MessageService show={executeService} />
        </div>
    );
};

export default Scheduler;
