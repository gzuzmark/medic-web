import { L10n } from '@syncfusion/ej2-base';
import {
	Inject,
	ScheduleComponent,
	ViewDirective, ViewsDirective, WorkWeek
} from '@syncfusion/ej2-react-schedule';
import * as _ from 'lodash';
import * as moment from "moment";
import * as React from 'react';
import LayoutContext from '../../../common/Layout/Layout.context';
import Loader from '../../../common/Loader/Loader';
import { Headline1 } from '../../../common/MentorText';
import MentorService from '../../../services/Mentor/Mentor.service';
import CaptionFilter, { IFilterGroup } from './components/CaptionFilter/CaptionFilter';
import MessageService from './components/MessageServices/MessageService';
import ScheduleCellTemplate from './components/ScheduleCellTemplate/ScheduleCellTemplate';
import ScheduleContentTemplate from './components/ScheduleContentTemplate/ScheduleContentTemplate';
import ScheduleEventTemplate from './components/ScheduleEventTemplate/ScheduleEventTemplate';
import { ButtonAlivia, ButtonWhite, DivButtons } from './components/ScheduleEventTemplate/ScheduleStyled';
import useDateRangeWeek from './hooks/useDateRangeWeek';
import { AppointmentMode, IAppoitmentData, ISessionCreate } from './interfaces';
import { localeTranslations } from './locale';
import './Scheduler.scss';
import { createTemporalAppointment, DEFAULT_INTERVAL_MINUTES, FIRST_DAY_OF_WEEK, isDateValid, isValidSlotWhenOccupied, mapApiResponse, removeItemFromAppointments, saveAppoitments, WORKING_DAYS } from './services';

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

