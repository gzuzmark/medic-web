import * as React from "react";
import { ButtonNormal } from "../../../../../common/Buttons/Buttons";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import { Body1, Display1, Heading2, Headline1 } from '../../../../../common/MentorText';
import { getAgeByBirthDate } from "../../../../../common/Utils/Utilities";
import { ISessionPatientPastCase } from "../../../../../domain/Session/SessionEditPatientHistory";
import { ISessionMentor, ISessionTriage, ITriageMedia } from "../../../../../domain/Session/SessionMentorBean";
import CurrentSession from "../HistorySessions/CurrentSession/CurrentSession";
import CurrentSessionForm from "../HistorySessions/CurrentSessionForm/CurrentSessionForm";
import HistorySessions from "../HistorySessions/HistorySessions";
import PastSessions from '../HistorySessions/PastSessions/PastSessions';
import NutritionistForm from "../NutritionistForm/NutritionistForm";
import PatientBlockContainer from "../PatientBlockContainer/PatientBlockContainer";
import PatientHistoryForm from '../PatientHistoryForm/PatientBackgroundForm';
import PatientBackgroundFormContext, { IPatientBackgroundFormValidations } from "../PatientHistoryForm/PatientBackgroundForm.context";
import './FormEditHistoryManager.scss';

export interface IPropsFormEditHistoryManager {
  formData: {
    values: IPatientBackgroundFormValidations | any;
  },
  fromScheduler: boolean;
  loading: boolean;
  session: ISessionMentor;
  pastCases: ISessionPatientPastCase[];
  isNutrition: boolean;
  showSaveSession: boolean;
  showSendRecipe: boolean;
  folioNumber: string;
  prescriptionURL: string;
  hasTreatments: boolean;
  photos: ITriageMedia[] | null;
  toggleSaveSession: (flag: boolean) => void;
  toggleSendRecipe: (flag: boolean) => void;
  onHandleSubmit: (e: any) => void;
  onSendRecipe: (e: any) => void;
  getPrescriptionURL: () => void;
  handleOpenPatientPhotos: (flag: boolean) => void;
}

const getGender = (value?: number): string => {
  return value === 1 ? 'Femenino' : value === 0 ? 'Masculino' : '';
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
  const { validateForm, isValid } = React.useContext(PatientBackgroundFormContext);
  const [modal, setModal] = React.useState(false);
  const openModal = () => {
    validateForm(props.formData.values);
    if (isValid) {
      setModal(true)
    }
  };
  const patient = props.session && props.session.patient;
  const gender = getGender(patient && patient.gender);
  const triage = props.session && props.session.triage || {} as ISessionTriage;

  const buttonAttrBase: any = {
    onClick: openModal,
    style: { margin: '40px 0 0 auto' },
    type: "button"
  };
  const buttonAttrUpdate = buttonAttrBase;
  const warningContent = {
    button: "Aceptar",
    description: "Los cambios que realices se guardarán en el historial del paciente.",
    image: <Icon name={'alert'} />,
    title: "¿Estás seguro que deseas guardar los cambios?"
  };

  const onHandleSubmit = () => {
    closeModal();
    validateForm(props.formData.values);
    if (isValid) {
      props.onHandleSubmit(props.formData.values)
    }
  };

  const onHandleSendRecipe = () => {
    closeModal();
    validateForm(props.formData.values);
    if (isValid) {
      props.onSendRecipe(props.formData.values)
    }
  };

  const closeModal = () => setModal(false);

  const patientInfoBlocks = React.useMemo(() => buildPatientInfoBlocks(patient), [patient]);
  const sessionFormTitle = !!triage.use_case && !!triage.questions && triage.questions.length > 0 && 'Caso del paciente' || '';
  const caseTreatments = props.formData.values.case.treatments || [];
  const hasTreatments = props.hasTreatments || caseTreatments.length > 0;
  return (
    <React.Fragment>
      <MentorModalBase show={modal} onCloseModal={closeModal}>
        <ContentModal.Generic generic={warningContent} loading={false} confirm={onHandleSubmit} />
      </MentorModalBase>
      <div className={'PatientClinicHistory_info'}>
        <div className="PatientClinicHistory_info--title">
          <Display1 weight="300">
            Formato de Atención Clínica
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
        <Body1 weight="500">*Si este campo está vacío, quiere decir que el paciente no ha declarado alergias o medicamentos</Body1>
        <PatientHistoryForm isWomanHistory={gender === 'Femenino'} notGender={!gender} />
      </div>
      <div className="PatientClinicHistory_sessions">
        <Headline1>
          Consultas médicas
            </Headline1>
        <HistorySessions tabs={[
          {
            component: props.isNutrition ? (
              <NutritionistForm
                forceDisable={props.fromScheduler && !!props.folioNumber}
                title={sessionFormTitle}
                useCase={triage.use_case}
                questions={triage.questions}
              />
            ) : (
              <React.Fragment>
                <CurrentSession
                  title={sessionFormTitle}
                  useCase={triage.use_case}
                  questions={triage.questions}
                />
                <CurrentSessionForm
                  forceDisable={props.fromScheduler && !!props.folioNumber}
                  showSeeRecipeButton={!!props.folioNumber && !!props.getPrescriptionURL}
                  folioNumber={props.folioNumber}
                  getPrescriptionURL={props.getPrescriptionURL}
                  photos={props.photos}
                />
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
      {(props.showSaveSession || !hasTreatments) && (
        <ButtonNormal
          text={"Guardar"}
          attrs={...buttonAttrUpdate}
        />
      )}
      {(props.showSendRecipe && hasTreatments) && (
        <ButtonNormal
          text={props.loading ? "Cargando receta..." : "Enviar Receta"}
          attrs={{
            disabled: props.loading,
            onClick: onHandleSendRecipe,
            style: { margin: '40px 0 0 auto' },
            type: "button",
          }}
        />
      )}
    </React.Fragment>
  )
}

export default FormEditHistoryManager;
