import * as moment from "moment";
import * as React from 'react';
import { ITriageMedia } from 'src/domain/Session/SessionMentorBean';
import styled from "styled-components";
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

import { CheckBox,  CheckBoxLabel,  CheckBoxWrapper} from "../../../../../../common/Buttons/Buttons";
import FormLabel from 'src/common/FormLabel/FormLabel';


interface IPropsCurrentSessionForm {
  forceDisable?: boolean;
  showSeeRecipeButton: boolean;
  folioNumber: string;
  photos: ITriageMedia[] | null;
  getPrescriptionURL: () => void;
}

const DEFAULT_COLUMN_WIDTH = 1;
const   defaultRowStyle = { padding: '15px 0 0 0', margin: 0 };
const MAXIMUM_DAYS_MEDICAL_LEAVE = 5

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
  const [initialDate, setInitialDate] = React.useState<Date | undefined>(undefined)
  
  const service = new MentorService();
  const sessionService = new SessionService();

    function hasMedicalLeave() {
        return values.case.medicalLeaveStartDate != null
    }
    const setMedicalLeaveStartDate = (value: {medicalLeaveStartDate: Date}) => {
        setFieldValue('case.medicalLeaveStartDate', value.medicalLeaveStartDate)
        setInitialDate(value.medicalLeaveStartDate);
    }

    const setMedicalLeaveEndDate = (value: {medicalLeaveEndDate: Date}) => {
        setFieldValue('case.medicalLeaveEndDate', value.medicalLeaveEndDate)

    }

    const onChangeMedicalLeave = (enableMedicalLeave: boolean) => {

      if(!enableMedicalLeave) {
        setFieldValue('case.medicalLeaveStartDate',  null)
        setFieldValue('case.medicalLeaveEndDate',  null)
        return
      }

      if(!hasMedicalLeave() && enableMedicalLeave) {
        setFieldValue('case.medicalLeaveStartDate',  moment().toDate())
        setFieldValue('case.medicalLeaveEndDate',  moment().add(1, 'days').toDate())
      }
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
    console.log({change});
    if (change.isYes && change.option != null) {
      setFieldValue('case.rescheduleAppointment', change.option);
    } else {
      setFieldValue('case.rescheduleAppointment', null);
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

  const isInitialDateBlocked = (day: any) => {
    const today = moment().startOf('day');
    const tomorrow = moment(today).add(1, 'd');
    const yesterday = moment(today).subtract(1, 'd')
    const availableDates = [tomorrow.toDate(), today.toDate(), yesterday.toDate()];
    return !availableDates.some(date => day.isSame(date, 'day'));
  }

  const isEndDateBlocked = (day: any) => {
    const initial = moment(initialDate).startOf('day');
    const availableDates: Date[] = [];
    for (let index = 0; index < MAXIMUM_DAYS_MEDICAL_LEAVE; index++) {
      availableDates.push(moment(initial).add(index + 1, 'd').toDate());
    }
    
    return !availableDates.some(date => day.isSame(date, 'day'));
  }

  const GET_WIDTH_BY_PERCENTAGE = (p: number) => 100 / p;
  

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
        <FormRow
				key={'row_7'}
				style={defaultRowStyle}
				columns={[
					<FormColumn
						width={GET_WIDTH_BY_PERCENTAGE(80)}
						key={'medicalLeaveStartDate'}
					>
						<Heading2>¿El paciente necesita un descanso médico?</Heading2> 
            
					</FormColumn>,
					<FormColumn
						width={GET_WIDTH_BY_PERCENTAGE(20)}
						key={'medicalLeaveCheckbox'}
            style={{alignItems: 'flex-end'}}
					>						
            <CheckBoxWrapper>
              <CheckBox id="checkbox" type="checkbox" checked={hasMedicalLeave()} onChange={e => onChangeMedicalLeave(e.target.checked)}/>
              <CheckBoxLabel htmlFor="checkbox" />
            </CheckBoxWrapper>
					</FormColumn>,
				]}
			/>
        {
          hasMedicalLeave() && (
            <>
        <FormRow
				key={'row_7'}
				style={defaultRowStyle}
				columns={[
					<FormColumn
						width={GET_WIDTH_BY_PERCENTAGE(50)}
						key={'medicalLeaveStartDate'}
					>
						<FormLabel
                label={'Fecha de Inicio'}  
                info={'El descanso debe iniciar el día desde el cual el paciente se ausente de sus labores'}    
                styles={{justifyContent: 'flex-start'}}   
                infoStyles={{marginBottom: '10px'}}                                                    
            />
            <InputDatePicker
                id="medicalLeaveStartDate"
                date={values.case.medicalLeaveStartDate || new Date()}
                updateState={setMedicalLeaveStartDate}       
                configDate={{"isDayBlocked": isInitialDateBlocked, "isOutsideRange": () => false, 'displayFormat': () => "dddd, D MMM"}}                      
            />
					</FormColumn>,
					<FormColumn
						width={GET_WIDTH_BY_PERCENTAGE(50)}
						key={'medicalLeaveEndDate'}
					>
						<FormLabel
                label={'Fecha Fin'}    
                info={'Considerando los diagnósticos presentados en telemedicina que son de baja complejidad, el descanso puede durar hasta 03 días he incluir la fecha de inicio'}     
                infoStyles={{marginBottom: '10px'}}  
                styles={{justifyContent: 'flex-start'}}                                                         
            />
            <InputDatePicker
                id="medicalLeaveEndDate"
                date={values.case.medicalLeaveEndDate || moment().add(1, 'day').toDate()}
                updateState={setMedicalLeaveEndDate}
                configDate={{"isDayBlocked": isEndDateBlocked, "isOutsideRange": () => false, 'displayFormat': () => "dddd, D MMM" }}  
            />
					</FormColumn>,
				]}
			/>

        
        <FormRow key={'row_6'} style={defaultRowStyle} columns={[
        <FormColumn width={DEFAULT_COLUMN_WIDTH} key={'medicalLeaveIndication'}>          
          <MentorTextArea
            disabled={!!forceDisable}
            label="Indicaciones sobre el descanso médico"
            attrs={{
                name: "case.medicalLeaveIndication",
                onBlur: handleBlur,
                onChange: handleChange,
                rows: 4,
                style: {  height: 'auto' },
                value: values.case.medicalLeaveIndication,
            }} />
        </FormColumn>
        
      ]}/>
      </>
      )}
    <RescheduleAppointment onChange={onChangeRescheduleAppointment} value={values.case.rescheduleAppointment} />
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
