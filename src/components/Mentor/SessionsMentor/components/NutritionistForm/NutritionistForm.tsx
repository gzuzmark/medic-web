import * as React from 'react';

import FormLabel from '../../../../../common/FormLabel/FormLabel';
import FormColumn from '../../../../../common/FormRow/components/FormColumn/FormColumn';
import FormRow from '../../../../../common/FormRow/FormRow';
import MentorInput from '../../../../../common/MentorInput/MentorInput';
import { Heading2 } from '../../../../../common/MentorText';
import MentorTextArea from '../../../../../common/MentorTextArea/MentorTextArea';
import { buildQuestionBlocks } from '../../../../../common/Utils/Utilities';
import InputDatePicker from '../../../../../components/Admin/Reports/components/InputDatePicker/InputDatePicker';
import {
	ITriageQuestion,
	ITriageUseCase,
} from '../../../../../domain/Session/SessionMentorBean';
import PatientBlockContainer from '../PatientBlockContainer/PatientBlockContainer';
import PatientBackgroundFormContext from '../PatientHistoryForm/PatientBackgroundForm.context';
import { nutritionistDefaultValues } from './NutritionistForm.context';

import './NutritionistForm.scss';

interface IPropsNutritionistForm {
	title: string;
	isWomanHistory?: boolean;
	forceDisable?: boolean;
	notGender?: boolean;
	questions: ITriageQuestion[];
	useCase: ITriageUseCase;
}

const GET_WIDTH_BY_PERCENTAGE = (p: number) => 100 / p;
const defaultRowStyle = { padding: '15px 0 0 0', margin: '0 0 15px 0' };

const computeIMC = (w: number, h: number): number => {
	if (!isNaN(w) && !isNaN(h) && h === 0) {
		return 0;
	}
	return w / h ** 2;
};

