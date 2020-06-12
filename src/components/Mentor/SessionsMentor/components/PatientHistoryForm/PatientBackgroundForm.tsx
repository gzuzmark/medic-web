import * as React from 'react';

import FormColumn from "../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../common/FormRow/FormRow";
import MentorInput from "../../../../../common/MentorInput/MentorInput";
import MentorTextArea from '../../../../../common/MentorTextArea/MentorTextArea';
import PatientBackgroundFormContext from './PatientBackgroundForm.context';

interface IPropsPatientBackground {
  isWomanHistory?: boolean;
  forceDisable?: boolean;
  notGender?: boolean
}

const DEFAULT_MAX_LEGTH = 150;
const DEFAULT_COLUMN_WIDTH = 2;
const defaultRowStyle = { padding: '15px 0 0 0', margin: 0 };
const noGenderMessage = ' (Solo sexo Femenino)';
const noGenderElement = (flag: boolean): string => flag ? noGenderMessage : '';

const PatientBackground: React.FC<IPropsPatientBackground> = ({
  isWomanHistory,
  forceDisable,
  notGender = false,
}) => {
  const { values, handleBlur, handleChange } = React.useContext(PatientBackgroundFormContext);
  const noGenderText = noGenderElement(notGender);
  return (
    <React.Fragment>
      <FormRow key={'row_1'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'allergies'}>
          <MentorInput
            label={"Alergias:"}
            lowercaseLabel={true}
            disabled={!!forceDisable}
            attrs={{
              maxLength: DEFAULT_MAX_LEGTH,
              name: 'history.allergies',
              onBlur: handleBlur,
              onChange: handleChange,
              value: values.history.allergies}}/>
        </FormColumn>,
        isWomanHistory || notGender ?
          <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'fur'}>
            <MentorInput
              label={`FUR:${noGenderText}`}
              lowercaseLabel={true}
              disabled={!!forceDisable}
              attrs={{
                maxLength: DEFAULT_MAX_LEGTH,
                name: 'history.fur',
                onBlur: handleBlur,
                onChange: handleChange,
                value: values.history.fur}}/>
          </FormColumn> :
          <React.Fragment key={'empty_1'} />
    ]}/>
    <FormRow key={'row_2'} style={defaultRowStyle} columns={[
      <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'meds'}>
        <MentorInput
          label={"Medicamentos que está tomando:"}
          lowercaseLabel={true}
          disabled={!!forceDisable}
          attrs={{
            maxLength: DEFAULT_MAX_LEGTH,
            name: 'history.meds',
            onBlur: handleBlur,
            onChange: handleChange,
            value: values.history.meds}}/>
      </FormColumn>,
      isWomanHistory || notGender ?
        <FormColumn width={2} key={'last_pregnancy'}>
          <MentorInput
            label={`Fin de última gestación:${noGenderText}`}
            lowercaseLabel={true}
            disabled={!!forceDisable}
            attrs={{
              maxLength: DEFAULT_MAX_LEGTH,
              name: 'history.last_pregnancy',
              onBlur: handleBlur,
              onChange: handleChange,
              value: values.history.last_pregnancy}}/>
        </FormColumn> :
        <React.Fragment key={'empty_2'} />
  ]}/>
  <FormRow key={'row_3'} style={defaultRowStyle} columns={[
    <FormColumn width={2} key={'extra_info'}>
      <MentorTextArea
        disabled={!!forceDisable}
        label="Información adicional o condición pre-existente:"
        attrs={{
            maxLength: DEFAULT_MAX_LEGTH,
            name: "history.extra_info",
            onBlur: handleBlur,
            onChange: handleChange,
            rows: 4,
            style: {  height: 'auto' },
            value: values.history.extra_info,
        }} />
    </FormColumn>,
    isWomanHistory || notGender ?
      <FormColumn width={2} key={'ob_issues'}>
        <MentorTextArea
          disabled={!!forceDisable}
          label={`Antecedentes Obstétricos:${noGenderText}`}
          attrs={{
              maxLength: DEFAULT_MAX_LEGTH,
              name: "history.ob_issues",
              onBlur: handleBlur,
              onChange: handleChange,
              rows: 4,
              style: {  height: 'auto' },
              value: values.history.ob_issues,
          }} />
      </FormColumn> :
      <React.Fragment key={'empty_3'} />
]}/>
    </React.Fragment>
  )
};

export default PatientBackground;
