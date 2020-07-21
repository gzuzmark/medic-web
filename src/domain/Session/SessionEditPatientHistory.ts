import {
  IPatientBackgroundFormValidations,
  IPatientCaseFormValidations,
  IPatientTreatmentFormValidations,
} from "../../components/Mentor/SessionsMentor/components/PatientHistoryForm/PatientBackgroundForm.context";
import { ISessionDoctor, ISessionPatient, ISessionTriage } from "./SessionMentorBean";

export const SAPCODE_SEPARATOR = '_';

export interface ISessionHistoryForm {
  allergies: string;
  fur?: string;
  meds: string;
  last_pregnancy?: string;
  extra_info: string;
  ob_issues?: string;
}

export interface ISessionPatientTreatmentForm {
  component: string;
  extra_info: string;
  frequency: string;
  name: string;
  period: string;
  quantity: string;

  brand: string,
  concentration: string,
  routeofAdministration: string,
  pharmaceuticalForm: string,
  salesUnit: string,
  activePrinciples: string,
  skuSap?: number,
}

export interface ISessionPatientCaseForm {
  id?: string,
  anamnesis: string,
  diagnostic: string,
  recommendation: string,
  treatments: ISessionPatientTreatmentForm[],
  triage?: ISessionTriage,
}

export interface ISessionPatientPastCase {
  id: string;
  from: string;
  to: string;
  doctor: ISessionDoctor;
  patient: ISessionPatient;
  consult: ISessionPatientCaseForm;
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
    this.patient = !!patient ? patient : defaultPatient;
    this.patient.history = patient && patient.history || {} as ISessionHistoryForm;
    this.patient.case = patient && patient.case || {} as ISessionPatientCaseForm;
    this.setInitialHistory(patient && patient.history);
    this.setInitialCase(patient && patient.case);
  }

  get historyUpdateParams(): ISessionHistoryForm {
    return {
      allergies: this.patient.history.allergies || '',
      extra_info: this.patient.history.extra_info || '',
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
      extra_info: p.extra_info || '',
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
    this.patient.history.extra_info = values.extra_info.trim();
    this.patient.history.ob_issues = values.ob_issues.trim();
  }

  public preparePatientCaseData(values: IPatientCaseFormValidations) {
    this.patient.case.anamnesis = values.anamnesis.trim();
    this.patient.case.diagnostic = values.diagnostic.trim();
    this.patient.case.recommendation = values.recommendation.trim();
    this.preparePatientCaseTreatmentData(values.treatments);
  }

  public preparePatientCaseTreatmentData(values: IPatientTreatmentFormValidations[]) {
    if (!values) {
      this.patient.case.treatments = []
    } else {
      this.patient.case.treatments = values.map((value: IPatientTreatmentFormValidations) => {
        if (value.consult_id && value.id) {
          return {
            activePrinciples: value.activePrinciples,
            brand: this.getValueWithoutSKU(value.brand),
            component: value.component,
            concentration: this.getValueWithoutSKU(value.concentration),
            consult_id: value.consult_id,
            extra_info: value.extra_info,
            frequency: value.frequency,
            id: value.id,
            name: value.name,
            period: value.period,
            pharmaceuticalForm: this.getValueWithoutSKU(value.pharmaceuticalForm),
            quantity: value.quantity,
            routeofAdministration: this.getValueWithoutSKU(value.routeofAdministration),
            salesUnit: value.salesUnit,
          };
        }
        return {
          activePrinciples: value.activePrinciples,
          brand: this.getValueWithoutSKU(value.brand),
          component: value.component,
          concentration: this.getValueWithoutSKU(value.concentration),
          extra_info: value.extra_info,
          frequency: value.frequency,
          name: value.name,
          period: value.period,
          pharmaceuticalForm: this.getValueWithoutSKU(value.pharmaceuticalForm),
          quantity: value.quantity,
          routeofAdministration: this.getValueWithoutSKU(value.routeofAdministration),
          salesUnit: value.salesUnit,
        };
      });
    }
  }

  private setInitialHistory(currentHistory?: ISessionHistoryForm) {
    this.patient.history.allergies = currentHistory && currentHistory.allergies || '';
    this.patient.history.fur = currentHistory && currentHistory.fur || '';
    this.patient.history.meds = currentHistory && currentHistory.meds || '';
    this.patient.history.last_pregnancy = currentHistory && currentHistory.last_pregnancy || '';
    this.patient.history.extra_info = currentHistory && currentHistory.extra_info || '';
    this.patient.history.ob_issues = currentHistory && currentHistory.ob_issues || '';
  }

  private setInitialCase(currentCase?: ISessionPatientCaseForm) {
    this.patient.case.id = currentCase && currentCase.id || '';
    this.patient.case.anamnesis = currentCase && currentCase.anamnesis || '';
    this.patient.case.diagnostic = currentCase && currentCase.diagnostic || '';
    this.patient.case.recommendation = currentCase && currentCase.recommendation || '';
    this.patient.case.treatments = currentCase && currentCase.treatments || [];
  }

  private getValueWithoutSKU(value: string) {
    const skuList = value.split(SAPCODE_SEPARATOR);
    const lastIndex = skuList.length - 1;
    return !!skuList.length && skuList[lastIndex] || '';
  }
}

export default SessionEditPatientHistoryData;
