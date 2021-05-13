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
	DoctorId: string;
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
	// const [isServiceExecute, setIsServiceExecute] = React.useState(false);
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
		} else if (args.type === 'EditEventInfo') {
			// removing unnecessary fields
			const elements = ['.e-delete.e-icons.e-control'];
			elements.forEach((sel) => {
				const querySelector = args.element.querySelector(sel);
				if (querySelector) {
					querySelector.style.display = 'none'
				};
			});
		};
	}

	const fillSessionsInCalendar = () => {
		if (skills && skills.length > 0) {
			const skillId = skills[0].id;
			const date = new Date();
			const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23);
			mentorService
				.getSchedules(skillId, firstDay.toISOString(), lastDay.toISOString())
				.then((response) => {
					const schedules = response.items.map((item: any) => ({
						Id: item.id,
						DoctorId: item.doctor_id,
						Subject: `${item.doctor_name} ${item.doctor_last_name}`,
						StartTime: new Date(item.from),
						EndTime: new Date(item.to),
						IsReadonly:
							item.doctor_id !== user.rolId ||
							!isDateValid(new Date(item.from))
					}));
					setAppointments(schedules);
					setLoading(false);
				});
		}
	}

	React.useEffect(() => {
		setLoading(true);
		mentorService.getSkills().then((response: any) => {
			setSkills(response.items);
		});
	}, []);

	React.useEffect(() => {
		fillSessionsInCalendar();
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
			return String(slot.DoctorId) === String(user.rolId) &&
				((slot.StartTime >= startTime && slot.StartTime < endTime) ||
					(slot.StartTime <= startTime && slot.EndTime >= endTime) ||
					(slot.EndTime > startTime && slot.EndTime <= endTime))
		});
		return totalSlots.length === 0;
	}

	const onCellDoubleClick = (args: any) => (args.cancel = true);

	const onComplete = (args: any) => {
		if (args.requestType === 'eventCreated') {
			const { data } = args;
			const created = (data && data.length > 0 && data[0]) || {};
			const startTime: Date = created && (created.StartTime as Date);
			const endTime: Date = created && (created.EndTime as Date);
			const bulk = {
				credits: 0,
				interestAreaId: 'eedc0fef-ad70-4a93-9f55-55d55f2c818e',
				isWorkshop: false,
				maxStudents: 43210,
				room: 1,
				sessions: [
					{
						from: startTime.toISOString(),
						to: endTime.toISOString(),
					},
				],
				skillId: skills[0].id,
				type: 'PHYSICAL',
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
						ref={(schedule) => (scheduleObj = schedule)}
						eventSettings={{ dataSource: appointments }}
						popupOpen={onPopUpOpen}
						timeScale={{ enable: true, interval: 60, slotCount: 3 }}
						cellClick={onCellClick}
						cellDoubleClick={onCellDoubleClick}
						actionBegin={onActionBegin}
						actionComplete={onComplete}
						allowDragAndDrop={false}
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
