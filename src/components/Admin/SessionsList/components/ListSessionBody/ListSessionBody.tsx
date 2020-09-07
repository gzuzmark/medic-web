import * as React from 'react';
import styled from 'styled-components';
import BadgeLabel from '../../../../../common/Badge/BadgeLabel';
import { TextBold1 } from '../../../../../common/ConsoleText';
import DropdownItem from '../../../../../common/DropdownItem/DropdownItem';
import DropdownMenu from '../../../../../common/DropdownMenu/DropdownMenu';
import Icon from '../../../../../common/Icon/Icon';
import colors, { FONTS } from '../../../../../common/MentorColor';
import {
	Heading3,
	LIGHT_TEXT,
	Subhead1,
} from '../../../../../common/MentorText';
import { formatStrNumber } from '../../../../../common/Utils/Utilities';
import { MomentDateParser } from '../../../../../domain/DateManager/MomentDateParser';
import {
	ISessionBody,
	SessionBean,
} from '../../../../../domain/Session/SessionBean';
import SessionItem from '../SessionItem/SessionItem';

const ContainerRow = styled.div`
	align-items: center;
	display: flex;
	width: 100%;
	.icon-exclamation {
		fill: ${colors.BACKGROUND_COLORS.background_green};
		&:hover {
			fill: ${colors.BACKGROUND_COLORS.background_dark_green};
		}
		&:focus {
			fill: ${colors.BACKGROUND_COLORS.background_dark_green};
		}
	}
`;

const renderAssistance = (assistance: string) => {
	if (!assistance) {
		return null;
	}
	const colorClass =
		assistance === 'Confirmada'
			? 'green'
			: assistance === 'No Asistió'
			? 'red'
			: 'default';
	return <BadgeLabel color={colorClass}>{assistance}</BadgeLabel>;
};

const renderPaymentState = (isPending: boolean) => {
	const colorClass = isPending ? 'yellow' : 'green';
	const label = isPending ? 'Pendiente' : 'Confirmado';
	return <BadgeLabel color={colorClass}>{label}</BadgeLabel>;
};

interface IPropsListSessionsBody {
	session: ISessionBody;
	showCancelModal: (shouldShow: boolean) => void;
	selectDoctor: (doctorId: string) => void;
	selectSession: (sessionId: string) => void;
	showRescheduleModal: (shouldShow: boolean) => void;
	showFollowupModal: (shouldShow: boolean) => void;
	getSessionPDF: (sessionId: string) => Promise<any>;
	showConfirmationModal: (shouldShow: boolean) => void;
	confirmSessionPayment: (sessionId: string) => Promise<any>;
}

const downloadPDF = (name: string, base64: string) => {
	const linkSource = `data:application/pdf;base64,${base64}`;
	const downloadLink = document.createElement('a');
	const fileName = `${name}.pdf`;

	downloadLink.name = 'downloadPDFLink';
	downloadLink.href = linkSource;
	downloadLink.download = fileName;
	downloadLink.click();
};

