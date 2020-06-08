import * as React from 'react';

export interface IPatientBackgroundFormValidations {
  allergies: string,
  fur: string,
  meds: string,
  last_pregnancy: string,
  extraInfo: string,
  ob_issues: string,
}

export interface IPatientBackgroundFormContext {
  handleBlur: any;
  handleChange: any;
  values: IPatientBackgroundFormValidations;
}

const defaultValue: IPatientBackgroundFormContext = {
  handleBlur: (event: any) => void(0),
  handleChange: (event: any) => void(0),
  values: {} as IPatientBackgroundFormValidations,
};

const PatientBackgroundFormContext = React.createContext(defaultValue);

export default PatientBackgroundFormContext;
