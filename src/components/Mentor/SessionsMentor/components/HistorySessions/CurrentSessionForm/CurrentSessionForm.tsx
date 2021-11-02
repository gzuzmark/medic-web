import * as moment from "moment";
import * as React from 'react';
import { ITriageMedia } from 'src/domain/Session/SessionMentorBean';
import styled from "styled-components";
import { ButtonNormal, THEME_PRIMARY, THEME_SECONDARY } from "../../../../../../common/Buttons/Buttons";
import FormColumn from "../../../../../../common/FormRow/components/FormColumn/FormColumn";
import FormRow from "../../../../../../common/FormRow/FormRow";
import { IPropsMentorOptionsDropDown } from '../../../../../../common/MentorDropDown/MentorDropDown';
import { Heading2 } from '../../../../../../common/MentorText';
import MentorTextArea from '../../../../../../common/MentorTextArea/MentorTextArea';
import MentorTypeAhead from '../../../../../../common/MentorTypeAhead/MentorTypeAhead';
import MentorService from '../../../../../../services/Mentor/Mentor.service';
import SessionService from '../../../../../../services/Session/Session.service';
import InputDatePicker from "../../../../../Admin/Reports/components/InputDatePicker/InputDatePicker";
import PatientBackgroundFormContext from '../../PatientHistoryForm/PatientBackgroundForm.context';
import RescheduleAppointment, { IOptionRescheduleAppointment } from '../../RescheduleAppointment/RescheduleAppointment';
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
  const { values, handleBlur, handleChange, setFieldValue, errors} = React.useContext(PatientBackgroundFormContext);

  const [selectedPhoto, setSelectedPhoto] = React.useState('');
  const [showPhoto, setShowPhoto] = React.useState(false);
  const [flag, setFlag] = React.useState(true);
  const [diagnosticOptions, setDiagnosticOptions] = React.useState<
		IPropsMentorOptionsDropDown[]
	>([]);
  
  const service = new MentorService();
  const sessionService = new SessionService();

    function hasMedicalLeave() {
        return values.case.medicalLeaveStartDate != null
    }
    const setMedicalLeaveStartDate = (value: {medicalLeaveStartDate: Date}) => {
        setFieldValue('case.medicalLeaveStartDate', value.medicalLeaveStartDate)
    }

    const setMedicalLeaveEndDate = (value: {medicalLeaveEndDate: Date}) => {
        setFieldValue('case.medicalLeaveEndDate', value.medicalLeaveEndDate)

    }

    const enableMedicalLeave = () => {
        if(!hasMedicalLeave()) {
            setFieldValue('case.medicalLeaveStartDate',  moment().toDate())
            setFieldValue('case.medicalLeaveEndDate',  moment().add(1, 'days').toDate())
        }
    }
    const disableMedicalLeave = () => {
        setFieldValue('case.medicalLeaveStartDate',  null)
        setFieldValue('case.medicalLeaveEndDate',  null)
    }

  const handleOpenRecipe = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getPrescriptionURL();
  };

  const onOpenPhoto = (url: string) => () => {
    setSelectedPhoto(url);
    setShowPhoto(true);
  };
  const onCloseModal = () => setShowPhoto(false);

  const onChangeRescheduleAppointment = (change: IOptionRescheduleAppointment) => {
    if (change.isYes && change.option != null) {
      setFieldValue('case.rescheduleAppointmentWeek', change.option.value);
    } else {
      setFieldValue('case.rescheduleAppointmentWeek', null);
    }
  }

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

   const validConsult = async() => {
      const thePath = window.location.href;
      const sessionID = thePath.substring(thePath.lastIndexOf('/') + 1)
      await sessionService.getSessionConsult(sessionID).then((resp : any) =>{
        if(resp.id === "" || resp.id === undefined) {
          setFlag(false);
        }
      });
    }

    validConsult()
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
            error={errors.case && errors.case.anamnesis}
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
            <div>
              <div className='CurrentSessionForm_photoElement' onClick={onOpenPhoto(photo.url)}>
                <img src={photo.url} alt=""/>
              </div>
              <div>
                <a href={photo.url} target="_blank">Abrir archivo</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PatientPhotoModal show={showPhoto} onClose={onCloseModal} photo={selectedPhoto} />
      <FormRow key={'row_4'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'diagnosticCode'}>
          <Heading2>Diagnóstico</Heading2>
          <MentorTypeAhead     
            disabled={!!forceDisable}       
            label="Escribe el código de diagnóstico:"
            isClearable={true}
            lowercaseLabel={true}
            name={`case.diagnostic`}
            value={diag}
            onBlur={handleBlur}
            triggerChange={handleDiagnosticChange}
            loadOptions={handleTypeDiagnostic(diag)}
            defaultOptions={diagnosticOptions}
            inputValue={diag}
            error={errors.case && errors.case.diagnostic}
          />
        </FormColumn>,
      ]}/>
     
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
            disabled={forceDisable}
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
          <Heading2>Tratamiento no-farmacológico:</Heading2>
          <MentorTextArea
            disabled={!!forceDisable}
            label=""
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
        <div style={{ marginTop: 20, border: 'solid 1px #1ECD96', padding: 10}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div>¿El paciente necesita un descanso médico?</div>
                <div style={{justifyContent: 'flex-end', display: 'flex', flexDirection: 'row', flex: '1'}}>
                    <ButtonNormal text="Si" type={hasMedicalLeave() ? THEME_PRIMARY : THEME_SECONDARY} attrs={{ type: 'button', style: {marginRight: 10}, onClick: enableMedicalLeave }} />
                    <ButtonNormal text="No" type={!hasMedicalLeave() ? THEME_PRIMARY : THEME_SECONDARY} attrs={{ type: 'button', style: {marginRight: 10}, onClick: disableMedicalLeave}} />
                </div>
            </div>
           <div style={{ marginTop: 10}}>
               {
                   hasMedicalLeave() && (<div style={{display:'flex', flexDirection: 'row'}}>
                       <div style={{marginRight: 10 }}>
                           <InputDatePicker
                               id="medicalLeaveStartDate"
                               date={values.case.medicalLeaveStartDate || new Date()}
                               updateState={setMedicalLeaveStartDate}
                           />
                       </div>
                       <div>
                           <InputDatePicker
                               id="medicalLeaveEndDate"
                               date={values.case.medicalLeaveEndDate || moment().add(1, 'day').toDate()}
                               updateState={setMedicalLeaveEndDate}
                           />
                       </div>
                   </div>)
               }
           </div>
        </div>
    <RescheduleAppointment onChange={onChangeRescheduleAppointment} value={values.case.rescheduleAppointmentWeek} />
    { flag && (
      <div style={{ marginTop: 20 }}>        
        {showSeeRecipeButton && (
          <div style={prescriptionContainerStyle}>
            <PrescriptionTextContainer>
              <div><b>Receta Electrónica</b></div>
              <div>Receta Emitida: N° {folioNumber || '32453241234-001'}</div>
            </PrescriptionTextContainer>
            <div style={{ display: 'flex' }}>
              <button onClick={handleOpenRecipe} className='u-Button'>
                Descargar Receta
              </button>
            </div>
          </div>
        )}
      </div>

    )}

    </React.Fragment>
  )
};

export default CurrentSessionForm;