const ListSessionsBody: React.FC<IPropsListSessionsBody> = (props) => {
	const [loadingMenu, setLoadingMenu] = React.useState<boolean>(false);
	const [openMenu, setOpenMenu] = React.useState<boolean>(false);
	const toggleOpenMenu = () => setOpenMenu((prev) => !prev);
	const wrapperRef = React.useRef(null);
	const {
		doctor,
		patient,
		id = '',
		patient_link: sessionURL = '',
		paid = '',
		payment,
	} = props.session;
	const sessionBean = new SessionBean(props.session);

	const doctorId = (doctor && doctor.id) || '';
	const doctorName = (doctor && doctor.name) || '';
	const doctorLN = (doctor && doctor.last_name) || '';

	const patientURL = sessionURL && id && `${sessionURL}/${doctorId}`;
	const patientDoc = patient && patient.document_number;

	const patientId = (patient && patient.id) || '';
	const patientName = (patient && patient.name) || '';
	const patientLN = (patient && patient.last_name) || '';
	const patientAddress = ( patient && patient.address ) || '';
	const patientUbigeo = ( patient && patient.ubigeo ) || '';

	const patientPaid = formatStrNumber(paid);

	const isPending = payment && (payment.pending as boolean);

	const handleCancelClick = () => {
		props.selectSession(id);
		props.showCancelModal(true);
		toggleOpenMenu();
	};
	const handleRescheduleClick = () => {
		props.selectSession(id);
		props.showRescheduleModal(true);
		toggleOpenMenu();
	};
	const handleFollowupClick = () => {
		props.selectSession(id);
		props.selectDoctor(doctorId);
		props.showFollowupModal(true);
		toggleOpenMenu();
	};

	const handleDownloadPDF = () => {
		setLoadingMenu(true);
		props
			.getSessionPDF(id)
			.then((base64: string) => {
				downloadPDF(patientDoc, base64);
			})
			.finally(() => {
				setLoadingMenu(false);
				toggleOpenMenu();
			});
	};

	const assistanceComponent = React.useMemo(
		() => renderAssistance(sessionBean.getAssistance()),
		[props.session],
	);

	const handleClickOutside = (e: any) => {
		const current = wrapperRef && (wrapperRef.current as Element | null);
		if (
			current &&
			!current.contains(e.target) &&
			e.target.className !== 'DropdownItem'
		) {
			setOpenMenu(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside, false);
		return () => {
			document.removeEventListener('click', handleClickOutside, false);
		};
	}, []);

	return (
		<ContainerRow>
			<div className='ListSessions_column ListSessions_column--date'>
				<Heading3 weight={LIGHT_TEXT} color={FONTS.dark}>
					{sessionBean.getShorterDay(new MomentDateParser())}
				</Heading3>
				<TextBold1>{sessionBean.getFromTime(new MomentDateParser())}</TextBold1>
			</div>
			<div className='ListSessions_column'>{assistanceComponent}</div>
			<div className='ListSessions_column ListSessions_column--date'>
				<Heading3 weight={LIGHT_TEXT} color={FONTS.dark}>
					{sessionBean.getReservationDate(new MomentDateParser())}
				</Heading3>
				<TextBold1>
					{sessionBean.getReservationTime(new MomentDateParser())}
				</TextBold1>
			</div>
			<div className='ListSessions_column ListSessions_column--mentor'>
				<SessionItem name={`${doctorName} ${doctorLN}`} />
			</div>
			<div className='ListSessions_column ListSessions_column--mentor'>
				<SessionItem
					id={patientId}
					name={`${patientName} ${patientLN}`}
					email={patient && patient.email}
					address={patientAddress}
					ubigeo={patientUbigeo}
				/>
			</div>
			<div className='ListSessions_column ListSessions_numbers'>
				{patientPaid && (
					<Subhead1 color={FONTS.dark}>S/. {patientPaid}</Subhead1>
				)}
			</div>
			<div className='ListSessions_column'>{renderPaymentState(isPending)}</div>
			<div className='ListSessions_column ListSessions_numbers'>
				{patientDoc && <Subhead1 color={FONTS.dark}>{patientDoc}</Subhead1>}
			</div>
			<div className='ListSessions_column ListSessions_numbers'>
				{patient && !!patient.phone && (
					<Subhead1 color={FONTS.dark}>{patient && patient.phone}</Subhead1>
				)}
			</div>
			<div
				className='ListSessions_column ListSessions_separator'
				style={{ borderColor: colors.MISC_COLORS.background_grey_2 }}
			>
				{!!sessionURL && (
					<a href={sessionURL} target='blank'>
						Paciente
					</a>
				)}
				{!!sessionURL && !!patientURL && (
					<div className='ListSessions_linkseparator' />
				)}
				{!!patientURL && (
					<a href={patientURL} target='blank'>
						Doctor
					</a>
				)}
			</div>
			<div title='Acciones' className='ListSessions_column'>
				<div className='ListSessions_dropdownContainer' ref={wrapperRef}>
					<Icon
						name='calendar-check'
						click={toggleOpenMenu}
						attr={{ 'data-tip': 'Acciones' }}
						style={{ cursor: 'pointer', fill: '#1ECD96' }}
					/>
					<DropdownMenu open={openMenu} position='left' loading={loadingMenu}>
						<DropdownItem onClick={handleCancelClick}>
							Cancelar Cita
						</DropdownItem>
						<DropdownItem onClick={handleRescheduleClick}>
							Reagendar Cita
						</DropdownItem>
						<DropdownItem onClick={handleFollowupClick}>
							Agendar Cita
						</DropdownItem>
						<DropdownItem onClick={handleDownloadPDF}>
							Descargar Cita
						</DropdownItem>
					</DropdownMenu>
				</div>
			</div>
		</ContainerRow>
	);
};

export default ListSessionsBody;
