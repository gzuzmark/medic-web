import * as React from 'react';
import styled from 'styled-components';
import FormColumn from '../../../../../../common/FormRow/components/FormColumn/FormColumn';
import FormRow from '../../../../../../common/FormRow/FormRow';
import Icon from '../../../../../../common/Icon/Icon';
import colors from '../../../../../../common/MentorColor';
import MentorDropDown, {
	IPropsMentorOptionsDropDown,
} from '../../../../../../common/MentorDropDown/MentorDropDown';
import MentorInput from '../../../../../../common/MentorInput/MentorInput';
import { Body1, Heading2 } from '../../../../../../common/MentorText';
import MentorTextArea from '../../../../../../common/MentorTextArea/MentorTextArea';
import MentorTypeAhead from '../../../../../../common/MentorTypeAhead/MentorTypeAhead';
import { ISessionPatientTreatmentForm } from '../../../../../../domain/Session/SessionEditPatientHistory';
import MentorService from '../../../../../../services/Mentor/Mentor.service';
import { IPatientBackgroundFormContext } from '../../PatientHistoryForm/PatientBackgroundForm.context';
// tslint:disable:ordered-imports
import {
	arrayIntersection,
	buildDropdownOptions,
	getInfoFromSKUList,
	getSKUList,
	mapResponse,
	FIELD_BUILDER_TYPES,
	IMappedText,
	IProductInfo,
} from './Utils';
import { isArray } from 'util';

export const TreatmentItem = styled.div`
	padding: 30px 0;
	border-bottom: 1px solid ${colors.MISC_COLORS.background_grey_2};
	&:last-child {
		border-bottom: 0;
	}
	input {
		padding-right: 16px !important;
	}
`;

export const UnitWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	div {
		margin-right: 10px;
	}
	span {
		white-space: nowrap;
	}
`;

export const Unit = styled.span`
	padding-bottom: 10px;
`;

export const OptionsHandler = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
	button {
		align-items: center;
		background: transparent;
		border: 0;
		display: flex;
		${Body1} {
			color: ${colors.BACKGROUND_COLORS.background_green};
		}
		svg {
			fill: ${colors.BACKGROUND_COLORS.background_green};
		}
		&:not([disabled]) {
			cursor: pointer;
		}
		&[disabled] {
			${Body1} {
				color: ${colors.BACKGROUND_COLORS.background_disabled_button}!important;
			}
			svg {
				fill: ${colors.BACKGROUND_COLORS.background_disabled_button}!important;
			}
		}
		&:hover {
			${Body1} {
				color: ${colors.BACKGROUND_COLORS.background_dark_green};
			}
			svg {
				fill: ${colors.BACKGROUND_COLORS.background_dark_green};
			}
		}
		&:active {
			${Body1} {
				color: ${colors.BACKGROUND_COLORS.background_dark_green};
			}
			svg {
				fill: ${colors.BACKGROUND_COLORS.background_dark_green};
			}
		}
	}
`;
const defaultRowStyle = { padding: '15px 0 0 0', margin: 0 };
const MAX_MEDICINE_AMOUNT = 5;
const DEFAULT_MAX_LENGTH = 250;

const productInfoInitialValues = {
	administrationRoutes: [],
	brands: [],
	concentrations: [],
	pharmaceuticalForms: [],
	salesUnit: [],
};

const renderError = (
	{ touched, errors }: IPatientBackgroundFormContext,
	i: number,
	name: string,
) => {
	if (Object.keys(touched).length > 0 && Object.keys(errors).length > 0) {
		const treatTouched = touched.case.treatments;
		const treatError = errors.case.treatments;
		if (!treatTouched || !treatError) {
			return '';
		}
		const isTouched =
			treatTouched.length > 0 && treatTouched[i] && !!treatTouched[i][name];
		if (isTouched) {
			return (
				(treatError.length > 0 && treatError[i] && treatError[i][name]) || ''
			);
		}
	}
	return '';
};

