import * as React from 'react';

export interface IPatientBackgroundFormValidations {
  allergies: string,
  fur: string,
  meds: string,
  last_pregnancy: string,
  extraInfo: string,
  ob_issues: string,
}

export interface IPatientTreatmentFormValidations {
  component: string;
  extra_info: string;
  frequency: string;
  name: string;
  period: string;
}

export interface IPatientCaseFormValidations {
  id?: string;
  anamnesis: string,
  diagnostic: string,
  recommendation: string,
  treatments: IPatientTreatmentFormValidations[],
}

export interface ISessionPatientHistoryFormValidations {
  history: IPatientBackgroundFormValidations;
  case: IPatientCaseFormValidations;
}

export interface IPatientBackgroundFormContext {
  handleBlur: any;
  handleChange: any;
  values: ISessionPatientHistoryFormValidations;
}

const defaultValue: IPatientBackgroundFormContext = {
  handleBlur: (event: any) => void(0),
  handleChange: (event: any) => void(0),
  values: {} as ISessionPatientHistoryFormValidations,
};

const PatientBackgroundFormContext = React.createContext(defaultValue);

export default PatientBackgroundFormContext;
