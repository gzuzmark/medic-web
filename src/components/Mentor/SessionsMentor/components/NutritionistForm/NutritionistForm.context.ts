export interface ISessionNutritionistFormValidations {
	weight?: string;
	height?: string;
	imc?: string;

	physicalActivity?: string;
	waterConsumption?: string;
	feedingHabits?: string;
	alcoholConsumption?: string;
	stomachIssues?: string;

	diagnostic?: string;

	breakfast?: string;
	midMorning?: string;
	lunch?: string;
	midAfternoon?: string;
	dinner?: string;
	snacks?: string;
	recommendation?: string;

	diagnosisDate: Date;
}

export interface INutritionistFormContext {
	handleBlur: any;
	handleChange: any;
	setFieldValue: any;
	values: ISessionNutritionistFormValidations;
}

export const nutritionistDefaultValues: ISessionNutritionistFormValidations = {
	diagnosisDate: new Date(),
};
