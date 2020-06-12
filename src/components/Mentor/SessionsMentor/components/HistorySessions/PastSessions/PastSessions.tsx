import * as moment from 'moment';
import * as React from 'react';

import Icon from '../../../../../../common/Icon/Icon';
import {
	Body1,
	Heading3,
	Headline1,
} from '../../../../../../common/MentorText';
import { buildQuestionBlocks } from '../../../../../../common/Utils/Utilities';
import {
	ISessionPatientPastCase,
	ISessionPatientTreatmentForm,
} from '../../../../../../domain/Session/SessionEditPatientHistory';
import {
	ISessionDoctor,
	ISessionPatient,
	ISessionTriage,
} from '../../../../../../domain/Session/SessionMentorBean';
import PatientBlockContainer from '../../PatientBlockContainer/PatientBlockContainer';
import SimpleFullCard from '../../SimpleFullCard/SimpleFullCard';
import './PastSessions.scss';

interface IPropsPastSessions {
	pastCases: ISessionPatientPastCase[];
}

interface IPropsMedicineBlock {
	icon: string;
	time: string;
	name: string;
	amount: string;
	period: string;
}

const getPatientFullname = (patient: ISessionPatient): string => {
	const name = (patient && patient.name) || '';
	const lastName = (patient && patient.last_name) || '';
	const secondLastName = (patient && patient.second_last_name) || '';
	return `${name} ${lastName} ${secondLastName}`;
};

const getDoctorFullname = (doctor: ISessionDoctor): string => {
	const name = (doctor && doctor.name) || '';
	const lastName = (doctor && doctor.last_name) || '';
	return `${name} ${lastName}`;
};

const MedicineBlock: React.FC<IPropsMedicineBlock> = ({
	amount,
	icon,
	name,
	period,
	time,
}) => {
	return (
		<div className='PastSessions_medicines'>
			<div>
				<Icon style={{ height: '50px' }} name={icon} />
			</div>
			<div>
				<Body1 weight='400'>{time}</Body1>
				<Body1 weight='400'>
					{amount} de {name}
				</Body1>
				<Body1 weight='400'>{period}</Body1>
			</div>
		</div>
	);
};

const PastSessions: React.FC<IPropsPastSessions> = ({ pastCases }) => {
	const renderPatientCase = (triage: ISessionTriage = {} as ISessionTriage) => {
		const useCase = triage && triage.use_case;
		const questions = (triage && triage.questions) || [];
		return (
			<div className='PastSessions_section'>
				<Heading3>Caso del paciente</Heading3>
				<PatientBlockContainer
					blocks={buildQuestionBlocks(useCase, questions)}
				/>
			</div>
		);
	};

	const renderPatientTreatments = (
		treatments: ISessionPatientTreatmentForm[],
	) => {
		return treatments.map(
			(medicine: ISessionPatientTreatmentForm, i: number) => (
				<MedicineBlock
					key={`${medicine.component}_${i}`}
					icon='medicine'
					amount={medicine.quantity}
					name={medicine.name}
					period={medicine.period}
					time={medicine.frequency}
				/>
			),
		);
	};

	const renderConsultDate = (from: string) => {
		const date = moment(from).format('DD [de] MMMM [del] YYYY');
		return `Consulta del ${date}`;
	};

	return (
		<div className='PastSessions'>
			<SimpleFullCard
				card={{
					description: '',
					isLink: false,
					noHeader: true,
					subtitle: '',
					title: '',
				}}
			>
				{pastCases.map((pastCase: ISessionPatientPastCase, i: number) => {
					const from = pastCase && pastCase.from;
					const patient = pastCase && pastCase.patient;
					const consult = pastCase && pastCase.consult;
					const doctor = pastCase && pastCase.doctor;
					const patientFullname = getPatientFullname(patient);
					const doctorFullname = getDoctorFullname(doctor);
					const doctorSpeciality = doctor && doctor.speciality_name;
					const doctorCMP = doctor && doctor.cmp;
					const triage = consult && consult.triage;
					const diagnostic = consult && consult.diagnostic;
					const treatments = consult && consult.treatments;
					const recommendation = consult && consult.recommendation;
					return (
						<React.Fragment key={`pastCase_${i}`}>
							<div className='PastSessions_title'>
								<Headline1 weight='600'>
									{!!from && renderConsultDate(from)}
								</Headline1>
							</div>
							{!!doctor && !!patient && (
								<div className='PastSessions_section'>
									<Heading3>Información general de la consulta</Heading3>
									<PatientBlockContainer
										blocks={[
											{ label: 'DOCTOR', value: doctorFullname },
											{ label: 'PACIENTE', value: patientFullname },
											{
												label: doctorSpeciality,
												value: (doctorCMP && `CMP: ${doctorCMP}`) || '',
											},
										]}
									/>
								</div>
							)}
							{!!triage && renderPatientCase(triage)}
							{!!diagnostic && (
								<div className='PastSessions_section'>
									<Heading3>Diagnóstico</Heading3>
									<Body1 weight='400'>{diagnostic}</Body1>
								</div>
							)}
							{!!treatments && (
								<div className='PastSessions_section'>
									<Heading3>Tratamiento</Heading3>
									<div className='PastSessions_medContainer'>
										{renderPatientTreatments(treatments)}
									</div>
								</div>
							)}
							{!!recommendation && (
								<div className='PastSessions_section'>
									<Heading3>Recomendaciones del tratamiento</Heading3>
									<Body1 weight='400'>{recommendation}</Body1>
								</div>
							)}
						</React.Fragment>
					);
				})}
			</SimpleFullCard>
		</div>
	);
};

export default PastSessions;
