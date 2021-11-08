import * as moment from "moment";
import {
    ISessionNutritionistFormValidations,
    nutritionistDefaultValues,
} from '../../components/Mentor/SessionsMentor/components/NutritionistForm/NutritionistForm.context';
import {
    IPatientBackgroundFormValidations,
    IPatientCaseFormValidations,
    IPatientTreatmentFormValidations,
} from '../../components/Mentor/SessionsMentor/components/PatientHistoryForm/PatientBackgroundForm.context';
import {
    ISessionDoctor,
    ISessionPatient,
    ISessionTriage,
} from './SessionMentorBean';

export const SAPCODE_SEPARATOR = '_';
const SESSION_IPRESS = '1112';

enum DocumentTypeEnum {
    DNI = '1',
    CE = '2'
}

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
    concentrations: string,
    administrationRoute: string,
    pharmaceuticalForm: string,
    salesUnit: string,
    activePrinciples: string,
    skuSap?: string,
}

export interface ISessionPatientCaseForm {
    id?: string,
    anamnesis: string,
    diagnostic: string,
    external_exams: string;
    exams: string;
    recommendation: string,
    from: string;
    treatments: ISessionPatientTreatmentForm[],
    has_treatments?: boolean,
    folioNumber?: string,
    prescriptionPath?: string,
    triage?: ISessionTriage,
    medicalLeaveEndDate: Date | null,
    medicalLeaveStartDate: Date | null,
    medicalLeaveIndication?: string
    rescheduleAppointment: Date | null,
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
    case: ISessionPatientCaseForm;
    nutritionist: ISessionNutritionistFormValidations;
}


function strToDate(str: string | Date | null): Date | null{
    if(!str) { return null }
    if(str instanceof Date) { return str }
    try {
        return moment(str.split("T")[0], 'YYYY-MM-DD').toDate(); // Si utilizo new Date(str) coge el gmt 00 y el date termina siendo -5 horas en el gmt peru.
    }catch (e) {
        return null;
    }
}

class SessionEditPatientHistoryData {
    public patient: ISessionPatientHistoryForm;

    constructor(patient?: ISessionPatientHistoryForm) {
        const defaultPatient = {
            case: {} as ISessionPatientCaseForm,
            history: {} as ISessionHistoryForm,
            nutritionist: nutritionistDefaultValues
        } as ISessionPatientHistoryForm;
        this.patient = !!patient ? patient : defaultPatient;
        this.patient.history =
            (patient && patient.history) || ({} as ISessionHistoryForm);
        this.patient.case =
            (patient && patient.case) || ({} as ISessionPatientCaseForm);
        this.patient.nutritionist =
            (patient && patient.nutritionist) || nutritionistDefaultValues;
        this.setInitialHistory(patient && patient.history);
        this.setInitialCase(patient && patient.case);
        this.setInitialNutritionist(patient && patient.nutritionist);
    }

    get historyUpdateParams(): ISessionHistoryForm {
        return {
            allergies: this.patient.history.allergies || "",
            extra_info: this.patient.history.extra_info || "",
            fur: this.patient.history.fur || "",
            last_pregnancy: this.patient.history.last_pregnancy || "",
            meds: this.patient.history.meds || "",
            ob_issues: this.patient.history.ob_issues || ""
        };
    }

    get caseUpdateParams(): ISessionPatientCaseForm {
        const newTreatments = this.patient.case.treatments.map(t => ({
            ...t,
            presentationUnit: t.salesUnit
        }));
        return {
            anamnesis: this.patient.case.anamnesis || "",
            diagnostic: this.patient.case.diagnostic || "",
            exams: this.patient.case.exams || "",
            external_exams: this.patient.case.external_exams || "",
            from: this.patient.case.from || "",
            id: this.patient.case.id || "",
            medicalLeaveEndDate: this.patient.case.medicalLeaveEndDate,
            medicalLeaveStartDate: this.patient.case.medicalLeaveStartDate,
            medicalLeaveIndication: this.patient.case.medicalLeaveIndication || '',
            recommendation: this.patient.case.recommendation || "",
            treatments: newTreatments || [],
            rescheduleAppointment: this.patient.case.rescheduleAppointment,
        };
    }

