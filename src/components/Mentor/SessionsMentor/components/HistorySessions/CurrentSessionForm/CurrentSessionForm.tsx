import * as React from 'react';

import FormColumn from "../../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../../common/FormRow/FormRow";
import { Heading2 } from '../../../../../../common/MentorText';
import MentorTextArea from '../../../../../../common/MentorTextArea/MentorTextArea';
import PatientBackgroundFormContext from '../../PatientHistoryForm/PatientBackgroundForm.context';

interface IPropsCurrentSessionForm {
  forceDisable?: boolean;
}

const DEFAULT_MAX_LEGTH = 150;
const DEFAULT_COLUMN_WIDTH = 1;
const defaultRowStyle = { padding: '15px 0 0 0', margin: 0 };

const CurrentSessionForm: React.FC<IPropsCurrentSessionForm> = ({ forceDisable }) => {
  const { values, handleBlur, handleChange } = React.useContext(PatientBackgroundFormContext);

  return (
    <React.Fragment>
      <FormRow key={'row_1'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'anamnesis'}>
        <Heading2>Anamnesis</Heading2>
          <MentorTextArea
            disabled={!!forceDisable}
            label="Escribe la anamnesis del paciente:"
            attrs={{
                maxLength: DEFAULT_MAX_LEGTH,
                name: "case.anamnesis",
                onBlur: handleBlur,
                onChange: handleChange,
                rows: 4,
                style: {  height: 'auto' },
                value: values.case.anamnesis,
            }} />
        </FormColumn>
      ]}/>
      <FormRow key={'row_2'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'diagnostic'}>
        <Heading2>Diagnóstico</Heading2>
          <MentorTextArea
            disabled={!!forceDisable}
            label="Escribe el diagnóstico del paciente:"
            attrs={{
                maxLength: DEFAULT_MAX_LEGTH,
                name: "case.diagnostic",
                onBlur: handleBlur,
                onChange: handleChange,
                rows: 4,
                style: {  height: 'auto' },
                value: values.case.diagnostic,
            }} />
        </FormColumn>
      ]}/>
      <FormRow key={'row_3'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'recommendation'}>
          <MentorTextArea
            disabled={!!forceDisable}
            label="Recomendaciones del tratamiento:"
            attrs={{
                maxLength: DEFAULT_MAX_LEGTH,
                name: "case.recommendation",
                onBlur: handleBlur,
                onChange: handleChange,
                rows: 4,
                style: {  height: 'auto' },
                value: values.case.recommendation,
            }} />
        </FormColumn>
      ]}/>
    </React.Fragment>
  )
};

export default CurrentSessionForm;
