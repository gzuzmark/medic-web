import * as React from 'react';

import styled from "styled-components";
import FormColumn from "../../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../../common/FormRow/FormRow";
import Icon from '../../../../../../common/Icon/Icon';
import { Heading2, Headline1 } from '../../../../../../common/MentorText';
import MentorTextArea from '../../../../../../common/MentorTextArea/MentorTextArea';
import PatientBackgroundFormContext from '../../PatientHistoryForm/PatientBackgroundForm.context';
import HistoryTreatmentForm from '../HistoryTreatmentForm/HistoryTreatmentForm';

interface IPropsCurrentSessionForm {
  forceDisable?: boolean;
  showSeeRecipeButton: boolean;
  folioNumber: string;
  prescriptionURL: string;
  onUploadRecipe(data: FormData): void;
}

const DEFAULT_MAX_LEGTH = 150;
const DEFAULT_COLUMN_WIDTH = 1;
const defaultRowStyle = { padding: '15px 0 0 0', margin: 0 };

const prescriptionContainerStyle = {
  display: 'flex',
  lineHeight: 1.5,
  marginTop: '15px',
};

const PrescriptionTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    margin-right: 30px;
`;

const CurrentSessionForm: React.FC<IPropsCurrentSessionForm> = ({ forceDisable, showSeeRecipeButton, folioNumber, prescriptionURL, onUploadRecipe }) => {
  const { values, handleBlur, handleChange } = React.useContext(PatientBackgroundFormContext);
  const hiddenFileInput = React.useRef(null);

  const handleOnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile =
      (e.target.files && e.target.files.length > 0 && e.target.files[0]) ||
      null;
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      onUploadRecipe(formData);
    }
  };
  
  const onFileUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (hiddenFileInput) {
      const current = hiddenFileInput.current as any;
      if (current) {
        current.click();
      }
    }
  };
  return (
    <React.Fragment>
      <FormRow key={'row_1'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'anamnesis'}>
        <Heading2>Anamnesis</Heading2>
          <MentorTextArea
            disabled={!!forceDisable}
            label="Escribe la anamnesis del paciente:"
            attrs={{
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
                name: "case.diagnostic",
                onBlur: handleBlur,
                onChange: handleChange,
                rows: 4,
                style: {  height: 'auto' },
                value: values.case.diagnostic,
            }} />
        </FormColumn>
      ]}/>
      <div style={{ marginTop: 20 }}>
        <Headline1>
          Tratamiento
        </Headline1>
        {showSeeRecipeButton && (
          <div style={prescriptionContainerStyle}>
            <PrescriptionTextContainer>
              <div><b>Receta Electrónica</b></div>
              <div>Receta Emitida: N° {folioNumber || '32453241234-001'}</div>
            </PrescriptionTextContainer>
            <div style={{ display: 'flex' }}>
              <a href={prescriptionURL} className='u-Button' target='_blank'>
                Ver Receta
              </a> 
              <input
                ref={hiddenFileInput}
                type='file'
                style={{display:'none'}}
                onChange={handleOnFileChange}
              />
              <button
                type='button'
                onClick={onFileUpload}
                className='u-Button'
                style={{ marginLeft: '10px' }}
              >
                <Icon
                  style={{ height: '80px', width: '50px', fill: '#fff' }}
                  name={'upload'}
                />{' '}
                Reemplazar receta
              </button>
            </div>
          </div>
        )}
        {!showSeeRecipeButton &&  <HistoryTreatmentForm />}
      </div>
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