    get getNutritionValues(): ISessionNutritionistFormValidations {
        const n = { ...this.patient.nutritionist };
        return {
            alcoholConsumption: n.alcoholConsumption,
            breakfast: n.breakfast,
            diagnosisDate: n.diagnosisDate,
            diagnostic: n.diagnostic,
            dinner: n.dinner,
            feedingHabits: n.feedingHabits,
            height: `${n.height}`,
            imc: `${n.imc}`,
            lunch: n.lunch,
            midAfternoon: n.midAfternoon,
            midMorning: n.midMorning,
            physicalActivity: n.physicalActivity,
            recommendation: n.recommendation,
            snacks: n.snacks,
            stomachIssues: n.stomachIssues,
            waterConsumption: n.waterConsumption,
            weight: `${n.weight}`
        };
    }

    get getHistoryValues(): IPatientBackgroundFormValidations {
        const p = { ...this.patient.history };
        const formValues = {
            allergies: p.allergies || "",
            extra_info: p.extra_info || "",
            fur: p.fur || "",
            last_pregnancy: p.last_pregnancy || "",
            meds: p.meds || "",
            ob_issues: p.ob_issues || ""
        };

        return formValues;
    }

    get getCaseValues(): IPatientCaseFormValidations {
        const p = { ...this.patient.case };
        const diagnostic = p.diagnostic || "";
        const formValues:IPatientCaseFormValidations = {
            anamnesis: p.anamnesis || "",
            diagnostic,
            exams: this.patient.case.exams || "",
            external_exams: this.patient.case.external_exams || "",
            medicalLeaveEndDate: strToDate(this.patient.case.medicalLeaveEndDate),
            medicalLeaveStartDate: strToDate(this.patient.case.medicalLeaveStartDate),
            medicalLeaveIndication: this.patient.case.medicalLeaveIndication || '',
            recommendation: p.recommendation || "",
            treatments: p.treatments || [],
            rescheduleAppointment: this.patient.case.rescheduleAppointment,
        };

        return formValues;
    }


    public setCurrentCase(currentCase: ISessionPatientCaseForm) {
        this.patient.case.id = currentCase.id || "";
        this.patient.case.anamnesis = currentCase.anamnesis || "";
        this.patient.case.from = currentCase.from || "";
        this.patient.case.diagnostic = currentCase.diagnostic || "";
        this.patient.case.recommendation = currentCase.recommendation || "";
        this.patient.case.exams = currentCase.exams || "";
        this.patient.case.external_exams = currentCase.external_exams || "";
        this.patient.case.treatments = currentCase.treatments || [];
    }

    public preparePatientHistoryData(
        values: IPatientBackgroundFormValidations
    ) {
        this.patient.history.allergies = values.allergies.trim();
        this.patient.history.fur = values.fur.trim();
        this.patient.history.meds = values.meds.trim();
        this.patient.history.last_pregnancy = values.last_pregnancy.trim();
        this.patient.history.extra_info = values.extra_info.trim();
        this.patient.history.ob_issues = values.ob_issues.trim();
    }

    public prepareNutritionData(values: ISessionNutritionistFormValidations) {
        this.patient.nutritionist.weight = (`${values.weight}` || "").trim();
        this.patient.nutritionist.height = (`${values.height}` || "").trim();
        this.patient.nutritionist.imc = (values.imc || "").trim();
        this.patient.nutritionist.physicalActivity = (
            values.physicalActivity || ""
        ).trim();
        this.patient.nutritionist.waterConsumption = (
            values.waterConsumption || ""
        ).trim();
        this.patient.nutritionist.feedingHabits = (
            values.feedingHabits || ""
        ).trim();
        this.patient.nutritionist.alcoholConsumption = (
            values.alcoholConsumption || ""
        ).trim();
        this.patient.nutritionist.stomachIssues = (
            values.stomachIssues || ""
        ).trim();
        this.patient.nutritionist.diagnostic = (values.diagnostic || "").trim();
        this.patient.nutritionist.breakfast = (values.breakfast || "").trim();
        this.patient.nutritionist.midMorning = (values.midMorning || "").trim();
        this.patient.nutritionist.lunch = (values.lunch || "").trim();
        this.patient.nutritionist.midAfternoon = (
            values.midAfternoon || ""
        ).trim();
        this.patient.nutritionist.dinner = (values.dinner || "").trim();
        this.patient.nutritionist.snacks = (values.snacks || "").trim();
        this.patient.nutritionist.recommendation = (
            values.recommendation || ""
        ).trim();
        this.patient.nutritionist.diagnosisDate = values.diagnosisDate;
    }

