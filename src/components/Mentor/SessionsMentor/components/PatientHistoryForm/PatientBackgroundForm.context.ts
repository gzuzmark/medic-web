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
	skuSap?: number;
}

export interface IPatientCaseFormValidations {
	id?: string;
	anamnesis: string;
	diagnostic: string;
	recommendation: string;
	treatments: IPatientTreatmentFormValidations[];
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
	setFieldValue: any;
	values: ISessionPatientHistoryFormValidations;
}

const defaultValue: IPatientBackgroundFormContext = {
	errors: {},
	handleBlur: (event: any) => void 0,
	handleChange: (event: any) => void 0,
	setFieldValue: (field: string, value: string) => void 0,
	touched: {},
	values: {} as ISessionPatientHistoryFormValidations,
};

const PatientBackgroundFormContext = React.createContext(defaultValue);

export default PatientBackgroundFormContext;
