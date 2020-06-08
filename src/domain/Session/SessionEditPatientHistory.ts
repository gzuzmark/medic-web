import { IPatientBackgroundFormValidations } from "../../components/Mentor/SessionsMentor/components/PatientHistoryForm/PatientBackgroundForm.context";

export interface ISessionHistoryForm {
  allergies: string;
  fur?: string;
  meds: string;
  last_pregnancy?: string;
  extraInfo: string;
  ob_issues?: string;
}

class SessionEditPatientHistoryData {
  public patient: ISessionHistoryForm;
  constructor(patient?: ISessionHistoryForm) {
    this.patient = patient || {} as ISessionHistoryForm;
    this.patient.allergies = patient && patient.allergies || '';
    this.patient.fur = patient && patient.fur || '';
    this.patient.meds = patient && patient.meds || '';
    this.patient.last_pregnancy = patient && patient.last_pregnancy || '';
    this.patient.extraInfo = patient && patient.extraInfo || '';
    this.patient.ob_issues = patient && patient.ob_issues || '';
  }

  get getPatientHistoryValues(): ISessionHistoryForm {
      return {...this.getHistoryValues};
  }

  get historyUpdateParams(): ISessionHistoryForm {
    return {
      allergies: this.patient.allergies || '',
      extraInfo: this.patient.extraInfo || '',
      fur: this.patient.fur || '',
      last_pregnancy: this.patient.last_pregnancy || '',
      meds: this.patient.meds || '',
      ob_issues: this.patient.ob_issues || '',
    }
  }

  get getHistoryValues(): IPatientBackgroundFormValidations {
    const p = {...this.patient};
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

  public prepareData(values: IPatientBackgroundFormValidations) {
    this.patient.allergies = values.allergies.trim();
    this.patient.fur = values.fur.trim();
    this.patient.meds = values.meds.trim();
    this.patient.last_pregnancy = values.last_pregnancy.trim();
    this.patient.extraInfo = values.extraInfo.trim();
    this.patient.ob_issues = values.ob_issues.trim();
  }
}

export default SessionEditPatientHistoryData;
