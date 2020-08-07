import { ArrayHelpers, FieldArray } from 'formik';
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

const MAX_MEDICINE_AMOUNT = 5;

const HistoryTreatmentForm: React.FC<IPropsHistoryTreatmentForm> = (props) => {
	const mentorService = new MentorService();
	const renderTreatment = (ctxt: IPatientBackgroundFormContext) => {
		const treatments = !!ctxt.values.case.treatments
			? ctxt.values.case.treatments
			: ([] as ISessionPatientTreatmentForm[]);

		return (arrayHelpers: ArrayHelpers) => {
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
			const removeMedicine = (
				index: number,
				callback: () => void | undefined,
			) => {
				return () => {
					arrayHelpers.remove(index);
					if (callback && typeof callback === 'function') {
						callback();
					}
				};
			};
			if (treatments.length === 0) {
				return (
					<OptionsHandler>
						<button
							disabled={
								treatments.length >= MAX_MEDICINE_AMOUNT || !!props.forceDisable
							}
							onClick={addNewMedicine}
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
