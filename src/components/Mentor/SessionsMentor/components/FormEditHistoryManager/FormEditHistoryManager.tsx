import * as React from "react";
import {ButtonNormal} from "../../../../../common/Buttons/Buttons";
import ContentModal from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import { Body1, Display1, Heading2 } from '../../../../../common/MentorText';
import Utilities from "../../../../../common/Utils/Utilities";
import { ISessionMentor } from "../../../../../domain/Session/SessionMentorBean";
import PatientBlockContainer from "../PatientBlockContainer/PatientBlockContainer";
import PatientHistoryForm from '../PatientHistoryForm/PatientBackgroundForm';
import { IPatientBackgroundFormValidations } from "../PatientHistoryForm/PatientBackgroundForm.context";
import './FormEditHistoryManager.scss';

export interface IPropsFormEditHistoryManager {
    formData: {
        values: IPatientBackgroundFormValidations | any;
    },
    session: ISessionMentor;
    onHandleSubmit: (e: any) => void;
}

const FormEditHistoryManager: React.FC<IPropsFormEditHistoryManager> = (props) => {
    const [modal, setModal] = React.useState(false);
    const openModal = () => setModal(true);
    const patient = props.session && props.session.patient;
    const gender = patient && patient.gender;

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
            <PatientBlockContainer title={'Identificación del paciente'} blocks={[
              { label: 'EDAD:', value: patient && Utilities.getAgeByBirthDate(patient.birthDate) || '' },
              { label: 'CELULAR:', value: patient && patient.phone || '' },
              { label: 'GÉNERO:', value: patient && patient.gender === 0 ? 'Mujer' : 'Hombre' },
              { label: 'CORREO:', value: patient && patient.email || '' },
            ]} />
          </div>
          <div className="PatientClinicHistory_background">
              <Heading2>
                  Antecedentes
              </Heading2>
              <Body1 weight="500">*Si este campo está vacío, quiere decir que el paciente no declarado alergias o medicamentos</Body1>
              <PatientHistoryForm isWomanHistory={gender === 0} />
          </div>
          <ButtonNormal
            text={"Guardar"}
            attrs={...buttonAttrUpdate}
          />
      </React.Fragment>
    )
}

export default FormEditHistoryManager;
