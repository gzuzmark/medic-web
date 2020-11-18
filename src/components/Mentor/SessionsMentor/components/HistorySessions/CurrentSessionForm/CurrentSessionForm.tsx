import * as React from 'react';
import { ITriageMedia } from 'src/domain/Session/SessionMentorBean';

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

import './CurrentSessionForm.scss';
import PatientPhotoModal from './PatientPhotoModal/PatientPhotoModal';

interface IPropsCurrentSessionForm {
  forceDisable?: boolean;
  showSeeRecipeButton: boolean;
  folioNumber: string;
  photos: ITriageMedia[] | null;
  getPrescriptionURL: () => void;
}

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

const CurrentSessionForm: React.FC<IPropsCurrentSessionForm> = ({ forceDisable, showSeeRecipeButton, folioNumber, photos, getPrescriptionURL }) => {
  const { values, handleBlur, handleChange, setFieldValue } = React.useContext(PatientBackgroundFormContext);
  const [selectedPhoto, setSelectedPhoto] = React.useState('');
  const [showPhoto, setShowPhoto] = React.useState(false);
  const [diagnosticOptions, setDiagnosticOptions] = React.useState<
		IPropsMentorOptionsDropDown[]
	>([]);
  const service = new MentorService();
  const handleOpenRecipe = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getPrescriptionURL();
  };

  const onOpenPhoto = (url: string) => () => {
    setSelectedPhoto(url);
    setShowPhoto(true);
  };
  const onCloseModal = () => setShowPhoto(false);

  React.useEffect(() => {
    async function retrieveDiagnostic() {
      const diagnostic = values.case.diagnostic;
      const { items } = await service.getDiagnosticCodes(
				diagnostic,
				false,
      ) as Record<string, string>;
      if (Array.isArray(items)) {
				const mappedData = mapResponse(items) as IPropsMentorOptionsDropDown[];
        setDiagnosticOptions(mappedData);
        setFieldValue('case.diagnostic', diagnostic);
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
        setFieldValue('case.diagnosticDesc', description);
      });
      setFieldValue(name, selectedOption.value);
    } else {
      setFieldValue(name, '');
      setFieldValue('case.diagnosticDesc', '');
    }
  };

  const diag = values.case.diagnostic;

  return (
    <React.Fragment>
      <FormRow key={'row_3'} style={defaultRowStyle} columns={[
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
      <div className='CurrentSessionForm'>
        <Heading2>Archivos adjuntos</Heading2>
        <div>Exámenes, fotos que ha subido el paciente.</div>
        <div className='CurrentSessionForm_photoContainer'>
          {photos && photos.map((photo: ITriageMedia) => (
            <div className='CurrentSessionForm_photoElement' onClick={onOpenPhoto(photo.url)}>
              <img src={photo.url} alt=""/>
            </div>
            <div>
              <a href={photo.url} target="_blank">Abrir archivo</a>
            </div>
          ))}
        </div>
      </div>
      <PatientPhotoModal show={showPhoto} onClose={onCloseModal} photo={selectedPhoto} />
      <FormRow key={'row_4'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'diagnosticCode'}>
          <Heading2>Diagnóstico</Heading2>
          <MentorTypeAhead
            label="Escribe el código de diagnóstico:"
            isClearable={true}
            lowercaseLabel={true}
            name={`case.diagnostic`}
            value={diag}
            triggerChange={handleDiagnosticChange}
            loadOptions={handleTypeDiagnostic(diag)}
            defaultOptions={diagnosticOptions}
            inputValue={diag}
          />
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
      <FormRow key={'row_1'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'external_exams'}>
        <Heading2>Exámenes de laboratorio</Heading2>
          <MentorTextArea
            disabled={!!forceDisable}
            label=""
            attrs={{
                name: "case.external_exams",
                onBlur: handleBlur,
                onChange: handleChange,
                rows: 4,
                style: {  height: 'auto' },
                value: values.case.external_exams,
            }} />
        </FormColumn>
      ]}/>
      <FormRow key={'row_2'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'exams'}>
        <Heading2>Exámenes o procedimientos auxiliares</Heading2>
          <MentorTextArea
            disabled={!!forceDisable}
            label=""
            attrs={{
                name: "case.exams",
                onBlur: handleBlur,
                onChange: handleChange,
                rows: 4,
                style: {  height: 'auto' },
                value: values.case.exams,
            }} />
        </FormColumn>
      ]}/>
      <FormRow key={'row_5'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'recommendation'}>
          <MentorTextArea
            disabled={!!forceDisable}
            label="Recomendaciones del tratamiento:"
            attrs={{
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