const Scheduler = () => {
	const { user } = React.useContext(LayoutContext);
	const scheduleRef = React.useRef<ScheduleComponent>(null);
	const mentorService = new MentorService();
	const [loading, setLoading] = React.useState<boolean>(true); // setLoading
	const [selectedDate, setSelectedDate] = React.useState(new Date());
	const rangeWeek = useDateRangeWeek(selectedDate);

	const [appointments, setAppointments] = React.useState<IAppoitmentData[]>([]);
	const [filterAppointments, setFilterAppointments] = React.useState<IAppoitmentData[]>([]);
	const [addAppointments, setAddAppointments] = React.useState<IAppoitmentData[]>([]);
	const [deleteAppointments, setDeleteAppointments] = React.useState<IAppoitmentData[]>([]);
	const [skills, setSkills] = React.useState<any[]>([]);
	const [executeService, setExecuteService] = React.useState(false);
	const [durationInterval, setDurationInterval] = React.useState<number>(DEFAULT_INTERVAL_MINUTES);
	const [isModeEdit, setIsModeEdit] = React.useState<boolean>(false);
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
		if (args) {
			args.cancel = true;
		}
	}

	const fillSessionsInCalendar = (): Promise<IAppoitmentData[]> => {
		return new Promise((resolve: any) => {
			if (skills && skills.length > 0 && rangeWeek) {
				const { dateWeekStart, dateWeekEnd } = rangeWeek;
				mentorService
					.getSchedulesByMedic(dateWeekStart.toISOString(), dateWeekEnd.toISOString())
					.then((response) => {
						const schedules = mapApiResponse(response.items, user);
						resolve(schedules);
					});
			}
		});
	}

	React.useEffect(() => {
		mentorService.getSkills().then((response: any) => {
			if (response.duration) {
				setDurationInterval(Number(response.duration));
			}
			if (response.skills) {
				setSkills(response.skills);
			}
		});
	}, []);

	React.useEffect(() => {
		if (rangeWeek != null && skills.length > 0) {
			setLoading(true);
			fillSessionsInCalendar()
			.then((data) => {
				setAppointments(data);
			});
		}
	}, [skills, rangeWeek]);

	React.useEffect(() => {
		if (isModeEdit) {
			const data = removeItemFromAppointments(appointments, deleteAppointments);
			setFilterAppointments([...data, ...addAppointments]);
		} else {
			setFilterAppointments(appointments);
		}
		setLoading(false);
	}, [appointments]);

	React.useEffect(() => {
		console.log('adds', addAppointments.length);
		console.log('deletes', deleteAppointments.length);
	}, [addAppointments, deleteAppointments]);

	const allowSlotAdd = (startTime: Date, endTime: Date, args: unknown): boolean => {		
		if(scheduleRef.current) {
			const isValid = isDateValid(startTime);
			const isSlot = scheduleRef.current.isSlotAvailable(startTime, endTime);
			const verifySlotsData = isValidSlotWhenOccupied(args, filterAppointments);
			return isValid && isSlot && verifySlotsData;
		}
		return false;
	}

	const onCellClick = (args: any) => {
		const { isAllDay } = args;
		if (isModeEdit && !isAllDay ) {
			const { startTime, endTime } = args;			
			if (allowSlotAdd(startTime, endTime, args)) {
				const appointment = createTemporalAppointment(startTime, endTime);
				setFilterAppointments([...filterAppointments, appointment]);
				setAddAppointments([...addAppointments, appointment]);
			}
		}
		args.cancel = true;
	};

	const onCellDoubleClick = (args: any) => (args.cancel = true);

	const saveCreateAndDeleteAppoitments = async () => {
		if ((addAppointments.length > 0 || deleteAppointments.length > 0) && skills) {
			const skillId = skills[0].id;
			const creates = addAppointments.map<ISessionCreate>(item => ({ from: item.StartTime.toISOString(), to: item.EndTime.toISOString() }));
			const deletes = deleteAppointments.map<string>(item => item.Id || '');
			setExecuteService(true);
			saveAppoitments(creates, skillId, deletes)
			.finally(() => {
				fillSessionsInCalendar()
				.then((data) => {
					setIsModeEdit(false);
					setAddAppointments([]);
					setDeleteAppointments([]);
					setAppointments(data);
					setExecuteService(false);
				});
			});
		}
	}

	const onActionBegin = (args: any) => {
		if (args.requestType === 'eventCreate') {
			const { data } = args;
			if (data && data.length > 0) {
				args.data[0].Subject = `${user.name} ${user.lastname}`;
			}
		}
	};

	const onChangeFilters = (filter: IFilterGroup) => {
		const { scheduled, notScheduled } = filter;
		if (isModeEdit) {
			return;
		}
		if (scheduled && notScheduled) {
			setFilterAppointments([...appointments]);
		} else if (scheduled && !notScheduled) {
			setFilterAppointments(appointments.filter(item => item.Patient));
		} else if (!scheduled && notScheduled) {
			setFilterAppointments(appointments.filter(item => !item.Patient));
		}
	};

	const enterModeEdit = () => {
		if (!isModeEdit) {
			setFilterAppointments([...appointments]);
			setIsModeEdit(true);
		}
	}

	const cancelModeEdit = () => {
		if (isModeEdit) {
			setIsModeEdit(false);
			setFilterAppointments([...appointments]);
			setAddAppointments([]);
			setDeleteAppointments([]);
		}
	};

	const onDeletedAppoitment = (Id: string | null) => {
		if (isModeEdit) {
			const appointment = filterAppointments.find((item) => item.Id === Id );
			if (appointment) {
				setFilterAppointments(filterAppointments.filter(item => item.Id !== Id));
				setAddAppointments(addAppointments.filter(item => item.Id !== Id));
				if (appointment.Session !== null) {
					setDeleteAppointments([...deleteAppointments, appointment]);
				}
			}
		}
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

	const EventTemplate = (props: IAppoitmentData) => {
		// console.log(props);
		const mode: AppointmentMode = isModeEdit ? 'EDIT': 'VIEW';
		return (
			<ScheduleEventTemplate {...props} Mode={mode} onDeleted={onDeletedAppoitment} />
		);
	}

	const navigation = (args: any) => {
		if (args && rangeWeek) {
			const date: Date = args.currentDate;
			const { dateWeekStart, dateWeekEnd } = rangeWeek;
			if (date < dateWeekStart || date > dateWeekEnd) {
				setSelectedDate(date);
			}
		}
	}

	const onSelect = (args: any) => {
        // console.log({ args });
        if (scheduleRef.current) {
            const selectedSlots: Element[] = scheduleRef.current.getSelectedElements();

            if (selectedSlots.length > 0 && isModeEdit) {                
                const newAppointmensSlots: IAppoitmentData[] = [];
                selectedSlots.forEach(dateElement => {
                    const date =
                        (dateElement as HTMLElement).dataset.date ||
                        new Date();
                    const startTime = new Date(Number(date));
                    const endTime = moment(startTime)
                        .add(durationInterval, "m")
                        .toDate();
                   
                    if (allowSlotAdd(startTime, endTime, args)) {
                        const appointment = createTemporalAppointment(
                            startTime,
                            endTime
                        );
                        newAppointmensSlots.push(appointment);
                    }
                });
                setFilterAppointments([
                    ...filterAppointments,
                    ...newAppointmensSlots
                ]);
                setAddAppointments([
                    ...addAppointments,
                    ...newAppointmensSlots
                ]);
            }            
        }
    };

	return (
		<div className='u-LayoutMargin'>
			<div style={headerStyle}>
				<div>
					<Headline1 style={titleStyle}>Calendario de Citas</Headline1>
				</div>
			</div>
			{ !loading && <CaptionFilter duration={durationInterval} disabled={isModeEdit} onFilterCheck={onChangeFilters} />}
			<div>
				{loading && <Loader className={'loader-scheduler'} />}
				{!loading && (
					<ScheduleComponent
						height='calc(100vh - 320px)' 
						width={'auto'}
						ref={scheduleRef}
						eventSettings={{ dataSource: filterAppointments,  template: EventTemplate }}
						quickInfoTemplates={{ content: ScheduleContentTemplate }}
						popupOpen={onPopUpOpen}
						timeScale={{ enable: true, interval: durationInterval, slotCount: 1 }}
						cellClick={onCellClick}
						cellDoubleClick={onCellDoubleClick}
						actionBegin={onActionBegin}
						allowDragAndDrop={false}
                        timezone={timeZoneLocal}
						showHeaderBar={true}
						select={onSelect}
                        dateHeaderTemplate={DateHeaderTemplate}
                        cellTemplate={ScheduleCellTemplate}
                        workHours={{
                            highlight: true,
                            start: "0" + hourStartCalendar + ":00",
                            end: hourEndCalendar + ":00"
                        }}
                        workDays={WORKING_DAYS}
						allowMultiCellSelection={isModeEdit}
						allowMultiRowSelection={false}
						navigating={navigation}
						selectedDate={selectedDate}
						immediateRender={true}
                    >
                        <ViewsDirective>
                            <ViewDirective
                                option={"WorkWeek"}
								firstDayOfWeek={FIRST_DAY_OF_WEEK}
                                displayName="Vista semanal"
                                startHour={"0" + hourStartCalendar + ":00"}
                                endHour={hourEndCalendar + ":00"}
                            />
                        </ViewsDirective>
                        <Inject services={[WorkWeek]} />
                    </ScheduleComponent>
                )}
            </div>
			{ !loading && 
				<DivButtons>
					{ isModeEdit ?
						(
							<>
								<ButtonWhite onClick={() => cancelModeEdit()}>Cancelar</ButtonWhite>
								<ButtonAlivia 
									disabled={(addAppointments.length === 0 && deleteAppointments.length === 0)}
									onClick={() => saveCreateAndDeleteAppoitments()}
								>Guardar</ButtonAlivia>
							</>
						):
						(<ButtonAlivia onClick={() => enterModeEdit()}>Editar</ButtonAlivia>)
					}
				</DivButtons>
			}
            <MessageService show={executeService} />
        </div>
    );
};

export default Scheduler;