    public preparePatientCaseData(values: IPatientCaseFormValidations) {
        this.patient.case.anamnesis = values.anamnesis.trim();
        this.patient.case.diagnostic = values.diagnostic.trim();
        this.patient.case.exams = values.exams.trim();
        this.patient.case.external_exams = values.external_exams.trim();
        this.patient.case.recommendation = values.recommendation.trim();
        this.patient.case.medicalLeaveStartDate = values.medicalLeaveStartDate;
        this.patient.case.medicalLeaveIndication = values.medicalLeaveIndication
        this.patient.case.medicalLeaveEndDate = values.medicalLeaveEndDate;
        this.patient.case.recommendation = values.recommendation.trim();
        this.patient.case.rescheduleAppointment = values.rescheduleAppointment;
        this.preparePatientCaseTreatmentData(values.treatments);
    }

    public preparePatientCaseTreatmentData(
        values: IPatientTreatmentFormValidations[]
    ) {
        if (!values) {
            this.patient.case.treatments = [];
        } else {
            this.patient.case.treatments = values.map(
                (value: IPatientTreatmentFormValidations) => {
                    if (value.consult_id && value.id) {
                        return {
                            activePrinciples: value.activePrinciples,
                            administrationRoute: this.getValueWithoutSKU(
                                value.administrationRoute
                            ),
                            component: value.component,
                            concentrations: this.getValueWithoutSKU(
                                value.concentrations
                            ),
                            consult_id: value.consult_id,
                            extra_info: value.extra_info,
                            frequency: value.frequency,
                            id: value.id,
                            name: this.getValueWithoutSKU(value.name),
                            period: value.period,
                            pharmaceuticalForm: this.getValueWithoutSKU(
                                value.pharmaceuticalForm
                            ),
                            quantity: value.quantity,
                            salesUnit: value.salesUnit,
                            skuSap: value.skuSap
                        };
                    }
                    return {
                        activePrinciples: value.activePrinciples,
                        administrationRoute: this.getValueWithoutSKU(
                            value.administrationRoute
                        ),
                        component: value.component,
                        concentrations: this.getValueWithoutSKU(
                            value.concentrations
                        ),
                        extra_info: value.extra_info,
                        frequency: value.frequency,
                        name: this.getValueWithoutSKU(value.name),
                        period: value.period,
                        pharmaceuticalForm: this.getValueWithoutSKU(
                            value.pharmaceuticalForm
                        ),
                        quantity: value.quantity,
                        salesUnit: value.salesUnit,
                        skuSap: value.skuSap
                    };
                }
            );
        }
    }

    public getRecipeData(
        patient: Record<string, string> | null,
        doctor: Record<string, string> | null,
        issueDate: string,
        pastConsultsLength: number
    ) {
        if (patient && doctor) {
            // tslint:disable:object-literal-sort-keys
            const recipe = {
                additionalRecomendations: this.patient.case.recommendation.slice(
                    0,
                    399
                ),
                diagnostic: this.patient.case.diagnostic,
                doctor: {
                    doctorFirstName: doctor.name,
                    doctorLastName: doctor.last_name,
                    doctorSpecialty: doctor.specialty_name,
                    doctorCmp: doctor.cmp.slice(0, 6)
                },
                ipressCode: SESSION_IPRESS,
                issueDate,
                medicines: this.patient.case.treatments.map(
                    (t: ISessionPatientTreatmentForm) => ({
                        activePrinciples: t.component,
                        skuSAP: t.skuSap,
                        concentrations: t.concentrations,
                        quantity: +t.quantity,
                        pharmaceuticalForm: t.pharmaceuticalForm,
                        productName: t.name,
                        administrationRoute: t.administrationRoute,
                        // dose: 1.0,
                        // timeBetweenDosesInHours: 5.0,
                        totalPrescriptionTimeInDays: +t.period,
                        prescriptionRequirements: t.extra_info,
                        posology: t.frequency.slice(0, 299),
                        presentationUnit: t.salesUnit
                    })
                ),
                patient: {
                    patientAge: moment().diff(patient.birthdate, "years") || 25,
                    patientAddress: this.getAddress(patient.address),
                    patientDni: patient.document_number,
                    patientFirstName: patient.name,
                    patientLastName: patient.last_name,
                    patientPhone: patient.phone,
                    patientClinicHistory: `${patient.document_number
                        }${pastConsultsLength}`,
                    patientDateOfBirth: patient.birthdate,
                    patientEmail: patient.email,
                    motherLastName: patient.second_last_name,
                    documentType: patient.document_type || DocumentTypeEnum.DNI
                }
            };
            return recipe;
        }
        return null;
    }

    private isValidAddressObject = (address: any): boolean => {
        return Boolean(
            address.street &&
            address.district &&
            address.city &&
            address.country
        );
    };

