import * as moment from 'moment';
import * as React from 'react';
import MentorService from 'src/services/Mentor/Mentor.service';
import ConsoleColor from '../../../../../common/ConsoleColor';
import ConsoleModal from '../../../../../common/ConsoleModal/ConsoleModal';
import { Title2 } from '../../../../../common/ConsoleText';
import Loader from '../../../../../common/Loader/Loader';
import { FONTS } from '../../../../../common/MentorColor';
import MentorDropDown, {
	IPropsMentorOptionsDropDown,
} from '../../../../../common/MentorDropDown/MentorDropDown';
import { Headline1 } from '../../../../../common/MentorText';
import MentorTextArea from '../../../../../common/MentorTextArea/MentorTextArea';
import {
	IReassignSession,
	ISessionDoctor,
} from '../../../../../domain/Session/SessionMentorBean';
import SessionService from '../../../../../services/Session/Session.service';
import { MAX_RETRIEVED_SESSIONS } from '../../SessionsList';
import './RescheduleSessionModal.scss';

interface IPropsRescheduleSessionModal {
	show: boolean;
	style?: React.CSSProperties;
	sessionId: string;
	toggleModal(show: boolean): void;
	confirm(newSession: string, notes: string): void;
}

const getDateTime = (from: string, to: string) => {
	const date = moment(from).format('dddd DD [de] MMMM');
	const fromHour = moment(from).format('h:mm a');
	const toHour = moment(to).format('h:mm a');
	return `${fromHour} - ${toHour}, ${date}`;
};

const mapDoctorsToDropdown = (doctors: ISessionDoctor[]) => {
	return doctors.map((doctor) => {
		const doctorFullname = `${doctor.name || ''} ${doctor.last_name || ''}`;
		const specialty =
			(doctor.specialty_name && `(${doctor.specialty_name})`) || '';
		return {
			label: `${doctorFullname} ${specialty}`,
			value: doctor.id,
		};
	});
};

const mapSessionsToDropdown = (sessions: IReassignSession[]) => {
	return sessions.map((session) => ({
		label: getDateTime(session.from, session.to),
		value: session.id,
	}));
};

const RescheduleSessionModal: React.FC<IPropsRescheduleSessionModal> = ({
	show,
	toggleModal,
	confirm,
	sessionId,
}) => {
	const sessionService = new SessionService();
	const mentorService = new MentorService();
	const [loadingSessions, setLoadingSessions] = React.useState(false);
	const [loadingDoctors, setLoadingDoctors] = React.useState(false);
	const [selectedDoctor, setSelectedDoctor] = React.useState('');
	const [selectedSession, setSelectedSession] = React.useState('');
	const [doctors, setDoctors] = React.useState<ISessionDoctor[]>([]);
	const [sessions, setSessions] = React.useState<IReassignSession[]>([]);
	const [notes, setNotes] = React.useState<string>('');
	const close = () => {
		toggleModal(false);
		setSelectedDoctor('');
		setSelectedSession('');
		setNotes('');
		setSessions([]);
	};

	const handleConfirm = () => {
		confirm(selectedSession, notes);
		setNotes('');
	};
	const handleDoctorChange = (
		_: string,
		selectedOption: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[],
	) => {
		if (!Array.isArray(selectedOption)) {
			if (selectedDoctor !== selectedOption.value) {
				setLoadingSessions(true);
				setSelectedDoctor(selectedOption.value);
			}
		}
	};

	const handleSessionChange = (
		_: string,
		selectedOption: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[],
	) => {
		if (!Array.isArray(selectedOption)) {
			if (selectedSession !== selectedOption.value) {
				setSelectedSession(selectedOption.value);
			}
		}
	};

	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setNotes(e.target.value);

	React.useEffect(() => {
		if (show && sessionId) {
			setLoadingDoctors(true);
			mentorService
				.doctors()
				.then((response: ISessionDoctor[]) => {
					setLoadingDoctors(false);
					setDoctors(response);
				})
				.catch(() => {
					setLoadingDoctors(false);
				});
		}
	}, [sessionId]);

	React.useEffect(() => {
		if (selectedDoctor) {
			sessionService
				.getSessionsByDoctor(sessionId, selectedDoctor, MAX_RETRIEVED_SESSIONS)
				.then((response: IReassignSession[]) => {
					setSessions(response);
					setLoadingSessions(false);
				});
		}
	}, [sessionId, selectedDoctor]);

	const dropdownDoctors = React.useMemo(() => mapDoctorsToDropdown(doctors), [
		doctors,
	]);

	const dropdownSessions = React.useMemo(
		() => mapSessionsToDropdown(sessions),
		[sessions],
	);

	return (
		<ConsoleModal
			show={show}
			styles={{
				backgroundColor: ConsoleColor.TEXT_COLORS.white,
				position: 'relative',
			}}
			onCloseModal={close}
		>
			<div className='ConsoleModalConfirm_header'>
				<Title2>Reagendando Cita</Title2>
			</div>
			<div className='RescheduleSessionModal ConsoleModalConfirm_body'>
				{loadingDoctors && (
					<div className='RescheduleSessionModal_loader'>
						<Loader />
					</div>
				)}
				{!loadingDoctors && !doctors.length && (
					<div className='RescheduleSessionModal_empty'>
						<Headline1 color={FONTS.medium}>
							No hay doctores disponibles
						</Headline1>
					</div>
				)}
				{!loadingDoctors && !!doctors.length && (
					<React.Fragment>
						<div className='RescheduleSessionModal_dropdownblock'>
							<MentorDropDown
								label={'Doctores disponibles:'}
								value={selectedDoctor}
								empty={doctors.length === 0}
								name={`doctors`}
								triggerChange={handleDoctorChange}
								placeholder='Seleccione'
								options={dropdownDoctors}
								style={{ width: '100%' }}
							/>
						</div>
						<div className='RescheduleSessionModal_dropdownblock'>
							{loadingSessions && (
								<div className='RescheduleSessionModal_loader'>
									<Loader />
								</div>
							)}
							{!loadingSessions && selectedDoctor && !sessions.length && (
								<div className='RescheduleSessionModal_empty'>
									<Headline1 color={FONTS.medium}>
										No hay horarios disponibles
									</Headline1>
								</div>
							)}
							{!loadingSessions && !!sessions.length && (
								<MentorDropDown
									label={'Sesiones disponibles:'}
									value={selectedSession}
									empty={sessions.length === 0}
									name={`sessions`}
									triggerChange={handleSessionChange}
									placeholder='Seleccione'
									options={dropdownSessions}
									style={{ width: '100%' }}
								/>
							)}
						</div>
						<div className='RescheduleSessionModal_notesblock'>
							<MentorTextArea
								label='Motivo:'
								attrs={{
									onChange: handleNotesChange,
									rows: 5,
									style: { height: 'auto' },
									value: notes,
								}}
							/>
						</div>
					</React.Fragment>
				)}
			</div>
			<div className='RescheduleSessionModal_buttons'>
				<button className='u-Button u-Button--white' onClick={close}>
					Cancelar
				</button>
				<button
					disabled={!selectedSession}
					className='u-Button'
					onClick={handleConfirm}
				>
					Aceptar
				</button>
			</div>
		</ConsoleModal>
	);
};

export default RescheduleSessionModal;