interface IPropsTreatmentFields {
	ctxt: IPatientBackgroundFormContext;
	index: number;
	treatmentLen: number;
	ctxtValue: ISessionPatientTreatmentForm;
	service: MentorService;
	removeMedicine: (index: number) => () => void;
	addNewMedicine: () => void;
}

const TreatmentFields: React.FC<IPropsTreatmentFields> = ({
	ctxt,
	index,
	treatmentLen,
	ctxtValue,
	service,
	removeMedicine,
	addNewMedicine,
}) => {
	const [productInfo, setProductInfo] = React.useState<IProductInfo>(
		productInfoInitialValues,
	);
	const [dropdownValues, setDropdownValues] = React.useState<IProductInfo>(
		productInfoInitialValues,
	);
	const [componentOptions, setComponentOptions] = React.useState<
		IPropsMentorOptionsDropDown[]
	>([]);
	const [currentUnit, setCurrentUnit] = React.useState<string>('');

	React.useEffect(() => {
		async function retrieveComponents() {
			const data = (await service.getActivePrinciples(
				ctxtValue.component,
				false,
			)) as string[];
			if (isArray(data)) {
				const mappedData = mapResponse(data) as IPropsMentorOptionsDropDown[];
				setComponentOptions(mappedData);
				const response = (await service.getPrincipleInformation(
					ctxtValue.component,
				)) as any[];
				if (response.length > 0) {
					const newConcentrations = buildDropdownOptions(
						response,
						'concentration',
						FIELD_BUILDER_TYPES.dropdown,
					) as IPropsMentorOptionsDropDown[];
					const newAdministrationRoutes = buildDropdownOptions(
						response,
						'routeofAdministration',
						FIELD_BUILDER_TYPES.dropdown,
					) as IPropsMentorOptionsDropDown[];
					const newPharmaceuticalForms = buildDropdownOptions(
						response,
						'pharmaceuticalForm',
						FIELD_BUILDER_TYPES.dropdown,
					) as IPropsMentorOptionsDropDown[];
					const newBrands = buildDropdownOptions(
						response,
						'brand',
						FIELD_BUILDER_TYPES.dropdown,
					) as IPropsMentorOptionsDropDown[];
					const newSalesUnit = buildDropdownOptions(
						response,
						'salesUnit',
						FIELD_BUILDER_TYPES.input,
					) as IMappedText[];

					const info = {
						administrationRoutes: newAdministrationRoutes,
						brands: newBrands,
						concentrations: newConcentrations,
						pharmaceuticalForms: newPharmaceuticalForms,
						salesUnit: newSalesUnit,
					} as IProductInfo;

					setProductInfo(info);
					setDropdownValues(info);
					if (newSalesUnit.length > 0) {
						setCurrentUnit(newSalesUnit[0].value);
					}
				} else {
					setProductInfo(productInfoInitialValues);
					setDropdownValues(productInfoInitialValues);
				}
			}
		}
		retrieveComponents();
	}, []);

	const handleDurationChange = (e: any) => {
		const val = e.target.value as string;
		if (val.match(/^\d+$/)) {
			const numVal = +val;
			if (numVal > 0 && numVal <= 30) {
				ctxt.setFieldValue(e.target.name, val);
			}
		}
		if (!val) {
			ctxt.setFieldValue(e.target.name, '');
		}
	};

	const handleQuantityChange = (e: any) => {
		const val = e.target.value as string;
		if (val.match(/^\d+$/)) {
			const numVal = +val;
			if (numVal > 0) {
				ctxt.setFieldValue(e.target.name, val);
			}
		}
		if (!val) {
			ctxt.setFieldValue(e.target.name, '');
		}
	};

	const handleTypePrinciple = (value: string) => (query: string) =>
		new Promise((resolve) => {
			const param = query || value;
			if (param) {
				service.getActivePrinciples(param).then((data: string[]) => {
					if (isArray(data)) {
						const mappedData = mapResponse(
							data,
						) as IPropsMentorOptionsDropDown[];
						setComponentOptions(mappedData);
						resolve(mappedData);
					}
				});
			}
		});

	const handleBrandChange = (
		i: number,
		value: ISessionPatientTreatmentForm,
	) => (name: string, selectedOption: IPropsMentorOptionsDropDown) => {
		const currentValue = (selectedOption && selectedOption.value) || '';
		if (currentValue) {
			const skuList = getSKUList(currentValue);
			ctxt.setFieldValue(name, selectedOption.value);
			if (skuList.length > 0) {
				const info = getInfoFromSKUList(skuList, productInfo);

				setDropdownValues({
					...dropdownValues,
					...info,
				});
				if (!value.concentrations) {
					ctxt.setFieldValue(
						`case.treatments[${i}].concentrations`,
						info.concentrations[0].value,
					);
				}
				if (!value.administrationRoute) {
					ctxt.setFieldValue(
						`case.treatments[${i}].administrationRoute`,
						info.administrationRoutes[0].value,
					);
				}
				if (!value.pharmaceuticalForm) {
					ctxt.setFieldValue(
						`case.treatments[${i}].pharmaceuticalForm`,
						info.pharmaceuticalForms[0].value,
					);
				}
			}
		} else {
			setDropdownValues({
				...productInfo,
			});
			ctxt.setFieldValue(name, '');
		}
	};

	const handlePrincipleChange = (i: number) => (
		name: string,
		selectedOption: IPropsMentorOptionsDropDown,
	) => {
		if (selectedOption) {
			service
				.getPrincipleInformation(selectedOption.value)
				.then((response: any[]) => {
					if (response.length > 0) {
						const newConcentrations = buildDropdownOptions(
							response,
							'concentration',
							FIELD_BUILDER_TYPES.dropdown,
						) as IPropsMentorOptionsDropDown[];
						const newAdministrationRoutes = buildDropdownOptions(
							response,
							'routeofAdministration',
							FIELD_BUILDER_TYPES.dropdown,
						) as IPropsMentorOptionsDropDown[];
						const newPharmaceuticalForms = buildDropdownOptions(
							response,
							'pharmaceuticalForm',
							FIELD_BUILDER_TYPES.dropdown,
						) as IPropsMentorOptionsDropDown[];
						const newBrands = buildDropdownOptions(
							response,
							'brand',
							FIELD_BUILDER_TYPES.dropdown,
						) as IPropsMentorOptionsDropDown[];
						const newSalesUnit = buildDropdownOptions(
							response,
							'salesUnit',
							FIELD_BUILDER_TYPES.input,
						) as IMappedText[];

						const info = {
							administrationRoutes: newAdministrationRoutes,
							brands: newBrands,
							concentrations: newConcentrations,
							pharmaceuticalForms: newPharmaceuticalForms,
							salesUnit: newSalesUnit,
						} as IProductInfo;

						setProductInfo(info);
						setDropdownValues(info);
						ctxt.setFieldValue(name, selectedOption.value);
					} else {
						setProductInfo(productInfoInitialValues);
						setDropdownValues(productInfoInitialValues);
					}
				});
		} else {
			setDropdownValues(productInfoInitialValues);
			ctxt.setFieldValue(`case.treatments[${i}].concentration`, '');
			ctxt.setFieldValue(`case.treatments[${i}].routeofAdministration`, '');
			ctxt.setFieldValue(`case.treatments[${i}].pharmaceuticalForm`, '');
			ctxt.setFieldValue(`case.treatments[${i}].name`, '');
			ctxt.setFieldValue(`case.treatments[${i}].salesUnit`, '');
			ctxt.setFieldValue(`case.treatments[${i}].skuSap`, '');
			setCurrentUnit('');
		}
	};

	const handleDependencyFields = (
		values: ISessionPatientTreatmentForm,
		i: number,
	) => (name: string, selectedOption: IPropsMentorOptionsDropDown) => {
		if (selectedOption) {
			let skuList = getSKUList(selectedOption.value);
			if (name.includes('concentrations')) {
				if (values.administrationRoute) {
					const skuListROA = getSKUList(values.administrationRoute);
					const intersection = arrayIntersection(skuList, skuListROA);
					skuList = intersection.length > 0 ? intersection : skuList;
				}
				if (values.pharmaceuticalForm) {
					const skuListPHF = getSKUList(values.pharmaceuticalForm);
					const intersection = arrayIntersection(skuList, skuListPHF);
					skuList = intersection.length > 0 ? intersection : skuList;
				}
			} else if (name.includes('administrationRoute')) {
				if (values.concentrations) {
					const skuListCON = getSKUList(values.concentrations);
					const intersection = arrayIntersection(skuList, skuListCON);
					skuList = intersection.length > 0 ? intersection : skuList;
				}
				if (values.pharmaceuticalForm) {
					const skuListPHF = getSKUList(values.pharmaceuticalForm);
					const intersection = arrayIntersection(skuList, skuListPHF);
					skuList = intersection.length > 0 ? intersection : skuList;
				}
			} else if (name.includes('pharmaceuticalForm')) {
				if (values.administrationRoute) {
					const skuListROA = getSKUList(values.administrationRoute);
					const intersection = arrayIntersection(skuList, skuListROA);
					skuList = intersection.length > 0 ? intersection : skuList;
				}
				if (values.concentrations) {
					const skuListCON = getSKUList(values.concentrations);
					const intersection = arrayIntersection(skuList, skuListCON);
					skuList = intersection.length > 0 ? intersection : skuList;
				}
			}
			const {
				concentrations,
				administrationRoutes,
				pharmaceuticalForms,
				brandsOptions,
				salesUnit,
			} = getInfoFromSKUList(skuList, productInfo);
			ctxt.setFieldValue(name, selectedOption.value);
			if (name.includes('concentration')) {
				setDropdownValues((val) => ({
					...val,
					administrationRoutes,
					brands: brandsOptions,
					pharmaceuticalForms,
					salesUnit,
				}));
			} else if (name.includes('routeofAdministration')) {
				setDropdownValues((val) => ({
					...val,
					brands: brandsOptions,
					concentrations,
					pharmaceuticalForms,
					salesUnit,
				}));
			} else if (name.includes('pharmaceuticalForm')) {
				setDropdownValues((val) => ({
					...val,
					administrationRoutes,
					brands: brandsOptions,
					concentrations,
					salesUnit,
				}));
				if (salesUnit.length > 0) {
					const salesUnitVal = salesUnit[0].value;
					setCurrentUnit(salesUnitVal || '');
					ctxt.setFieldValue(
						`case.treatments[${i}].salesUnit`,
						salesUnitVal || '',
					);
				}
				if (skuList.length > 0) {
					const skuSapValue = skuList[0];
					ctxt.setFieldValue(
						`case.treatments[${i}].skuSap`,
						skuSapValue || '',
					);
				}
			}
		} else {
			setDropdownValues({
				...productInfo,
			});
			ctxt.setFieldValue(name, '');
		}
	};

	return (
		<TreatmentItem className={'TreatmentItem'}>
			<Heading2>Medicamento {index + 1}</Heading2>
			<FormRow
				key={'formRow_1'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={3.33} key={`FormColumn-MedicineData_Component`}>
						<MentorTypeAhead
							label='Componente activo'
							isClearable={true}
							lowercaseLabel={true}
							name={`case.treatments[${index}].component`}
							value={ctxtValue.component}
							triggerChange={handlePrincipleChange(index)}
							loadOptions={handleTypePrinciple(ctxtValue.component)}
							defaultOptions={componentOptions}
							inputValue={ctxtValue.component}
						/>
					</FormColumn>,
					<FormColumn width={5} key={`FormColumn-MedicineData_Concentration`}>
						<MentorDropDown
							label='Concentración'
							lowercaseLabel={true}
							name={`case.treatments[${index}].concentrations`}
							value={ctxtValue.concentrations}
							isClearable={true}
							triggerChange={handleDependencyFields(ctxtValue, index)}							
							maxMenuHeight={250}
							options={dropdownValues.concentrations}
						/>
					</FormColumn>,
					<FormColumn width={4} key={`FormColumn-MedicineData_Route`}>
						<MentorDropDown													
							label='Vía de administración'
							lowercaseLabel={true}
							name={`case.treatments[${index}].administrationRoute`}
							value={ctxtValue.administrationRoute}
							isClearable={true}
							triggerChange={handleDependencyFields(ctxtValue, index)}
							maxMenuHeight={250}
							options={dropdownValues.administrationRoutes}
						/>
					</FormColumn>,
					<FormColumn width={4} key={`FormColumn-MedicineData_Form`}>
						<MentorDropDown
							label='Forma farmacéutica'
							lowercaseLabel={true}
							name={`case.treatments[${index}].pharmaceuticalForm`}
							value={ctxtValue.pharmaceuticalForm}
							isClearable={true}
							triggerChange={handleDependencyFields(ctxtValue, index)}
							maxMenuHeight={250}
							options={dropdownValues.pharmaceuticalForms}
						/>
					</FormColumn>,
				]}
			/>
			<FormRow
				key={'formRow_2'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={2} key={`FormColumn-MedicineData_Brand`}>
						<MentorTypeAhead
							simple={true}
							isClearable={true}
							label='Producto sugerido (opcional)'
							lowercaseLabel={true}
							name={`case.treatments[${index}].name`}
							triggerChange={handleBrandChange(index, ctxtValue)}
							options={dropdownValues.brands}
							inputValue={ctxtValue.name}
							value={ctxtValue.name}
						/>
					</FormColumn>,
					<FormColumn width={4} key={`FormColumn-MedicineData_Duration`}>
						<UnitWrapper>
							<MentorInput
								label='Duración tratamiento'
								lowercaseLabel={true}
								error={renderError(ctxt, index, 'period')}
								attrs={{
									maxLength: DEFAULT_MAX_LENGTH,
									name: `case.treatments[${index}].period`,
									onBlur: ctxt.handleBlur,
									onChange: handleDurationChange,
									value: ctxtValue.period,
								}}
							/>
							<Unit>Días</Unit>
						</UnitWrapper>
					</FormColumn>,
					<FormColumn width={4} key={`FormColumn-MedicineData_Quantity`}>
						<UnitWrapper>
							<MentorInput
								label='Cantidad Total'
								lowercaseLabel={true}
								error={renderError(ctxt, index, 'quantity')}
								attrs={{
									maxLength: DEFAULT_MAX_LENGTH,
									name: `case.treatments[${index}].quantity`,
									onBlur: ctxt.handleBlur,
									onChange: handleQuantityChange,
									value: ctxtValue.quantity,
								}}
							/>
							<Unit>{currentUnit}</Unit>
						</UnitWrapper>
					</FormColumn>,
				]}
			/>
			<FormRow
				key={'formRow_3'}
				style={defaultRowStyle}
				columns={[
					<FormColumn width={2} key={`FormColumn-MedicineData_Period`}>
						<MentorTextArea
							label='Posología'
							error={renderError(ctxt, index, 'frequency')}
							attrs={{
								name: `case.treatments[${index}].frequency`,
								onBlur: ctxt.handleBlur,
								onChange: ctxt.handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: ctxtValue.frequency,
							}}
						/>
					</FormColumn>,
					<FormColumn width={2} key={`FormColumn-MedicineData_Information`}>
						<MentorTextArea
							label='Información adicional (opcional)'
							attrs={{
								name: `case.treatments[${index}].extra_info`,
								onBlur: ctxt.handleBlur,
								onChange: ctxt.handleChange,
								rows: 4,
								style: { height: 'auto' },
								value: ctxtValue.extra_info,
							}}
						/>
					</FormColumn>,
				]}
			/>
			<OptionsHandler>
				<button onClick={removeMedicine(index)} type={'button'}>
					<Icon name={'trash'} />
					<Body1>Eliminar</Body1>
				</button>
				{treatmentLen === index + 1 && (
					<button
						disabled={treatmentLen >= MAX_MEDICINE_AMOUNT}
						onClick={addNewMedicine}
						type={'button'}
					>
						<Icon name={'add-circle'} />
						<Body1>Agregar medicamento</Body1>
					</button>
				)}
			</OptionsHandler>
		</TreatmentItem>
	);
};

export default TreatmentFields;
