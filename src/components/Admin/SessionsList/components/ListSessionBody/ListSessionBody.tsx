// tslint:disable:no-console
import * as React from 'react';
import styled from 'styled-components';
import BadgeLabel from '../../../../../common/Badge/BadgeLabel';
import DropdownItem from '../../../../../common/DropdownItem/DropdownItem';
import DropdownMenu from '../../../../../common/DropdownMenu/DropdownMenu';
import colors from '../../../../../common/MentorColor';
import receta from "../../../../../assets/images/linksAdmin/receta-medica.png";
import citaMed from "../../../../../assets/images/linksAdmin/cita_medica.png";
import callP from "../../../../../assets/images/linksAdmin/cita.png";
import historyM from "../../../../../assets/images/linksAdmin/historia-clinica.png";
import rating from "../../../../../assets/images/linksAdmin/rating.png";
import exams from "../../../../../assets/images/linksAdmin/examenes-med.png";
import descansoM from "../../../../../assets/images/linksAdmin/descanso-med.png";
import pacienteHover from "../../../../../assets/images/linksAdmin/pacienteH.png";
import doctorHover from "../../../../../assets/images/linksAdmin/doctorHover.png";
import descansoHover from "../../../../../assets/images/linksAdmin/descansoHover.png";
import examenesHover from "../../../../../assets/images/linksAdmin/examenesHover.png";
import historiaCHover from "../../../../../assets/images/linksAdmin/historiaCHover.png";
import recetaHover from "../../../../../assets/images/linksAdmin/recetaHover.png";
import ratingHover from "../../../../../assets/images/linksAdmin/ratingHover.png";
import constancia from "../../../../../assets/images/linksAdmin/constancia.png";
import constanciaHover from "../../../../../assets/images/linksAdmin/constanciaHover.png";
import constanciaDisabled from "../../../../../assets/images/linksAdmin/constanciaDisabled.png";
import interconsulta from "../../../../../assets/images/linksAdmin/interconsulta.png";
import interconsultaHover from "../../../../../assets/images/linksAdmin/interconsultaHover.png";
import interconsultaDisabled from "../../../../../assets/images/linksAdmin/interconsultaDisabled.png";
import pacienteDisabled from "../../../../../assets/images/linksAdmin/pacienteDisabled.png";
import doctorDisabled from "../../../../../assets/images/linksAdmin/doctorDisabled.png";
import descansoDisabled from "../../../../../assets/images/linksAdmin/descansoDisabled.png";
import examenesDisabled from "../../../../../assets/images/linksAdmin/examenesDisabled.png";
import historiaDisabled from "../../../../../assets/images/linksAdmin/historiaDisabled.png";
import recetaDisabled from "../../../../../assets/images/linksAdmin/recetaDisabled.png";
import ratingDisabled from "../../../../../assets/images/linksAdmin/ratingDisabled.png";
import calendar from "../../../../../assets/images/linksAdmin/calendarIcon.png";
import copyIcon from "../../../../../assets/images/linksAdmin/copiado.png";
import {
	Small2,
} from '../../../../../common/MentorText';
import { MomentDateParser } from '../../../../../domain/DateManager/MomentDateParser';
import {
	ISessionBody,
	SessionBean,
} from '../../../../../domain/Session/SessionBean';
import SessionItem from '../SessionItem/SessionItem';
// import { findDOMNode } from 'react-dom';

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

const getFormattedAddress = (address: string) => {
	try {
		const parsedAddress = JSON.parse(address);
		return parsedAddress ? `${parsedAddress.street} ${parsedAddress.number}` : address;
	} catch (e) {
		return address;
	}
}
/*
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
*/
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
	const [copySuccess, setCopySuccess] = React.useState<string>('');
	const [isSelected,setIsSelected] = React.useState<boolean>();
	const toggleOpenMenu = () => setOpenMenu((prev) => !prev);
	const wrapperRef = React.useRef(null);
	const {
		doctor,
		patient,
		id = '',
		// patient_link= '',// :sessionURL = '',
		// 	paid = '',
		payment,
	} = props.session;
	const sessionBean = new SessionBean(props.session);

	const doctorId = (doctor && doctor.id) || '';
	const doctorName = (doctor && doctor.name) || '';
	const doctorLN = (doctor && doctor.last_name) || '';

	// const patientURL = sessionURL && id && `${sessionURL}/${doctorId}`;
	const patientDoc = patient && patient.document_number;
	const historyURL = `${window.location.origin}/doctor/sesion/${id}`;