const NutritionistForm: React.FC<IPropsNutritionistForm> = ({
	title,
	questions,
	useCase,
	forceDisable,
}) => {
	const { setFieldValue, values, handleBlur, handleChange } = React.useContext(
		PatientBackgroundFormContext,
	);
	const nutritionist =
		(values && values.nutritionist) || nutritionistDefaultValues;

	const [date, setDate] = React.useState<Date>(nutritionist.diagnosisDate);

	const handleDateChange = React.useCallback(
		(dateObject: { diagnosisDate: Date }) => {
			const { diagnosisDate } = dateObject;
			setFieldValue('nutritionist.diagnosisDate', diagnosisDate);
			setDate(diagnosisDate);
		},
		[setDate],
	);

	const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const val = e.target.value;
		const weight = +(name.includes('weight') ? val : nutritionist.weight || '');
		const height = +(name.includes('height') ? val : nutritionist.height || '');
		const imc = computeIMC(weight, height);
		setFieldValue(name, val);
		setFieldValue('nutritionist.imc', imc.toFixed(2));
	};

	return (
		<React.Fragment>
			<PatientBlockContainer
				title={title}
				blocks={buildQuestionBlocks(useCase, questions)}
			/>
			<FormRow
				key={'row_1'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={GET_WIDTH_BY_PERCENTAGE(33)} key={'weight'}>
						<MentorInput
							label='PESO (KG)'
							disabled={!!forceDisable}
							attrs={{
								name: 'nutritionist.weight',
								onBlur: handleBlur,
								onChange: handleStatsChange,
								value: nutritionist.weight,
							}}
						/>
					</FormColumn>,
					<FormColumn width={GET_WIDTH_BY_PERCENTAGE(33)} key={'height'}>
						<MentorInput
							label='TALLA (m)'
							disabled={!!forceDisable}
							attrs={{
								name: 'nutritionist.height',
								onBlur: handleBlur,
								onChange: handleStatsChange,
								value: nutritionist.height,
							}}
						/>
					</FormColumn>,
					<FormColumn width={GET_WIDTH_BY_PERCENTAGE(33)} key={'imc'}>
						<MentorInput
							label='IMC'
							disabled={!!forceDisable}
							attrs={{
								name: 'nutritionist.imc',
								onBlur: handleBlur,
								onChange: handleChange,
								value: nutritionist.imc,
							}}
						/>
					</FormColumn>,
				]}
			/>
			<Heading2 className='NutritionFormTitle'>Hábitos y Consumo</Heading2>

			<FormRow
				key={'row_2'}
				style={defaultRowStyle}
				columns={[
					<FormColumn
						width={GET_WIDTH_BY_PERCENTAGE(50)}
						key={'physicalActivity'}
					>
						<MentorInput
							label='Actividad Física'
							lowercaseLabel={true}
							disabled={!!forceDisable}
							attrs={{
								name: 'nutritionist.physicalActivity',
								onBlur: handleBlur,
								onChange: handleChange,
								value: nutritionist.physicalActivity,
							}}
						/>
					</FormColumn>,
					<FormColumn
						width={GET_WIDTH_BY_PERCENTAGE(50)}
						key={'waterConsumption'}
					>
						<MentorInput
							label='Consumo de Agua'
							lowercaseLabel={true}
							disabled={!!forceDisable}
							attrs={{
								name: 'nutritionist.waterConsumption',
								onBlur: handleBlur,
								onChange: handleChange,
								value: nutritionist.waterConsumption,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<FormRow
				key={'row_3'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={GET_WIDTH_BY_PERCENTAGE(50)} key={'feedingHabits'}>
						<MentorInput
							label='Hábitos Alimenticios'
							lowercaseLabel={true}
							disabled={!!forceDisable}
							attrs={{
								name: 'nutritionist.feedingHabits',
								onBlur: handleBlur,
								onChange: handleChange,
								value: nutritionist.feedingHabits,
							}}
						/>
					</FormColumn>,
					<FormColumn
						width={GET_WIDTH_BY_PERCENTAGE(50)}
						key={'alcoholConsumption'}
					>
						<MentorInput
							label='Consumo de Alcohol, Tabaco y Drogas'
							lowercaseLabel={true}
							disabled={!!forceDisable}
							attrs={{
								name: 'nutritionist.alcoholConsumption',
								onBlur: handleBlur,
								onChange: handleChange,
								value: nutritionist.alcoholConsumption,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<FormRow
				key={'row_4'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={GET_WIDTH_BY_PERCENTAGE(50)} key={'stomachIssues'}>
						<MentorInput
							label='Problemas Gastrointestinales'
							lowercaseLabel={true}
							disabled={!!forceDisable}
							attrs={{
								name: 'nutritionist.stomachIssues',
								onBlur: handleBlur,
								onChange: handleChange,
								value: nutritionist.stomachIssues,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<Heading2 className='NutritionFormTitle'>
				Diagnóstico Nutricional
			</Heading2>

			<FormRow
				key={'row_5'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={1} key={'diagnostic'}>
						<MentorTextArea
							disabled={!!forceDisable}
							attrs={{
								name: 'nutritionist.diagnostic',
								onBlur: handleBlur,
								onChange: handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: nutritionist.diagnostic,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<Heading2 className='NutritionFormTitle'>Esquema Nutricional</Heading2>

			<FormRow
				key={'row_6'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={1} key={'breakfast'}>
						<MentorTextArea
							disabled={!!forceDisable}
							label='Desayuno'
							attrs={{
								name: 'nutritionist.breakfast',
								onBlur: handleBlur,
								onChange: handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: nutritionist.breakfast,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<FormRow
				key={'row_7'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={1} key={'midMorning'}>
						<MentorTextArea
							disabled={!!forceDisable}
							label='Media Mañana'
							attrs={{
								name: 'nutritionist.midMorning',
								onBlur: handleBlur,
								onChange: handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: nutritionist.midMorning,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<FormRow
				key={'row_8'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={1} key={'lunch'}>
						<MentorTextArea
							disabled={!!forceDisable}
							label='Almuerzo'
							attrs={{
								name: 'nutritionist.lunch',
								onBlur: handleBlur,
								onChange: handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: nutritionist.lunch,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<FormRow
				key={'row_9'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={1} key={'midAfternoon'}>
						<MentorTextArea
							disabled={!!forceDisable}
							label='Media Tarde'
							attrs={{
								name: 'nutritionist.midAfternoon',
								onBlur: handleBlur,
								onChange: handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: nutritionist.midAfternoon,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<FormRow
				key={'row_10'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={1} key={'dinner'}>
						<MentorTextArea
							disabled={!!forceDisable}
							label='Cena'
							attrs={{
								name: 'nutritionist.dinner',
								onBlur: handleBlur,
								onChange: handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: nutritionist.dinner,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<FormRow
				key={'row_11'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={1} key={'snacks'}>
						<MentorTextArea
							disabled={!!forceDisable}
							label='Snack Adicional'
							attrs={{
								name: 'nutritionist.snacks',
								onBlur: handleBlur,
								onChange: handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: nutritionist.snacks,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<FormRow
				key={'row_12'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={1} key={'recommendation'}>
						<MentorTextArea
							disabled={!!forceDisable}
							label='Recomendaciones Específicas'
							attrs={{
								name: 'nutritionist.recommendation',
								onBlur: handleBlur,
								onChange: handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: nutritionist.recommendation,
							}}
						/>
					</FormColumn>,
				]}
			/>

			<FormRow
				key={'row_13'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={1} key={'diagnosisDate'}>
						<FormLabel label='Fecha Próximo Control' uppercase={false} />
						<InputDatePicker
							id={'diagnosisDate'}
							date={date}
							updateState={handleDateChange}
						/>
					</FormColumn>,
				]}
			/>
		</React.Fragment>
	);
};

export default NutritionistForm;
