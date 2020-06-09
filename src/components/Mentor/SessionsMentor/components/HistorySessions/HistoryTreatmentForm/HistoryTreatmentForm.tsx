import {ArrayHelpers, FieldArray} from "formik";
import * as React from "react";
import styled from "styled-components";
import FormColumn from "../../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../../common/FormRow/FormRow";
import Icon from "../../../../../../common/Icon/Icon";
import colors from "../../../../../../common/MentorColor";
import MentorInput from "../../../../../../common/MentorInput/MentorInput";
import { Body1, Heading2 } from "../../../../../../common/MentorText";
import { ISessionPatientTreatmentForm } from "../../../../../../domain/Session/SessionEditPatientHistory";
import PatientBackgroundFormContext, { IPatientBackgroundFormContext } from "../../PatientHistoryForm/PatientBackgroundForm.context";

export const TreatmentItem = styled.div`
    padding: 30px 0;
    border-bottom: 1px solid ${colors.MISC_COLORS.background_grey_2};
    &:last-child {
        border-bottom: 0;
    }
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

const HistoryTreatmentForm: React.FC <IPropsHistoryTreatmentForm> = (props) => {
  const renderTreatment = (ctxt: IPatientBackgroundFormContext) => {
    let counter = 0;
    const treatments = !!ctxt.values.case.treatments ? ctxt.values.case.treatments : [] as ISessionPatientTreatmentForm[];
    return (arrayHelpers: ArrayHelpers) => {
      const addNewMedicine = () => arrayHelpers.push({
        component: '',
        extra_info: '',
        frequency: '',
        name: '',
        period: '',
      });
      const removeMedicine = (index: number) => {
        return () => {
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
      return treatments.map((value: ISessionPatientTreatmentForm, index: number) => (
        <TreatmentItem key={index} className={'TreatmentItem'}>
          <Heading2>
            Medicamento {index + 1}
          </Heading2>
          <FormRow key={"formRow_1"} style={defaultRowStyle} columns={[
            <FormColumn width={2} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorInput
                label={"Componente activo del medicamento"}
                disabled={!!props.forceDisable}
                lowercaseLabel={true}
                attrs={{
                  maxLength: DEFAULT_MAX_LENGTH,
                  name: `case.treatments[${index}].component`,
                  onBlur: ctxt.handleBlur,
                  onChange: ctxt.handleChange,
                  value: value.component}}/>
            </FormColumn>,
            <FormColumn width={2} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorInput
                label={"Nombre del medicamento"}
                disabled={!!props.forceDisable}
                lowercaseLabel={true}
                attrs={{
                  maxLength: DEFAULT_MAX_LENGTH,
                  name: `case.treatments[${index}].name`,
                  onBlur: ctxt.handleBlur,
                  onChange: ctxt.handleChange,
                  value: value.name}}/>
            </FormColumn>
          ]}/>
          <FormRow key={"formRow_2"} style={defaultRowStyle} columns={[
            <FormColumn width={2} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorInput
                label={"¿Con qué frecuencia?"}
                disabled={!!props.forceDisable}
                lowercaseLabel={true}
                attrs={{
                  maxLength: DEFAULT_MAX_LENGTH,
                  name: `case.treatments[${index}].frequency`,
                  onBlur: ctxt.handleBlur,
                  onChange: ctxt.handleChange,
                  value: value.frequency}}/>
            </FormColumn>,
            <FormColumn width={2} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorInput
                label={"¿Por cuánto tiempo?"}
                disabled={!!props.forceDisable}
                lowercaseLabel={true}
                attrs={{
                  maxLength: DEFAULT_MAX_LENGTH,
                  name: `case.treatments[${index}].period`,
                  onBlur: ctxt.handleBlur,
                  onChange: ctxt.handleChange,
                  value: value.period}}/>
            </FormColumn>
          ]}/>
          <FormRow key={"formRow_3"} style={defaultRowStyle} columns={[
            <FormColumn width={2} key={`FormColumn-MedicineData_${++counter}`}>
              <MentorInput
                label={"¿Información adicional?"}
                disabled={!!props.forceDisable}
                lowercaseLabel={true}
                attrs={{
                  maxLength: DEFAULT_MAX_LENGTH,
                  name: `case.treatments[${index}].extra_info`,
                  onBlur: ctxt.handleBlur,
                  onChange: ctxt.handleChange,
                  value: value.extra_info}}/>
            </FormColumn>,
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
