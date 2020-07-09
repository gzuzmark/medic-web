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
import { ISessionPatientTreatmentForm } from "../../../../../../domain/Session/SessionEditPatientHistory";
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

const mapCurrentObject = (value: string, id: string) => ({
  label: value,
  value: `${id}_${value}`,
});

const mapResponse = (data: string[], id: string = ''): IPropsMentorOptionsDropDown[] => {
  return data.map(value => ({
    label: value,
    value: id ? `${id}_${value}` : value,
  } as IPropsMentorOptionsDropDown));
};

interface IMappedText {
  id: string;
  value: string;
}

interface IProductInfo {
  concentrations: IPropsMentorOptionsDropDown[];
  administrationRoutes: IPropsMentorOptionsDropDown[];
  pharmaceuticalForms: IPropsMentorOptionsDropDown[];
  brands: IMappedText[];
  salesUnit: IMappedText[];
}

const productInfoInitialValues = {
  administrationRoutes: [],
  brands: [],
  concentrations: [],
  pharmaceuticalForms: [],
  salesUnit: [],
};

const HistoryTreatmentForm: React.FC <IPropsHistoryTreatmentForm> = (props) => {
  const [productInfo, setProductInfo] = React.useState<IProductInfo>(productInfoInitialValues);
  const [currentUnit, setCurrentUnit] = React.useState<string>('');
  const mentorService = new MentorService();

  const getIndexFromName = React.useCallback((name: string, sapCode: string) => {
    if (name.includes('concentration')) {
      return productInfo.concentrations.findIndex(c => c.value[0] === sapCode);
    } else if (name.includes('routeofAdministration')) {
      return productInfo.administrationRoutes.findIndex(c => c.value[0] === sapCode);
    } else if (name.includes('pharmaceuticalForm')) {
      return productInfo.pharmaceuticalForms.findIndex(c => c.value[0] === sapCode);
    } else {
      return productInfo.brands.findIndex(c => c.value[0] === sapCode);
    }
  }, [productInfo]);

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

      const handlePrincipleChange = (index: number) => (name: string, selectedOption: IPropsMentorOptionsDropDown) => {
        mentorService.getPrincipleInformation(selectedOption.value).then((response: any[]) => {
          const newConcentrations = response.map(r => mapCurrentObject(r.concentration, r.sapcode))
          const newAdministrationRoutes = response.map(r => mapCurrentObject(r.routeofAdministration, r.sapcode));
          const newPharmaceuticalForms = response.map(r => mapCurrentObject(r.pharmaceuticalForm, r.sapcode));
          const newBrands = response.map(r => ({ id: r.sapcode, value: r.brand}));
          const newSalesUnit = response.map(r => ({ id: r.sapcode, value: r.salesUnit}));
          setProductInfo({
            administrationRoutes: newAdministrationRoutes,
            brands: newBrands,
            concentrations: newConcentrations,
            pharmaceuticalForms: newPharmaceuticalForms,
            salesUnit: newSalesUnit,
          });
          ctxt.setFieldValue(name, selectedOption.value);
          ctxt.setFieldValue(`case.treatments[${index}].concentration`, newConcentrations[0].value);
          ctxt.setFieldValue(`case.treatments[${index}].routeofAdministration`, newAdministrationRoutes[0].value);
          ctxt.setFieldValue(`case.treatments[${index}].pharmaceuticalForm`, newPharmaceuticalForms[0].value);
          ctxt.setFieldValue(`case.treatments[${index}].brand`, newBrands[0].value);
          setCurrentUnit(newSalesUnit[0].value);
        });
      };

      const handleDependencyFields = (index: number) => (name: string, selectedOption: IPropsMentorOptionsDropDown) => {
        const sapCode = selectedOption.value[0];
        const i = getIndexFromName(name, sapCode);
        const {
          concentrations,
          administrationRoutes,
          pharmaceuticalForms,
          brands,
          salesUnit,
        } = productInfo;
        ctxt.setFieldValue(`case.treatments[${index}].concentration`, concentrations[i].value);
        ctxt.setFieldValue(`case.treatments[${index}].routeofAdministration`, administrationRoutes[i].value);
        ctxt.setFieldValue(`case.treatments[${index}].pharmaceuticalForm`, pharmaceuticalForms[i].value);
        ctxt.setFieldValue(`case.treatments[${index}].brand`, brands[i].value);
        setCurrentUnit(salesUnit[i].value);
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
                  name={`case.treatments[${index}].component`}
                  disabled={!!props.forceDisable}
                  value={value.component}
                  triggerChange={handlePrincipleChange(index)}
                  loadOptions={handleTypePrinciple} />
            </FormColumn>,
            <FormColumn width={5} key={`FormColumn-MedicineData_${++counter}`}>
            <MentorDropDown
                label="Concentración"
                name={`case.treatments[${index}].concentration`}
                disabled={!!props.forceDisable}
                value={value.concentration}
                triggerChange={handleDependencyFields(index)}
                options={productInfo.concentrations} />
            </FormColumn>,
            <FormColumn width={4} key={`FormColumn-MedicineData_${++counter}`}>
            <MentorDropDown
                label="Vía de administración"
                name={`case.treatments[${index}].routeofAdministration`}
                disabled={!!props.forceDisable}
                value={value.routeofAdministration}
                triggerChange={handleDependencyFields(index)}
                options={productInfo.administrationRoutes} />
            </FormColumn>,
            <FormColumn width={4} key={`FormColumn-MedicineData_${++counter}`}>
            <MentorDropDown
                label="Forma farmacéutica"
                name={`case.treatments[${index}].pharmaceuticalForm`}
                disabled={!!props.forceDisable}
                value={value.pharmaceuticalForm}
                triggerChange={handleDependencyFields(index)}
                options={productInfo.pharmaceuticalForms} />
            </FormColumn>
          ]}/>
          <FormRow key={"formRow_2"} style={defaultRowStyle} columns={[
            <FormColumn width={2} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorInput
                label="Marca del medicamento (opcional)"
                disabled={!!props.forceDisable}
                lowercaseLabel={true}
                attrs={{
                  maxLength: DEFAULT_MAX_LENGTH,
                  name: `case.treatments[${index}].brand`,
                  onChange: ctxt.handleChange,
                  value: value.brand}}/>
            </FormColumn>,
            <FormColumn width={4} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorInput
                label="Duración tratamiento:"
                disabled={!!props.forceDisable}
                lowercaseLabel={true}
                attrs={{
                  maxLength: DEFAULT_MAX_LENGTH,
                  name: `case.treatments[${index}].period`,
                  onBlur: ctxt.handleBlur,
                  onChange: ctxt.handleChange,
                  value: value.period}}/>
            </FormColumn>,
            <FormColumn width={4} key={`FormColumn-MedicineData_${++counter}`}>
              <UnitWrapper>
                <MentorInput
                  label="Cantidad total:"
                  disabled={!!props.forceDisable}
                  lowercaseLabel={true}
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
