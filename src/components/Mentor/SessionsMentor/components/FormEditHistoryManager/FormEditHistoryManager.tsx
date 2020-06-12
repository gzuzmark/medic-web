import * as React from "react";
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import { Body1, Display1, Heading2, Headline1 } from '../../../../../common/MentorText';
import { getAgeByBirthDate } from "../../../../../common/Utils/Utilities";
import { ISessionPatientPastCase } from "../../../../../domain/Session/SessionEditPatientHistory";
import { ISessionMentor, ISessionTriage } from "../../../../../domain/Session/SessionMentorBean";
import CurrentSession from "../HistorySessions/CurrentSession/CurrentSession";
import CurrentSessionForm from "../HistorySessions/CurrentSessionForm/CurrentSessionForm";
import HistorySessions from "../HistorySessions/HistorySessions";
import PastSessions from '../HistorySessions/PastSessions/PastSessions';
import PatientBlockContainer from "../PatientBlockContainer/PatientBlockContainer";
import PatientHistoryForm from '../PatientHistoryForm/PatientBackgroundForm';
import { IPatientBackgroundFormValidations } from "../PatientHistoryForm/PatientBackgroundForm.context";
import './FormEditHistoryManager.scss';

export interface IPropsFormEditHistoryManager {
    formData: {
        values: IPatientBackgroundFormValidations | any;
    },
    session: ISessionMentor;
    pastCases: ISessionPatientPastCase[];
    onHandleSubmit: (e: any) => void;
}

const getGender = (value?: number): string => {
  return value === 0 ? 'Femenino' : value === 1 ? 'Masculino' : '';
};

const buildPatientInfoBlocks = (patient: any) => {
  const {
    birthdate = null,
    email = null,
    phone = null,
  } = patient || {};
  const patientAgeBlock = birthdate && { label: 'EDAD:', value: getAgeByBirthDate(patient.birthdate) };
  const patientPhoneBlock = phone && { label: 'CELULAR:', value: phone };
  const patientEmailBlock = email && { label: 'CORREO:', value: email };
  return [patientAgeBlock, patientPhoneBlock, patientEmailBlock].filter(e => !!e);
};

const FormEditHistoryManager: React.FC<IPropsFormEditHistoryManager> = (props) => {
    const [modal, setModal] = React.useState(false);
    const openModal = () => setModal(true);
    const patient = props.session && props.session.patient;
    const gender = getGender(patient && patient.gender);
    const triage = props.session && props.session.triage || {} as ISessionTriage;

    const buttonAttrBase: any = {
        onClick: openModal,
        style: {margin : '40px 0 0 auto'},
        type: "button"};
    const buttonAttrUpdate = buttonAttrBase;
    const warningContent = {
        button: "Aceptar",
        description: "Los cambios que realices se guardarán en el historial del paciente.",
        image: <Icon name={'alert'} />,
        title: "¿Estás seguro que deseas guardar los cambios?"
    };

    const onHandleSubmit = () => {
        closeModal();
        props.onHandleSubmit(props.formData.values)
    };

    const closeModal = () => setModal(false);

    const patientInfoBlocks = buildPatientInfoBlocks(patient);
    return (
        <React.Fragment>
          <MentorModalBase show={modal} onCloseModal={closeModal}>
              <ContentModal.Generic generic={warningContent} loading={false} confirm={onHandleSubmit} />
          </MentorModalBase>
          <div className={'PatientClinicHistory_info'}>
            <div className="PatientClinicHistory_info--title">
              <Display1 weight="300">
                Historia Clínica
              </Display1>
            </div>
            {patientInfoBlocks.length > 0 && (
              <PatientBlockContainer
                title={'Identificación del paciente'}
                blocks={patientInfoBlocks}
              />
            )}
          </div>
          <div className="PatientClinicHistory_background">
              <Heading2>
                  Antecedentes
              </Heading2>
              <Body1 weight="500">*Si este campo está vacío, quiere decir que el paciente no declarado alergias o medicamentos</Body1>
              <PatientHistoryForm isWomanHistory={gender === 'Femenino'} notGender={!gender} />
          </div>
          <div className="PatientClinicHistory_sessions">
            <Headline1>
              Consultas médicas
            </Headline1>
            <HistorySessions tabs={[
              {
                component: (
                  <React.Fragment>
                    <CurrentSession useCase={triage.use_case} questions={triage.questions} />
                    <CurrentSessionForm />
                  </React.Fragment>
                ),
                title: 'VER CONSULTA ACTUAL',
              },
              {
                component: <PastSessions pastCases={props.pastCases} />,
                title: 'VER CONSULTAS PASADAS',
              },
            ]} />
          </div>
          <ButtonNormal
            text={"Guardar"}
            attrs={...buttonAttrUpdate}
          />
      </React.Fragment>
    )
}

export default FormEditHistoryManager;
