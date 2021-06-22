
import { ArrayHelpers, FieldArray } from 'formik';
import * as moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../../../../../common/Icon/Icon';
import colors from '../../../../../../common/MentorColor';
import { Body1 } from '../../../../../../common/MentorText';
import { ISessionPatientTreatmentForm } from '../../../../../../domain/Session/SessionEditPatientHistory';

import MentorService from '../../../../../../services/Mentor/Mentor.service';
import PatientBackgroundFormContext, {
	IPatientBackgroundFormContext,
} from '../../PatientHistoryForm/PatientBackgroundForm.context';
import TreatmentFields from './TreatmentFields';



export const TreatmentItem = styled.div`
	padding: 30px 0;
	border-bottom: 1px solid ${colors.MISC_COLORS.background_grey_2};
	&:last-child {
		border-bottom: 0;
	}
	input {
		padding-right: 16px !important;
	}
`;

export const UnitWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	div {
		margin-right: 10px;
	}
	span {
		white-space: nowrap;
	}
`;

export const Unit = styled.span`
	padding-bottom: 10px;
`;

export const OptionsHandler = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
	button {
		align-items: center;
		background: transparent;
		border: 0;
		display: flex;
		${Body1} {
			color: ${colors.BACKGROUND_COLORS.background_green};
		}
		svg {
			fill: ${colors.BACKGROUND_COLORS.background_green};
		}
		&:not([disabled]) {
			cursor: pointer;
		}
		&[disabled] {
			${Body1} {
				color: ${colors.BACKGROUND_COLORS.background_disabled_button}!important;
			}
			svg {
				fill: ${colors.BACKGROUND_COLORS.background_disabled_button}!important;
			}
		}
		&:hover {
			${Body1} {
				color: ${colors.BACKGROUND_COLORS.background_dark_green};
			}
			svg {
				fill: ${colors.BACKGROUND_COLORS.background_dark_green};
			}
		}
		&:active {
			${Body1} {
				color: ${colors.BACKGROUND_COLORS.background_dark_green};
			}
			svg {
				fill: ${colors.BACKGROUND_COLORS.background_dark_green};
			}
		}
	}
`;

export interface IPropsHistoryTreatmentForm {
	isEdit?: boolean;
	forceDisable?: boolean;
}

// const MAX_MEDICINE_AMOUNT = 500;
// const MAX_MEDICINE_AMOUNT = 5;

const HistoryTreatmentForm: React.FC<IPropsHistoryTreatmentForm> = (props:any) => {
	const mentorService = new MentorService();
	
	const renderTreatment = (ctxt: IPatientBackgroundFormContext) => {
		const treatments = !!ctxt.values.case.treatments
			? ctxt.values.case.treatments
			: ([] as ISessionPatientTreatmentForm[]);

		return (arrayHelpers: ArrayHelpers) => {
			const redirectToRecetaMedica = async () => { 
				const url = window.location.href;
				const sessionID = url.substring(url.lastIndexOf('/') + 1);
					await mentorService.getMentorAndPatientInSession(sessionID).then((data: any) => {
							const mentorPatient = {
								diagnostic: "XYZ",
								doctor: {
									doctorCmp: data.doctor.cmp,
									doctorFirstName: data.doctor.name,
									doctorLastName: data.doctor.last_name,
									doctorSpecialty: data.doctor.title,
									hasDigitalCertificate: data.doctor.digital_certificate,
								},
								ipressCode: "1112",
								medicalAppointmentId: sessionID,
								patient: {
									documentType: (data.patient.document_type === "DNI") ? "1" : "1",
									motherLastName: data.patient.second_last_name,
									patientAddress: data.patient.address,
									patientAge: moment().diff(data.patient.birthdate, 'years',false),
									patientClinicHistory: data.patient.clinic_history,
									patientDateOfBirth: data.patient.birthdate,
									patientDni: data.patient.document_number,
									patientEmail: data.patient.email,
									patientFirstName: data.patient.name,
									patientLastName: data.patient.last_name,
									patientPhone: data.patient.phone
								}
			
							}

							mentorService.sendMentorAndPatientInfo(mentorPatient).then((response: any) => {
								window.open(sessionID + '/prescription/' + response.draftResponse.draftNumber, '_blank');
								
							})
					
					}).catch((error: any) => {
						if (error.response && error.response.data) {
							const {code} = error.response.data;
							if (code === 404) {
								window.location.assign('/');
							}
						}
					});
			}
			const addNewMedicine = () =>
				arrayHelpers.push({
					activePrinciples: '',
					brand: '',
					component: '',
					concentration: '',
					extra_info: '',
					frequency: '',
					name: '',
					period: '',
					pharmaceuticalForm: '',
					quantity: '',
					routeofAdministration: '',
					salesUnit: '',
				});

				
			const removeMedicine = (i: number) => () => arrayHelpers.remove(i);
			if (treatments.length === 0) {
				return (
					<OptionsHandler>
						{/* <button
							disabled={
								treatments.length >= MAX_MEDICINE_AMOUNT
							}
							onClick={addNewMedicine}
							type={'button'}
						>
							<Icon name={'add-circle'} />
							<Body1>Agregar medicamento-------</Body1>
						</button> */}
						
						<button
							
							onClick={redirectToRecetaMedica}
							type={'button'}
						>
							<Icon name={'add-circle'} />
							<Body1>Agregar medicamento</Body1>
						</button>
					</OptionsHandler>
				);
			}

			return treatments.map(
				(value: ISessionPatientTreatmentForm, index: number) => (
					<TreatmentFields
						key={`treatment_${index}`}
						ctxt={ctxt}
						index={index}
						treatmentLen={treatments.length}
						ctxtValue={value}
						service={mentorService}
						removeMedicine={removeMedicine}
						addNewMedicine={addNewMedicine}
					/>
				),
			);
		};
	};

	return (
		<PatientBackgroundFormContext.Consumer>
			{(context: IPatientBackgroundFormContext) => {
				return (
					<FieldArray
						name='case.treatments'
						render={renderTreatment(context)}
					/>
				);
			}}
		</PatientBackgroundFormContext.Consumer>
	);
};

export default HistoryTreatmentForm;
