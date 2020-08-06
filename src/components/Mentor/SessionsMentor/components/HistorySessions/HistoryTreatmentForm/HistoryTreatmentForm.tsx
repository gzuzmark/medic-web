import {ArrayHelpers, FieldArray} from "formik";
import * as React from "react";
import styled from "styled-components";
import FormColumn from "../../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../../common/FormRow/FormRow";
import Icon from "../../../../../../common/Icon/Icon";
import colors from "../../../../../../common/MentorColor";
import MentorDropDown, { IPropsMentorOptionsDropDown } from "../../../../../../common/MentorDropDown/MentorDropDown";
import MentorInput from "../../../../../../common/MentorInput/MentorInput";
import { Body1, Heading2 } from "../../../../../../common/MentorText";
import MentorTextArea from "../../../../../../common/MentorTextArea/MentorTextArea";
import MentorTypeAhead from "../../../../../../common/MentorTypeAhead/MentorTypeAhead";
import { ISessionPatientTreatmentForm, SAPCODE_SEPARATOR } from "../../../../../../domain/Session/SessionEditPatientHistory";
import MentorService from "../../../../../../services/Mentor/Mentor.service";
import PatientBackgroundFormContext, { IPatientBackgroundFormContext } from "../../PatientHistoryForm/PatientBackgroundForm.context";

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
            color: ${colors.BACKGROUND_COLORS.background_green }
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

export interface IPropsHistoryTreatmentForm {
    isEdit?: boolean;
    forceDisable?: boolean;
}

const defaultRowStyle = { padding: '15px 0 0 0', margin: 0 };
const DEFAULT_MAX_LENGTH = 250;
const MAX_MEDICINE_AMOUNT = 5;

interface IOptionBuilder {
  mapper: (value: string, id: string) => IPropsMentorOptionsDropDown | IMappedText;
  getter: (option: IPropsMentorOptionsDropDown | IMappedText) => any;
  comparer: (value: string) => (option: IPropsMentorOptionsDropDown | IMappedText) => boolean;
}

interface IOptionTypes {
  dropdown: IOptionBuilder,
  input: IOptionBuilder,
}

const arrayIntersection = (a1: string[], a2: string[]) => a1.filter(v => a2.includes(v));

const FIELD_BUILDER_TYPES: IOptionTypes = {
	dropdown: {
		comparer: (value: string) => (option: IPropsMentorOptionsDropDown) =>
			option.label === value,
		getter: ({ label, value }: IPropsMentorOptionsDropDown) => ({
			key: value,
			value: label,
		}),
		mapper: (value: string, id: string): IPropsMentorOptionsDropDown => ({
			label: value,
			value: id,
		}),
	},
	input: {
		comparer: (value: string) => (option: IMappedText) =>
			option.value === value,
		getter: ({ value, id }: IMappedText) => ({ key: id, value }),
		mapper: (value: string, id: string): IMappedText => ({
			id,
			value,
		}),
	},
};

const mapResponse = (data: string[], id: string = ''): IPropsMentorOptionsDropDown[] => {
  return data.map(value => ({
    label: value,
    value: id ? `${id}_${value}` : value,
  } as IPropsMentorOptionsDropDown));
};

const getSKUList = (value: string): string[] => {
  return value.split(SAPCODE_SEPARATOR).filter((_: string, i: number, src: any[]) => i !== src.length - 1);
};

interface IMappedText {
  id: string;
  value: string;
}

interface IProductInfo {
  concentrations: IPropsMentorOptionsDropDown[];
  administrationRoutes: IPropsMentorOptionsDropDown[];
  pharmaceuticalForms: IPropsMentorOptionsDropDown[];
  brands: IPropsMentorOptionsDropDown[];
  salesUnit: IMappedText[];
}

const productInfoInitialValues = {
  administrationRoutes: [],
  brands: [],
  concentrations: [],
  pharmaceuticalForms: [],
  salesUnit: [],
};

const areSKUsOnValue = (skuList: string[], type: string = 'dropdown') => (option: IPropsMentorOptionsDropDown | IMappedText) => {
  const { getter } = FIELD_BUILDER_TYPES[type];
  const { key: value } = getter(option);
  const currentSKUList = getSKUList(value);
  const currentSKUSet = new Set(currentSKUList);
  return new Set(skuList.filter((s: string) => currentSKUSet.has(s))).size > 0;
};

const getInfoFromSKUList = (skuList: string[], info: IProductInfo) => {
  const concentrations = info.concentrations.filter(areSKUsOnValue(skuList));
  const administrationRoutes = info.administrationRoutes.filter(areSKUsOnValue(skuList));
  const pharmaceuticalForms = info.pharmaceuticalForms.filter(areSKUsOnValue(skuList));
  const brandsOptions = info.brands.filter(areSKUsOnValue(skuList));
  const salesUnit = info.salesUnit.filter(areSKUsOnValue(skuList, 'input'));

  return {
    administrationRoutes,
    brandsOptions,
    concentrations,
    pharmaceuticalForms,
    salesUnit,
  };
};