// const medialLeaveURL = sessionBean.session.consult && sessionBean.session.consult.medicalLeaveStartDate && `${window.location.origin}/patients/medical-leave/${id}`;
	const ratingURL = `${process.env.REACT_APP_WEB_STUDENT_BASE_URL}/rating/session/${id}`;
// const prescriptionURL = `${process.env.REACT_APP_WEB_STUDENT_BASE_URL}/direccion_receta?sessionId=${id}`;
// const paymentURL = payment && payment.cipUrl; 
 	const prescriptionURL = sessionBean.getURL_prescription(); 
 	const leaveURL = sessionBean.getMedicalLeave();
	const examsURL = sessionBean.getMedicalExams();
	const interconsult = sessionBean.getInterconsult();
	const medicalCertificate = sessionBean.getMedicalCertificate();
	const usedBenefit = (payment && payment.benefit_id) || '';
	const patientId = (patient && patient.id) || '';
	const patientName = (patient && patient.name) || '';
	const patientLN = (patient && patient.last_name) || '';
	const patientSLastName = (doctor && patient.second_last_name) || '';
	const patientAddress = (patient && patient.address && getFormattedAddress(patient.address)) || '';
	const patientUbigeo = (patient && patient.ubigeo) || '';
	const patientGender = (patient && patient.gender) || -1;
	const companyName = (payment && payment.company_benefit_name) || '';

	const newSessionURL = `${process.env.REACT_APP_CONFERENCE_BASE_URL
		}?room=${id}&passcode=${process.env.REACT_APP_CONFERENCE_CODE}`;

	// const patientPaid = formatStrNumber(paid);

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
	const handleConfirmationClick = () => {
		props.selectSession(id);
		props.showConfirmationModal(true);
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
/*
	const assistanceComponent = React.useMemo(
		() => renderAssistance(sessionBean.getAssistance()),
		[props.session],
	);*/

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
	const copyLink = async (event:any)=>{
		
		const enlace = event.target;
		let anyNavigator: any;
		anyNavigator = window.navigator;
		
		try {
			await anyNavigator.clipboard.writeText(enlace.title);
			setCopySuccess(enlace.title);
			setIsSelected(true)
		  } catch (err) {
			setCopySuccess('Failed to copy!');
		  }
		setTimeout(()=>{setIsSelected(false)},4000)
	}
	return (
		<ContainerRow>
			<div className='ListSessions_column ListSessions_column--date'>
				<Small2 weight={"400"} color={'#000000'}>
					{sessionBean.getShorterDay(new MomentDateParser())}
				</Small2>
				<Small2 weight={"400"} color={'#000000'}>
					{sessionBean.getFromTime(new MomentDateParser())}
					</Small2>
			</div>
			{/*<div className='ListSessions_column'>{assistanceComponent}</div>*/}
			<div className='ListSessions_column ListSessions_column--mentor'>
				<h6>{doctorName}  </h6>
				<h6>{doctorLN} </h6>
			</div>
			<div className='ListSessions_column ListSessions_column--mentor'>
				<SessionItem
					id={patientId}
					usedBenefit={usedBenefit}
					name={`${patientName} ${patientLN}`}
					email={patient && patient.email}
					address={patientAddress}
					ubigeo={patientUbigeo}
					gender={patientGender}
					lastname={patientSLastName}
					companyName={companyName}
				/>
			</div>
			<div className='ListSessions_column ListSessions_numbers'>
				{patientDoc && <Small2 weight={"400"} color={"#000000"}>{patientDoc}</Small2>}
			</div>
			<div className='ListSessions_column ListSessions_numbers'>
				{patient && !!patient.phone && (
					<Small2 weight={"400"} color={"#000000"}>{patient && patient.phone}</Small2>
				)}
			</div>
			<div className='ListSessions_column ListSessions_column--date'>
				<Small2 weight={"400"} >
					{sessionBean.getReservationDate(new MomentDateParser())}
				</Small2>
				<Small2 weight={"400"} >
					{sessionBean.getReservationTime(new MomentDateParser())}
				</Small2>
			</div>
			{/*
			<div className='ListSessions_column ListSessions_numbers'>
				{patientPaid && (
					<Subhead1 color={FONTS.dark}>S/. {patientPaid}</Subhead1>
				)}
			</div>*/}
			<div className='ListSessions_column'>{renderPaymentState(isPending)}</div>
			<div
				className='ListSessions_column '
				style={{ borderColor: colors.MISC_COLORS.background_grey_2 }}
			>
				<div>
					{!!newSessionURL && (
						<div onClick={copyLink} >
							{!!isSelected && copySuccess===newSessionURL
								? <img src={copyIcon} style={{paddingLeft:'2px',paddingRight:'2px'}}/>
								: 
								<div className='ListSessions_btnLinks'>
									<img src={callP}/>
									<img src={pacienteHover} title={newSessionURL}/>
								</div>
							}
						</div>
					)}
					{!newSessionURL && (<img src={pacienteDisabled} style={{paddingLeft:'2px',paddingRight:'2px'}}/>)}
				</div>
				<div>
					{!!newSessionURL && (
						<div  onClick={copyLink}>
							{!!isSelected && copySuccess===`${newSessionURL}&doctor=1`
							? <img src={copyIcon} style={{paddingLeft:'2px',paddingRight:'2px'}}/>
							: 
							<div className='ListSessions_btnLinks'>
								<img src={citaMed}/>
								<img src={doctorHover} title={`${newSessionURL}&doctor=1`}/>
							</div>
							}
						</div>
					)}
					{!newSessionURL && (<img src={doctorDisabled} style={{paddingLeft:'2px',paddingRight:'2px'}}/>)}
				</div>
				<div>
					{!!historyURL && (
						<a  onClick={copyLink}>
							{!!isSelected && copySuccess === historyURL
							? <img src={copyIcon} style={{paddingLeft:'2px',paddingRight:'2px'}}/>
							: 
							<div className='ListSessions_btnLinks'>
								<img src={historyM}/>
								<img src={historiaCHover} title={historyURL}/></div>
							}
						</a>
					)}
					{!historyURL && (<img src={historiaDisabled} style={{paddingLeft:'2px',paddingRight:'2px'}}/>)}
				</div>
				<div>
					{!!ratingURL && (
						<div onClick={copyLink}>
							{!!isSelected && copySuccess === ratingURL
							? <img src={copyIcon} style={{paddingLeft:'2px',paddingRight:'2px'}}/>: 
							<div className='ListSessions_btnLinks'>
								<img src={rating}/>
								<img src={ratingHover} title={ratingURL}/>
							</div>
							}
						</div>
					)}
					{!ratingURL && (<img src={ratingDisabled} style={{paddingLeft:'2px',paddingRight:'2px'}}/>)}
				</div>
				<div>
					{!!medicalCertificate && (
						<div onClick={copyLink}>
							{!!isSelected && copySuccess === medicalCertificate
							? <img src={copyIcon} style={{paddingLeft:'2px',paddingRight:'2px'}}/>: 
							<div className='ListSessions_btnLinks'>
								<img src={constancia}/>
								<img src={constanciaHover} title={medicalCertificate}/>
							</div>
							}
						</div>
					)}
					{
					  !medicalCertificate && (
					  <img src={constanciaDisabled} style={{paddingLeft:'2px',paddingRight:'2px'}}/>
					  )
					}
				</div>
			</div>
			<div
				className='ListSessions_column'
			>
				<div>
					{(!!prescriptionURL && sessionBean.isValidPrescription()) && (
						<div onClick={copyLink}>
							{!!isSelected && copySuccess === prescriptionURL
							? <img src={copyIcon} style={{paddingLeft:'2px',paddingRight:'2px'}}/>: 
							<div className='ListSessions_btnLinks'>
								<img src={receta}/>
								<img src={recetaHover} title={prescriptionURL}/>
							</div>
							}
						</div>
					)}
					{!prescriptionURL && (
						<img src={recetaDisabled} style={{paddingLeft:'2px',paddingRight:'2px'}}/>
						)
					}
				</div>
				<div>
					{!!examsURL && (
						<div onClick={copyLink}>
							{!!isSelected && copySuccess === examsURL
							? <img src={copyIcon} style={{paddingLeft:'2px',paddingRight:'2px'}}/>: 
							<div className='ListSessions_btnLinks'>
								<img src={exams}/>
								<img src={examenesHover} title={examsURL}/>
							</div>
							}
						</div>
					)}
					{!examsURL  && (
						<img src={examenesDisabled} style={{paddingLeft:'2px',paddingRight:'2px'}}/>
						)
					}
				</div>
				<div>
					{!!leaveURL && (
					<div onClick={copyLink}>
						{!!isSelected && copySuccess === leaveURL
						? <img src={copyIcon} style={{paddingLeft:'2px',paddingRight:'2px'}}/>: 
						<div className='ListSessions_btnLinks'>
							<img src={descansoM}/>
							<img src={descansoHover} title={leaveURL}/>
						</div>
						}
					</div>
					)}
					{
					  !leaveURL && (
					  <img src={descansoDisabled} style={{paddingLeft:'2px',paddingRight:'2px'}}/>
					  )
					}
				</div>
				<div>
					{!!interconsult && (
						<div onClick={copyLink}>
						{!!isSelected && copySuccess === interconsult
						? <img src={copyIcon} style={{paddingLeft:'2px',paddingRight:'2px'}}/>: 
						<div className='ListSessions_btnLinks'>
							<img src={interconsulta}/>
							<img src={interconsultaHover} title={interconsult}/>
						</div>
						}
						</div>
					)}
					{
					  !interconsult && (
					  <img src={interconsultaDisabled} style={{paddingLeft:'2px',paddingRight:'2px'}}/>
					  )
					}
				</div>
			</div>
			{/*
			<div
				className='ListSessions_column ListSessions_separator'
				style={{ borderColor: colors.MISC_COLORS.background_grey_2 }}
			>
				{!!paymentURL && (
					<a href={paymentURL} target='blank'>
						Pago
					</a>
				)}
				</div>*/}
            {/*<div className='ListSessions_column ListSessions_separator'>
                {
                    medialLeaveURL && (<a href={medialLeaveURL} style={{cursor: "pointer"}}>Con descanso médico</a>)
                }
            </div>*/}
			{/*<div
				className='ListSessions_column ListSessions_separator'
				style={{ borderColor: colors.MISC_COLORS.background_grey_2 }}
			>
				{!!ratingURL && (
					<a href={ratingURL} target='blank'>
						Link
					</a>
				)}
			</div>*/}
			<div title='Acciones' className='ListSessions_column'>
				<div className='ListSessions_dropdownContainer' ref={wrapperRef}>
					<img src={calendar} onClick={toggleOpenMenu} style={{ cursor: 'pointer' }}/>
					<DropdownMenu open={openMenu} position='left' loading={loadingMenu}>
						<DropdownItem onClick={handleCancelClick}>
							Cancelar Cita
						</DropdownItem>
						<DropdownItem onClick={handleRescheduleClick}>
							Reagendar Cita
						</DropdownItem>
						<DropdownItem onClick={handleConfirmationClick}>
							Confirmar Cita
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