    private getAddress(address: string) {
        address = 'Sin direccion';
        let addressObject = {}
        try {
            addressObject = JSON.parse(address)
        } catch (error) {
            addressObject = {}
        }

        if (Object.entries(addressObject).length === 0) {
            return address;
        }

        if (this.isValidAddressObject(addressObject)) {
            const sortable = Object.entries(addressObject)
                .sort(([, a]: any, [, b]: any) => a - b)
                .reduce((r, [k, v]) => {
                    if (
                        [
                            "address",
                            "country",
                            "district",
                            "city",
                            "number"
                        ].includes(k)
                    ) {
                        return [...r, v];
                    }
                    return r;
                }, []);

            return sortable.join(", ");
        }
        return "";
    }

    private setInitialHistory(currentHistory?: ISessionHistoryForm) {
        this.patient.history.allergies =
            (currentHistory && currentHistory.allergies) || "";
        this.patient.history.fur = (currentHistory && currentHistory.fur) || "";
        this.patient.history.meds =
            (currentHistory && currentHistory.meds) || "";
        this.patient.history.last_pregnancy =
            (currentHistory && currentHistory.last_pregnancy) || "";
        this.patient.history.extra_info =
            (currentHistory && currentHistory.extra_info) || "";
        this.patient.history.ob_issues =
            (currentHistory && currentHistory.ob_issues) || "";
    }

    private setInitialCase(currentCase?: ISessionPatientCaseForm) {
        const diagnostic = (currentCase && currentCase.diagnostic) || "";
        this.patient.case.id = (currentCase && currentCase.id) || "";
        this.patient.case.anamnesis =
            (currentCase && currentCase.anamnesis) || "";
        this.patient.case.exams = (currentCase && currentCase.exams) || "";
        this.patient.case.external_exams =
            (currentCase && currentCase.external_exams) || "";
        this.patient.case.diagnostic = diagnostic;
        this.patient.case.recommendation =
            (currentCase && currentCase.recommendation) || "";
        this.patient.case.treatments =
            (currentCase && currentCase.treatments) || [];
    }

    private getValueWithoutSKU(value: string) {
        if (!value) {
            return "";
        }
        const skuList = value.split(SAPCODE_SEPARATOR);
        const lastIndex = skuList.length - 1;
        return (!!skuList.length && skuList[lastIndex]) || "";
    }

    private setInitialNutritionist(
        currentNutrition?: ISessionNutritionistFormValidations
    ) {
        this.patient.nutritionist.weight =
            (currentNutrition && currentNutrition.weight) || "";
        this.patient.nutritionist.height =
            (currentNutrition && currentNutrition.height) || "";
        this.patient.nutritionist.imc =
            (currentNutrition && currentNutrition.imc) || "";
        this.patient.nutritionist.physicalActivity =
            (currentNutrition && currentNutrition.physicalActivity) || "";
        this.patient.nutritionist.waterConsumption =
            (currentNutrition && currentNutrition.waterConsumption) || "";
        this.patient.nutritionist.feedingHabits =
            (currentNutrition && currentNutrition.feedingHabits) || "";
        this.patient.nutritionist.alcoholConsumption =
            (currentNutrition && currentNutrition.alcoholConsumption) || "";
        this.patient.nutritionist.stomachIssues =
            (currentNutrition && currentNutrition.stomachIssues) || "";
        this.patient.nutritionist.diagnostic =
            (currentNutrition && currentNutrition.diagnostic) || "";
        this.patient.nutritionist.breakfast =
            (currentNutrition && currentNutrition.breakfast) ||
            (nutritionistDefaultValues.breakfast || "").trim();
        this.patient.nutritionist.midMorning =
            (currentNutrition && currentNutrition.midMorning) ||
            (nutritionistDefaultValues.midMorning || "").trim();
        this.patient.nutritionist.lunch =
            (currentNutrition && currentNutrition.lunch) ||
            (nutritionistDefaultValues.lunch || "").trim();
        this.patient.nutritionist.midAfternoon =
            (currentNutrition && currentNutrition.midAfternoon) ||
            (nutritionistDefaultValues.midAfternoon || "").trim();
        this.patient.nutritionist.dinner =
            (currentNutrition && currentNutrition.dinner) ||
            (nutritionistDefaultValues.dinner || "").trim();
        this.patient.nutritionist.snacks =
            (currentNutrition && currentNutrition.snacks) ||
            (nutritionistDefaultValues.snacks || "").trim();
        this.patient.nutritionist.recommendation =
            (currentNutrition && currentNutrition.recommendation) || "";
        this.patient.nutritionist.diagnosisDate =
            (currentNutrition && currentNutrition.diagnosisDate) || new Date();
    }
}

export default SessionEditPatientHistoryData;
