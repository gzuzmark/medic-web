import * as React from 'react';

import styled from "styled-components";
import FormColumn from "../../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../../common/FormRow/FormRow";
import { IPropsMentorOptionsDropDown } from '../../../../../../common/MentorDropDown/MentorDropDown';
import { Heading2, Headline1 } from '../../../../../../common/MentorText';
import MentorTextArea from '../../../../../../common/MentorTextArea/MentorTextArea';
import MentorTypeAhead from '../../../../../../common/MentorTypeAhead/MentorTypeAhead';
import MentorService from '../../../../../../services/Mentor/Mentor.service';
import PatientBackgroundFormContext from '../../PatientHistoryForm/PatientBackgroundForm.context';
import HistoryTreatmentForm from '../HistoryTreatmentForm/HistoryTreatmentForm';
import { mapResponse } from '../HistoryTreatmentForm/Utils';

interface IPropsCurrentSessionForm {
  forceDisable?: boolean;
  showSeeRecipeButton: boolean;
  folioNumber: string;
  getPrescriptionURL: () => void;
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

const CurrentSessionForm: React.FC<IPropsCurrentSessionForm> = ({ forceDisable, showSeeRecipeButton, folioNumber, getPrescriptionURL }) => {
  const { values, handleBlur, handleChange, setFieldValue } = React.useContext(PatientBackgroundFormContext);
  const [diagnosticDescription, setDiagnosticDescription] = React.useState<string>('');
  const [diagnosticOptions, setDiagnosticOptions] = React.useState<
		IPropsMentorOptionsDropDown[]
	>([]);
  const service = new MentorService();
  const handleOpenRecipe = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getPrescriptionURL();
  };

  React.useEffect(() => {
    async function retrieveDiagnostic() {
      const diagnostic = values.case.diagnostic;
      const diagnosticCode = diagnostic && diagnostic.includes(' - ') && diagnostic.split(' - ')[0] || diagnostic;
      const { items } = await service.getDiagnosticCodes(
				diagnosticCode,
				false,
      ) as Record<string, string>;
      if (Array.isArray(items)) {
				const mappedData = mapResponse(items) as IPropsMentorOptionsDropDown[];
        setDiagnosticOptions(mappedData);
        const response = (await service.getDiagnosticDescription(
					diagnosticCode,
        )) as Record<string, string>;
        const { description } = response;
        setDiagnosticDescription(description);
        setFieldValue('case.diagnostic', diagnosticCode);
        setFieldValue('case.diagnosticDesc', description);
      }
    }
    retrieveDiagnostic();
  }, []);


  const handleTypeDiagnostic = (value: string) => (query: string) =>
		new Promise((resolve) => {
			const param = query || value;
			if (param) {
				service.getDiagnosticCodes(param).then((data: Record<string, string>) => {
          const { items } = data;
					if (Array.isArray(items)) {
						const mappedData = mapResponse(
							items,
						) as IPropsMentorOptionsDropDown[];
						setDiagnosticOptions(mappedData);
						resolve(mappedData);
					}
				});
			}
    });
  const handleDiagnosticChange = (
    name: string,
    selectedOption: IPropsMentorOptionsDropDown,
  ) => {
    if (selectedOption) {
      service.getDiagnosticDescription(selectedOption.value).then((response: Record<string, string>) => {
        const { description } = response;
        setDiagnosticDescription(description);
        setFieldValue('case.diagnosticDesc', description);
      });
      setFieldValue(name, selectedOption.value);
    } else {      
      setFieldValue(name, '');
      setDiagnosticDescription('');
      setFieldValue('case.diagnosticDesc', '');
    }
  };

  const diag = values.case.diagnostic;
  const diagCode = diag && diag.includes(' - ') && diag.split(' - ')[0] || diag;
  // tslint:disable:no-console
  console.log({ diag, diagCode });
  
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
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'diagnosticCode'}>
          <Heading2>Diagnóstico</Heading2>
          <MentorTypeAhead
            label="Escribe el código de diagnóstico:"
            isClearable={true}
            lowercaseLabel={true}
            name={`case.diagnostic`}
            value={diagCode}
            triggerChange={handleDiagnosticChange}
            loadOptions={handleTypeDiagnostic(diagCode)}
            defaultOptions={diagnosticOptions}
            inputValue={diagCode}
          />
        </FormColumn>,
      ]}/>
      <FormRow key={'row_new'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'diagnosticDescription'}>
          <MentorTextArea
            disabled={true}
            attrs={{
                rows: 2,
                style: {  height: 'auto' },
                value: diagnosticDescription,
            }} />
        </FormColumn>,
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
              <button onClick={handleOpenRecipe} className='u-Button'>
                Ver Receta
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
