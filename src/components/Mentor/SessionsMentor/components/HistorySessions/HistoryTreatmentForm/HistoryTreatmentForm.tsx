
import { ArrayHelpers, FieldArray } from 'formik';
// import * as moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
// import Icon from '../../../../../../common/Icon/Icon';
import colors from '../../../../../../common/MentorColor';
import { Body1 } from '../../../../../../common/MentorText';
import { ISessionPatientTreatmentForm } from '../../../../../../domain/Session/SessionEditPatientHistory';
import MentorService from '../../../../../../services/Mentor/Mentor.service';
import PatientBackgroundFormContext, {
	IPatientBackgroundFormContext
} from '../../PatientHistoryForm/PatientBackgroundForm.context';
// import { LOCAL_STORAGE_PRESCRIPTION_URL } from '../Constants';
// import HistoryTreatmentsFormContext from '../HistoryTreatmentForm/HistoryTreatmentsFormContext';
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
	
	const handleMessage = (event: any) => {
		// tslint:disable:no-console
        console.log("A key was pressed", event.keyCode);
		console.log({ event });
		console.log(event.data);
        if (event.origin.startsWith(window.location.origin) && event.data === 'messagereceipe') {
            // The data was sent from your site.
            // Data sent with postMessage is stored in event.data:
            // tslint:disable:no-console
            console.log(event.data);
			location.reload();
        } else {
            // The data was NOT sent from your site!
            // Be careful! Do not use it. This else branch is
            // here just for clarity, you usually shouldn't need it.
            return;
        }
    };

    React.useEffect(() => {
        window.addEventListener("message", handleMessage);

        // cleanup this component
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

	// const diagnostic = React.useContext(HistoryTreatmentsFormContext);
	// const [show, setShow] = React.useState(true);
	// const [message, setMessage] = React.useState("");
	const renderTreatment = (ctxt: IPatientBackgroundFormContext) => {
		const treatments = !!ctxt.values.case.treatments
			? ctxt.values.case.treatments
			: ([] as ISessionPatientTreatmentForm[]);

		return (arrayHelpers: ArrayHelpers) => {
			// const redirectToRecetaMedica = async () => { 
			// 	// setShow(false)
			// 	const url = window.location.href;
			// 	const sessionID = url.substring(url.lastIndexOf('/') + 1);
			// 		await mentorService.getMentorAndPatientInSession(sessionID).then((data: any) => {
			// 				const mentorPatient = {
			// 					diagnostic: diagnostic.diagonostic,
			// 					doctor: {
			// 						doctorCmp: data.doctor.cmp,
			// 						doctorFirstName: data.doctor.name,
			// 						doctorLastName: data.doctor.last_name,
			// 						doctorSpecialty: data.doctor.title,
			// 						hasDigitalCertificate: data.doctor.digital_certificate,
			// 					},
			// 					ipressCode: "1112",
			// 					medicalAppointmentId: sessionID,
			// 					patient: {
			// 						documentType: (data.patient.document_type === "DNI") ? "1" : "1",
			// 						motherLastName: data.patient.second_last_name,
			// 						patientAddress: buildAddress(data.patient.address),
			// 						patientClinicHistory: data.patient.clinic_history || '',
			// 						patientDateOfBirth: data.patient.birthdate,
			// 						patientDni: data.patient.document_number,
			// 						patientEmail: data.patient.email,
			// 						patientFirstName: data.patient.name,
			// 						patientLastName: data.patient.last_name,
			// 						patientPhone: data.patient.phone
			// 					}
			
			// 				}

			// 				mentorService.sendMentorAndPatientInfo(mentorPatient).then((response: any) => {
			// 					if(response.draftResponse === null) {
			// 						// setMessage(response.error)
			// 					} else { 
			// 						localStorage.setItem(LOCAL_STORAGE_PRESCRIPTION_URL, `${response.draftResponse.processUrl}`);
			// 						// setShow(true)
			// 						window.open(sessionID + '/prescription/' + response.draftResponse.draftNumber, '_blank');
			// 					}
			// 				})
			// 		}).catch((error: any) => {
			// 			if (error.response && error.response.data) {
			// 				const {code} = error.response.data;
			// 				if (code === 404) {
			// 					window.location.assign('/');
			// 				}
			// 			}
			// 		});
			// }

			// const buttonAttrBase: any = {
			// 	onClick: redirectToRecetaMedica,
			// 	style: { margin: '40px 0 0 auto' },
			// 	type: "button"
			//   };

			// const  isValidAddressObject = (address: any): boolean => {
			// 	return Boolean(
			// 		address.street &&
			// 		address.district &&
			// 		address.city &&
			// 		address.country
			// 	);
			// };

			// const buildAddress = (data: any) => {				
			// 	let addressObject = {}
			// 	try {
			// 		addressObject = JSON.parse(data)
			// 	} catch (error) {
			// 		addressObject = {}
			// 	}
		
			// 	if (Object.entries(addressObject).length === 0) {
			// 		return 'Sin dirección';
			// 	}
		
			// 	if (isValidAddressObject(addressObject)) {
			// 		const sortable = Object.entries(addressObject)
			// 			.sort(([, a]: any, [, b]: any) => a - b)
			// 			.reduce((r, [k, v]) => {
			// 				if (
			// 					[
			// 						"address",
			// 						"country",
			// 						"district",
			// 						"city",
			// 						"number"
			// 					].includes(k)
			// 				) {
			// 					return [...r, v];
			// 				}
			// 				return r;
			// 			}, []);
		
			// 		return sortable.join(", ");
			// 	}
			// 	return "";
			// }
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
					<p>.</p>
					// <OptionsHandler>
					// 	{/* <button
					// 		disabled={
					// 			treatments.length >= MAX_MEDICINE_AMOUNT
					// 		}
					// 		onClick={addNewMedicine}
					// 		type={'button'}
					// 	>
					// 		<Icon name={'add-circle'} />
					// 		<Body1>Agregar medicamento-------</Body1>
					// 	</button> */}
					// 	{/* {show &&(
					// 		<button
					// 			disabled={!show}
					// 			onClick={redirectToRecetaMedica}
					// 			type={'button'}
					// 		>  
								
					// 				<Icon name={'add-circle'} />
					// 				<Body1>Agregar medicamento </Body1>
							
					// 		</button>
					// 	)}
					// 	{!show && message === '' &&(
							
					// 		<button
					// 			disabled={!show}
					// 			type={'button'}
					// 		>  
								
					// 				<Body1>Procesando ... </Body1>
							
					// 		</button>
							
					// 	)}

					// 	{ message !== '' &&(
					// 		<div><Body1 style={{color:'red'}}>Error!: {message}, comunicarse con su administrador.</Body1></div>

					// 	)} */}

						
					
					// </OptionsHandler>
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
