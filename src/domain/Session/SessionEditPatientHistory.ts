import {
  IPatientBackgroundFormValidations,
  IPatientCaseFormValidations,
} from "../../components/Mentor/SessionsMentor/components/PatientHistoryForm/PatientBackgroundForm.context";

export interface ISessionHistoryForm {
  allergies: string;
  fur?: string;
  meds: string;
  last_pregnancy?: string;
  extraInfo: string;
  ob_issues?: string;
}

export interface ISessionPatientTreatmentForm {
  component: string;
  extra_info: string;
  frequency: string;
  name: string;
  period: string;
}

export interface ISessionPatientCaseForm {
  id?: string,
  anamnesis: string,
  diagnostic: string,
  recommendation: string,
  treatments: ISessionPatientTreatmentForm[],
}

export interface ISessionPatientHistoryForm {
  history: ISessionHistoryForm;
  case: ISessionPatientCaseForm
}

class SessionEditPatientHistoryData {
  public patient: ISessionPatientHistoryForm;
  constructor(patient?: ISessionPatientHistoryForm) {
    const defaultPatient = {
      case: {} as ISessionPatientCaseForm,
      history: {} as ISessionHistoryForm,
    } as ISessionPatientHistoryForm;
    const isValid = !!patient && (!!patient.history || !!patient.case);
    this.patient = isValid && patient !== undefined ? patient : defaultPatient;
    this.patient.history.allergies = patient && patient.history && patient.history.allergies || '';
    this.patient.history.fur = patient && patient.history && patient.history.fur || '';
    this.patient.history.meds = patient && patient.history && patient.history.meds || '';
    this.patient.history.last_pregnancy = patient && patient.history && patient.history.last_pregnancy || '';
    this.patient.history.extraInfo = patient && patient.history && patient.history.extraInfo || '';
    this.patient.history.ob_issues = patient && patient.history && patient.history.ob_issues || '';
    this.patient.case.id = patient && patient.case && patient.case.id || '';
    this.patient.case.anamnesis = patient && patient.case && patient.case.anamnesis || '';
    this.patient.case.diagnostic = patient && patient.case && patient.case.diagnostic || '';
    this.patient.case.recommendation = patient && patient.case && patient.case.recommendation || '';
    this.patient.case.treatments = patient && patient.case && patient.case.treatments || [];
  }

  get historyUpdateParams(): ISessionHistoryForm {
    return {
      allergies: this.patient.history.allergies || '',
      extraInfo: this.patient.history.extraInfo || '',
      fur: this.patient.history.fur || '',
      last_pregnancy: this.patient.history.last_pregnancy || '',
      meds: this.patient.history.meds || '',
      ob_issues: this.patient.history.ob_issues || '',
    };
  }

  get caseUpdateParams(): ISessionPatientCaseForm {
    return {
      anamnesis: this.patient.case.anamnesis || '',
      diagnostic: this.patient.case.diagnostic || '',
      id: this.patient.case.id || '',
      recommendation: this.patient.case.recommendation || '',
      treatments: this.patient.case.treatments || [],
    };
  }

  get getHistoryValues(): IPatientBackgroundFormValidations {
    const p = {...this.patient.history};
    const formValues = {
      allergies: p.allergies || '',
      extraInfo: p.extraInfo || '',
      fur: p.fur || '',
      last_pregnancy: p.last_pregnancy || '',
      meds: p.meds || '',
      ob_issues: p.ob_issues || '',
    };

    return formValues;
  }

  get getCaseValues(): IPatientCaseFormValidations {
    const p = {...this.patient.case};
    const formValues = {
      anamnesis: p.anamnesis || '',
      diagnostic: p.diagnostic || '',
      recommendation: p.recommendation || '',
      treatments: p.treatments || [],
    };

    return formValues;
  }

  public setCurrentCase(currentCase: ISessionPatientCaseForm) {
    this.patient.case.id = currentCase.id || '';
    this.patient.case.anamnesis = currentCase.anamnesis || '';
    this.patient.case.diagnostic = currentCase.diagnostic || '';
    this.patient.case.recommendation = currentCase.recommendation || '';
    this.patient.case.treatments = currentCase.treatments || [];
  }

  public preparePatientHistoryData(values: IPatientBackgroundFormValidations) {
    this.patient.history.allergies = values.allergies.trim();
    this.patient.history.fur = values.fur.trim();
    this.patient.history.meds = values.meds.trim();
    this.patient.history.last_pregnancy = values.last_pregnancy.trim();
    this.patient.history.extraInfo = values.extraInfo.trim();
    this.patient.history.ob_issues = values.ob_issues.trim();
  }

  public preparePatientCaseData(values: IPatientCaseFormValidations) {
    this.patient.case.anamnesis = values.anamnesis.trim();
    this.patient.case.diagnostic = values.diagnostic.trim();
    this.patient.case.recommendation = values.recommendation.trim();
  }
}

export default SessionEditPatientHistoryData;
