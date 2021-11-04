import * as React from 'react';
import { ISessionNutritionistFormValidations } from '../NutritionistForm/NutritionistForm.context';

export interface IPatientBackgroundFormValidations {
	allergies: string;
	fur: string;
	meds: string;
	last_pregnancy: string;
	extra_info: string;
	ob_issues: string;
}

export interface IPatientTreatmentFormValidations {
	component: string;
	consult_id?: string;
	extra_info: string;
	frequency: string;
	id?: string;
	name: string;
	period: string;
	quantity: string;

	concentrations: string;
	administrationRoute: string;
	pharmaceuticalForm: string;
	salesUnit: string;
	activePrinciples: string;
	skuSap?: string;
}

export interface IPatientCaseFormValidations {
	id?: string;
	anamnesis: string;
	external_exams: string;
	exams: string;
	diagnostic: string;
	diagnosticDesc?: string;
	recommendation: string;
	treatments: IPatientTreatmentFormValidations[];
    medicalLeaveStartDate: Date | null;
    medicalLeaveEndDate: Date | null;
	medicalLeaveIndication?: string
}


export interface ISessionPatientHistoryFormValidations {
	history: IPatientBackgroundFormValidations;
	case: IPatientCaseFormValidations;
	nutritionist?: ISessionNutritionistFormValidations;
}

export interface IPatientBackgroundFormContext {
	touched: any;
	errors: any;
	handleBlur: any;
	handleChange: any;
	isValid: boolean;
	setFieldValue: any;
	validateForm: (values?: any) => void;
	values: ISessionPatientHistoryFormValidations;
}

const defaultValue: IPatientBackgroundFormContext = {
	errors: {},
	handleBlur: (event: any) => void 0,
	handleChange: (event: any) => void 0,
	isValid: false,
	setFieldValue: (field: string, value: string) => void 0,
	touched: {},
	validateForm: (values?: any) => void 0,
	values: {
		nutritionist: {
			alcoholConsumption: '-',
			breakfast: '-',
			diagnostic: '-',
			dinner: '-',
			feedingHabits: '-',
			height: '0',
			lunch: '-',
			midAfternoon: '-',
			midMorning: '-',
			physicalActivity: '-',
			recommendation: '-',
			snacks: '-',
			stomachIssues: '-',
			waterConsumption: '-',
			weight: '0',
		}
	} as ISessionPatientHistoryFormValidations,
};

const PatientBackgroundFormContext = React.createContext(defaultValue);

export default PatientBackgroundFormContext;