const buildDropdownOptions = (
  data: any[],
  key: string,
  builder: IOptionBuilder,
): IPropsMentorOptionsDropDown[] | IMappedText[] => {
  const { mapper, getter, comparer } = builder;
  return data
  .map(d => mapper(d[key], d.skuSap))
  .reduce((acc: any[], option: any) => {
    const { key: skuSap, value: label } = getter(option);
    // Find the index of the current label in the new array
    const indexOfLabel = acc.findIndex(comparer(label));          
    const isLabelOnArray = !!acc.length && indexOfLabel >= 0;
    if (isLabelOnArray) {// if is on the new array
      // Getting the accumulated key
      const { key: curId } = getter(acc[indexOfLabel]);
      // Appending the sku sap with the accumulated identificato
      const newId = `${skuSap}_${curId}`;
      // Modifying the id param specific object in the new array based on the index found
      acc[indexOfLabel] = mapper(label, newId);
      return acc;
    } else {// if is not on the new array (first time)
      // Appending the sku sap code with the original label
      const newId = `${skuSap}_${label}`;
      // Adding the new element
      return [...acc, mapper(label, newId)];
    }
  }, []);
};

const HistoryTreatmentForm: React.FC <IPropsHistoryTreatmentForm> = (props) => {
  const [productInfo, setProductInfo] = React.useState<IProductInfo>(productInfoInitialValues);
  const [dropdownValues, setDropdownValues] = React.useState<IProductInfo>(productInfoInitialValues);
  const [currentUnit, setCurrentUnit] = React.useState<string>('');
  const mentorService = new MentorService();

  const renderTreatment = (ctxt: IPatientBackgroundFormContext) => {
    let counter = 0;
    const treatments = !!ctxt.values.case.treatments ? ctxt.values.case.treatments : [] as ISessionPatientTreatmentForm[];
    return (arrayHelpers: ArrayHelpers) => {
      const addNewMedicine = () => arrayHelpers.push({
        activePrinciples: '',
        brand: '',
        component: '',
        concentration: '',
        extra_info: '',
        frequency: '',
        name: '',
        period: '',
        pharmaceuticalForm: '',
        quantity: '',
        routeofAdministration: '',
        salesUnit: '',        
      });
      const removeMedicine = (index: number) => {
        return () => {
          setProductInfo(productInfoInitialValues);
          setCurrentUnit('');
          arrayHelpers.remove(index);
        }
      };
      if (treatments.length === 0) {
        return (
          <OptionsHandler>
            <button disabled={treatments.length >= MAX_MEDICINE_AMOUNT || !!props.forceDisable} onClick={addNewMedicine} type={"button"}>
              <Icon name={"add-circle"}/><Body1>Agregar medicamento</Body1>
            </button>
          </OptionsHandler>
        )
      }

      const handleTypePrinciple = (query: string) => new Promise(resolve => {
        mentorService.getActivePrinciples(query).then((data: string[]) => {
          const mappedData = mapResponse(data) as IPropsMentorOptionsDropDown[];
          resolve(mappedData);
        });
      });

      const handleBrandChange = (i: number, value: ISessionPatientTreatmentForm) => (name: string, selectedOption: IPropsMentorOptionsDropDown) => {
        const currentValue = selectedOption && selectedOption.value || '';
        // tslint:disable:no-console
        console.log({ value, selectedOption });
        if (currentValue) {
          const skuList = getSKUList(currentValue);
          ctxt.setFieldValue(name, selectedOption.value);
          if (skuList.length > 0) {
            const info = getInfoFromSKUList(skuList, productInfo);
  
            setDropdownValues({
              ...dropdownValues,
              ...info,
            });
            setCurrentUnit(info.salesUnit[0].value);
            if (!value.concentration) {
              ctxt.setFieldValue(`case.treatments[${i}].concentration`, info.concentrations[0].value);
            }
            if (!value.routeofAdministration) {
              ctxt.setFieldValue(`case.treatments[${i}].routeofAdministration`, info.administrationRoutes[0].value);
            }
            if (!value.pharmaceuticalForm) {
              ctxt.setFieldValue(`case.treatments[${i}].pharmaceuticalForm`, info.pharmaceuticalForms[0].value);
            }
          }
        } else {
          setDropdownValues({
            ...productInfo
          });
          ctxt.setFieldValue(name, '');
          ctxt.setFieldValue(`case.treatments[${i}].concentration`, '');
          ctxt.setFieldValue(`case.treatments[${i}].routeofAdministration`, '');
          ctxt.setFieldValue(`case.treatments[${i}].pharmaceuticalForm`, '');
        }
      };

      const handlePrincipleChange = (i: number) => (name: string, selectedOption: IPropsMentorOptionsDropDown) => {
        if (selectedOption) {
          mentorService.getPrincipleInformation(selectedOption.value).then((response: any[]) => {
            if (response.length > 0) {
              const newConcentrations = buildDropdownOptions(response, 'concentration', FIELD_BUILDER_TYPES.dropdown) as IPropsMentorOptionsDropDown[];
              const newAdministrationRoutes = buildDropdownOptions(response, 'routeofAdministration', FIELD_BUILDER_TYPES.dropdown) as IPropsMentorOptionsDropDown[];
              const newPharmaceuticalForms = buildDropdownOptions(response, 'pharmaceuticalForm', FIELD_BUILDER_TYPES.dropdown) as IPropsMentorOptionsDropDown[];
              const newBrands = buildDropdownOptions(response, 'brand', FIELD_BUILDER_TYPES.dropdown) as IPropsMentorOptionsDropDown[];
              const newSalesUnit = buildDropdownOptions(response, 'salesUnit', FIELD_BUILDER_TYPES.input) as IMappedText[];
  
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
              setCurrentUnit(newSalesUnit[0].value);
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
          ctxt.setFieldValue(`case.treatments[${i}].brand`, '');
        }
      };

      const handleDependencyFields = (values: ISessionPatientTreatmentForm, i: number) => (name: string, selectedOption: IPropsMentorOptionsDropDown) => {
        if (selectedOption) {
          let skuList = getSKUList(selectedOption.value);
          if (name.includes('concentration')) {
            if (values.routeofAdministration) {
              const skuListROA = getSKUList(values.routeofAdministration);
              skuList = arrayIntersection(skuList, skuListROA);
            }
            if (values.pharmaceuticalForm) {
              const skuListPHF = getSKUList(values.pharmaceuticalForm);
              skuList = arrayIntersection(skuList, skuListPHF);
            }
          } else if (name.includes('routeofAdministration')) {
            if (values.concentration) {
              const skuListCON = getSKUList(values.concentration);
              skuList = arrayIntersection(skuList, skuListCON);
            }
            if (values.pharmaceuticalForm) {
              const skuListPHF = getSKUList(values.pharmaceuticalForm);
              skuList = arrayIntersection(skuList, skuListPHF);
            }
          } else if (name.includes('pharmaceuticalForm')) {
            if (values.routeofAdministration) {
              const skuListROA = getSKUList(values.routeofAdministration);
              skuList = arrayIntersection(skuList, skuListROA);
            }
            if (values.concentration) {
              const skuListCON = getSKUList(values.concentration);
              skuList = arrayIntersection(skuList, skuListCON);
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
          // tslint:disable:no-console
          console.log({ name, values, skuList, salesUnit, selectedOption });
          
          if (name.includes('concentration')) {
            setDropdownValues(val => ({ ...val, administrationRoutes, pharmaceuticalForms, brands: brandsOptions }));
          } else if (name.includes('routeofAdministration')) {
            setDropdownValues(val => ({ ...val, concentrations, pharmaceuticalForms, brands: brandsOptions }));
          } else if (name.includes('pharmaceuticalForm')) {
            setDropdownValues(val => ({ ...val, administrationRoutes, concentrations, brands: brandsOptions }));
          }
          setCurrentUnit(salesUnit[0].value);
        } else {
          setDropdownValues({
            ...productInfo
          });
          ctxt.setFieldValue(name, '');
          ctxt.setFieldValue(`case.treatments[${i}].concentration`, '');
          ctxt.setFieldValue(`case.treatments[${i}].routeofAdministration`, '');
          ctxt.setFieldValue(`case.treatments[${i}].pharmaceuticalForm`, '');
          ctxt.setFieldValue(`case.treatments[${i}].brand`, '');
        }
      };

      return treatments.map((value: ISessionPatientTreatmentForm, index: number) => (
        <TreatmentItem key={index} className={'TreatmentItem'}>
          <Heading2>
            Medicamento {index + 1}
          </Heading2>
          <FormRow key={"formRow_1"} style={defaultRowStyle} columns={[
            <FormColumn width={3.33} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorTypeAhead
                  label="Componente activo"
                  lowercaseLabel={true}
                  name={`case.treatments[${index}].component`}
                  disabled={!!props.forceDisable}
                  value={value.component}
                  triggerChange={handlePrincipleChange(index)}
                  loadOptions={handleTypePrinciple} />
            </FormColumn>,
            <FormColumn width={5} key={`FormColumn-MedicineData_${++counter}`}>
            <MentorDropDown
                label="Concentración"
                lowercaseLabel={true}
                name={`case.treatments[${index}].concentration`}
                disabled={!!props.forceDisable}
                value={value.concentration}
                isClearable={true}
                triggerChange={handleDependencyFields(value, index)}
                options={dropdownValues.concentrations} />
            </FormColumn>,
            <FormColumn width={4} key={`FormColumn-MedicineData_${++counter}`}>
            <MentorDropDown
                label="Vía de administración"
                lowercaseLabel={true}
                name={`case.treatments[${index}].routeofAdministration`}
                disabled={!!props.forceDisable}
                value={value.routeofAdministration}
                isClearable={true}
                triggerChange={handleDependencyFields(value, index)}
                options={dropdownValues.administrationRoutes} />
            </FormColumn>,
            <FormColumn width={4} key={`FormColumn-MedicineData_${++counter}`}>
            <MentorDropDown
                label="Forma farmacéutica"
                lowercaseLabel={true}
                name={`case.treatments[${index}].pharmaceuticalForm`}
                disabled={!!props.forceDisable}
                value={value.pharmaceuticalForm}
                isClearable={true}
                triggerChange={handleDependencyFields(value, index)}
                options={dropdownValues.pharmaceuticalForms} />
            </FormColumn>
          ]}/>
          <FormRow key={"formRow_2"} style={defaultRowStyle} columns={[
            <FormColumn width={2} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorTypeAhead
                creatable={true}
                isClearable={true}
                label="Producto sugerido (opcional)"
                lowercaseLabel={true}
                name={`case.treatments[${index}].brand`}
                disabled={!!props.forceDisable}
                triggerChange={handleBrandChange(index, value)}
                options={dropdownValues.brands} />
            </FormColumn>,
            <FormColumn width={4} key={`FormColumn-MedicineData_${++counter}`}>
              <UnitWrapper>
                <MentorInput
                  label="Duración tratamiento:"
                  lowercaseLabel={true}
                  disabled={!!props.forceDisable}
                  attrs={{
                    maxLength: DEFAULT_MAX_LENGTH,
                    name: `case.treatments[${index}].period`,
                    onBlur: ctxt.handleBlur,
                    onChange: ctxt.handleChange,
                    value: value.period}}/>
                  <Unit>Días</Unit>
              </UnitWrapper>
            </FormColumn>,
            <FormColumn width={4} key={`FormColumn-MedicineData_${++counter}`}>
              <UnitWrapper>
                <MentorInput
                  label="Cantidad Total:"
                  lowercaseLabel={true}
                  disabled={!!props.forceDisable}
                  attrs={{
                    maxLength: DEFAULT_MAX_LENGTH,
                    name: `case.treatments[${index}].quantity`,
                    onBlur: ctxt.handleBlur,
                    onChange: ctxt.handleChange,
                    value: value.quantity}}/>
                <Unit>{currentUnit}</Unit>
              </UnitWrapper>
            </FormColumn>,
          ]}/>
          <FormRow key={"formRow_3"} style={defaultRowStyle} columns={[
            <FormColumn width={2} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorTextArea
                disabled={!!props.forceDisable}
                label="Posología:"
                attrs={{
                    name: `case.treatments[${index}].frequency`,
                    onBlur: ctxt.handleBlur,
                    onChange: ctxt.handleChange,
                    rows: 4,
                    style: {  height: 'auto' },
                    value: value.frequency,
                }} />
            </FormColumn>,
            <FormColumn width={2} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorTextArea
                disabled={!!props.forceDisable}
                label="Información adicional (opcional):"
                attrs={{
                    name: `case.treatments[${index}].extra_info`,
                    onBlur: ctxt.handleBlur,
                    onChange: ctxt.handleChange,
                    rows: 4,
                    style: {  height: 'auto' },
                    value: value.extra_info,
                }}/>
            </FormColumn>
          ]}/>
          <OptionsHandler>
              <button disabled={!!props.forceDisable} onClick={removeMedicine(index)} type={"button"}>
                  <Icon name={"trash"}/><Body1>Eliminar</Body1>
              </button>
              {treatments.length === index + 1 &&
              <button  disabled={treatments.length >= MAX_MEDICINE_AMOUNT || !!props.forceDisable} onClick={addNewMedicine} type={"button"}>
                  <Icon name={"add-circle"}/><Body1>Agregar medicamento</Body1>
              </button>}
          </OptionsHandler>
        </TreatmentItem>
      ))
    }
  }

  return (
    <PatientBackgroundFormContext.Consumer>
      {(context: IPatientBackgroundFormContext) => {
        return (
          <FieldArray
            name="case.treatments"
            render={renderTreatment(context)}/>
        )
      }}
    </PatientBackgroundFormContext.Consumer>
  );
};

export default HistoryTreatmentForm;
