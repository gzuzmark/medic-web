import * as moment from 'moment';
import * as React from 'react';
import ConsoleColor from '../../../../../common/ConsoleColor';
import ConsoleModal from '../../../../../common/ConsoleModal/ConsoleModal';
import { Title2 } from '../../../../../common/ConsoleText';
import Loader from '../../../../../common/Loader/Loader';
import { FONTS } from '../../../../../common/MentorColor';
import MentorDropDown, {
	IPropsMentorOptionsDropDown,
} from '../../../../../common/MentorDropDown/MentorDropDown';
import { Headline1 } from '../../../../../common/MentorText';
import {
	IReassignSession,
} from '../../../../../domain/Session/SessionMentorBean';
import SessionService from '../../../../../services/Session/Session.service';
import { MAX_RETRIEVED_SESSIONS } from '../../SessionsList';
import './FollowupSessionModal.scss';

interface IPropsFollowupSessionModal {
	show: boolean;
	style?: React.CSSProperties;
  sessionId: string;
  doctorId: string;
	toggleModal(show: boolean): void;
	confirm(newSession: string): void;
}

const getDateTime = (from: string, to: string) => {
  const date = moment(from).format('dddd DD [de] MMMM');
  const fromHour = moment(from).format('h:mm a');
  const toHour = moment(to).format('h:mm a');
  return `${fromHour} - ${toHour}, ${date}`;
};

const mapSessionsToDropdown = (sessions: IReassignSession[]) => {
  return sessions.map((session) => ({
    label: getDateTime(session.from, session.to),
    value: session.id,
  }));
};

const FollowupSessionModal: React.FC<IPropsFollowupSessionModal> = ({
	show,
	toggleModal,
	confirm,
  sessionId,
  doctorId,
}) => {
	const sessionService = new SessionService();
	const [loading, setLoading] = React.useState(false);
	const [selectedSession, setSelectedSession] = React.useState('');
	const [sessions, setSessions] = React.useState<IReassignSession[]>([]);
	const close = () => {
		toggleModal(false);
		setSelectedSession('');
		setSessions([]);
	};

	const handleConfirm = () => confirm(selectedSession);

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

	React.useEffect(() => {
		if (show && sessionId && doctorId) {
			setLoading(true);
			sessionService
				.getSessionsByDoctor(sessionId, doctorId, MAX_RETRIEVED_SESSIONS)
				.then((response: IReassignSession[]) => {
					setSessions(response);
					setLoading(false);
				});
		}
	}, [sessionId, doctorId]);

  const dropdownSessions = React.useMemo(() => mapSessionsToDropdown(sessions), [sessions]);

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
				<Title2>Agendando Cita de Seguimiento</Title2>
			</div>
			<div className='FollowupSessionModal ConsoleModalConfirm_body'>
        <div className='FollowupSessionModal_dropdownblock'>
          {loading && (
            <div className='FollowupSessionModal_loader'>
              <Loader />
            </div>
          )}
          {!loading && !sessions.length && (
            <div className="FollowupSessionModal_empty">
              <Headline1 color={FONTS.medium}>No hay horarios disponibles</Headline1>
            </div>
          )}
          {!loading && !!sessions.length && (
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
			</div>
			<div className='FollowupSessionModal_buttons'>
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

export default FollowupSessionModal;
