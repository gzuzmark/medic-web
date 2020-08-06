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
	breakfast: `
		Elegir 1 opción: 1 1/2 tz fruta picada / 1 vaso de jugo, sin azúcar (250 ml) / 1 fruta mediana
+
Elegir 1 opción: 1 reb pan de molde (de preferencia, integral) /  1 pan pita o árabe (de preferencia, integral) / 3 cdas avena cruda (al ras) / 1 pan francés o integral
+
Elegir 1 opción: 1 taj queso fresco / 1 lonja de jamón de pavo / 2 cdas palta / 8 aceitunas
+
Elegir 1 opción: 1 huevo duro / 4-5 huevos de codorniz
+
Infusión o bebida sin azúcar
		`,
	diagnosisDate: new Date(),
	dinner: `
		Elegir 1 opción: 1 pan pita o árabe (de preferencia, integral) / 1 pan francés o integral (panadería) / 1 papa pequeña						
+						
90g carne: Pollo, pavita y pescado con mayor frecuencia. Carne de res y cerdo con moderación.						
+						
Elegir 1 opción: 1 huevo duro / 4-5 huevos de codorniz						
+						
Elegir 1 opción: 2 tz verduras crudas / 1 1/2 tz verduras salteadas / 1 tz verduras cocidas / 2 tz crema de verduras						
+						
Elegir 1 opción: 4 cdas palta / 2 cdtas aceite de oliva (considerar aceite utilizado en cocción) / 8 aceitunas						
+						
Agua o bebida sin azúcar						
	`,
	lunch: `
Elegir 1 opción: 1 papa mediana / 2/3 camote / 1 tz menestras / 2/3 tz quinua / 2/3 tz arroz o fideos / 1 tz choclo desgranado						
+						
120g carne: Pollo, pavita y pescado con mayor frecuencia. Carne de res y cerdo con moderación.						
+						
Elegir 1 opción: 2 tz verduras crudas / 1 1/2 tz verduras salteadas / 1 tz verduras cocidas / 2 tz crema de verduras						
+						
Elegir 1 opción: 4 cdas palta / 2 cdtas aceite de oliva (considerar aceite utilizado en cocción) / 8 aceitunas						
+						
Agua o bebida sin azúcar						
	`,
	midAfternoon: `
Elegir 1 opción: 1 tz fruta picada / 1  fruta mediana a elección						
+						
Elegir 1 opción: 20 unid maní / 12 almendras / 8 mitades de pecanas / 1 puñado de mix de frutos secos						
	`,
	midMorning: `
Elegir 1 opción: 2/3 vaso de yogurt light/descremado + 1 tz leche light/descremada						
+						
Elegir 1 opción: 1 tz fruta picada / 1  fruta mediana a elección						
	`,
	snacks: `
1 tz gelatina light						
o						
2 tz pop corn reventado (bajo en sal y aceite)						
	`,
};
