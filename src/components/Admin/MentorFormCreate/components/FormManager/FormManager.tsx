import * as React from "react";
import ProfileDataForm from "src/components/Admin/MentorFormCreate/components/FormsCreateDoctor/ProfileDataForm";
// import ProfileDataForm from "src/components/Admin/MentorFormBase/components/FormProfile/ProfileDataForm";
import styled from "styled-components";
import {ButtonLink, ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import ContentModal, {IGenericContentModal} from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {emailStatus, IMentorFormValidations} from "../../../../../domain/Mentor/MentorBaseForm";
import FormImage from "../../../MentorFormBase/components/FormImage/FormImage";
// import FormPersonalData from "../../../MentorFormBase/components/FormPersonalData/FormPersonalData";
// import FormProfile from "../../../MentorFormBase/components/FormProfile/FormProfile";
import {formTemplateHOC} from "../../../MentorFormBase/components/FormTemplate/FormTemplateHOC";
import {
    DOCUMENT_STATUS,
    listValidDocumentStatus
} from "../../../MentorFormBase/MentorFormBase.validations";
import FormReview from "../FormReview/FormReview";
import AwardsInfo from "../FormsCreateDoctor/AwardsInfo";
import DiagnosticsForm from "../FormsCreateDoctor/DiagnosticsForm";
import EducationDataForm from "../FormsCreateDoctor/EducationDataForm";
import ExperienceForm from "../FormsCreateDoctor/ExperienceForm";
import PatientCareInfo from "../FormsCreateDoctor/PatientCareInfo";
 /* import FormMail from "../FormMail/FormMail";*/
import PersonalDataForm from "../FormsCreateDoctor/PersonalDataForm";
import ProfessionalDataForm from "../FormsCreateDoctor/ProfessionalDataForm";

interface IPropsFormManager {
    currentStep: number;
    saving?: boolean;
    formData: {
        errors: any;
        touched: any;
        values: IMentorFormValidations | any;
    }
    updateField?: (field: string, value: string) => void;
    onBeforeStep: () => void;
    onNextStep: () => void;
    submitText: string;
    onHandleSubmit: (e: any) => void;
}

interface IStateFormManager {
    disabledFields: IFormManagerDisabledFields;
    modal: boolean;
    documentStatus: number;
}

export interface IFormManagerDisabledFields {
    firstName: boolean;
    lastName: boolean;
    documentType: boolean;
    document: boolean;
}

export interface IFormManagerInfoFields {
    firstName: string;
    lastName: string;
    documentType: string;
    document: string;
}


export const FormManagerContainer = styled.div`
    margin: 100px auto 80px auto;
    width: 874px;
`;

const FormPersonalDataTemplate = formTemplateHOC(PersonalDataForm);
const FormOccupationalDataTemplate = formTemplateHOC(ProfessionalDataForm);

const FormPatientInfo = formTemplateHOC(DiagnosticsForm,PatientCareInfo);
const FormExperienceTemplate = formTemplateHOC(ProfileDataForm,ExperienceForm);
const EducationInfo = formTemplateHOC(EducationDataForm,AwardsInfo);
const FormReviewTemplate = formTemplateHOC(FormReview);
class FormManager extends React.Component <IPropsFormManager, IStateFormManager> {
    public state: IStateFormManager;
    private buttonAttrBack: any;
    private buttonAttrContinue: any;
    private buttonAttrCancel: any;
    private warningContent: IGenericContentModal;
    constructor(props: IPropsFormManager) {
        super(props);
        this.buttonAttrBack = {type: "button", style: {marginLeft: 24, width: 136}};
        this.buttonAttrContinue = {type: "button", style: {marginLeft: 24, width: 136}};
        this.buttonAttrCancel = {};
        this.updateDisabledFields = this.updateDisabledFields.bind(this);
        this.cleanDocument = this.cleanDocument.bind(this);
        this.onChangeDocument = this.onChangeDocument.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.emailIsNotAllowed = this.emailIsNotAllowed.bind(this);
        this.openModal = this.openModal.bind(this);
        this.state = {
            disabledFields: {
                document: false,
                documentType: false,
                firstName: false,
                lastName: false,
            },
            documentStatus: DOCUMENT_STATUS.WAITING,
            modal: false
        };
        this.warningContent = {
            button: "Aceptar",
            description: "Si cancelas, perderás todos los datos ingresados",
            image: <Icon name={'alert'} />,
            title: "¿Seguro que deseas cancelar?"
        };
    }

    public render() {
        let buttonAttrCancel = {...this.buttonAttrCancel};
        let buttonAttrBack = {...this.buttonAttrBack};
        let buttonAttrContinue = {...this.buttonAttrContinue};
        let submitText = this.props.submitText;
        const {errors, touched, values} = this.props.formData;
        if (!!this.props.saving) {
            buttonAttrCancel = {...buttonAttrCancel, disabled: true};
            buttonAttrBack = {...buttonAttrBack, disabled: true};
            buttonAttrContinue = {...buttonAttrContinue, loading: 'true'};
        }
        if (1 === this.props.currentStep) {
            buttonAttrBack = {...buttonAttrBack, disabled: true};
            if (!!errors.email || !touched.email) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (this.emailIsNotAllowed(values.status, errors, touched)) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (values.status !== emailStatus.FULL_DATA) {
                if (!!errors.documentType) {
                    buttonAttrContinue = {...buttonAttrContinue, disabled: true};
                } else if (!!errors.document || !touched.document) {
                    buttonAttrContinue = {...buttonAttrContinue, disabled: true};
                } else if (listValidDocumentStatus.indexOf(this.state.documentStatus) === -1) {
                    buttonAttrContinue = {...buttonAttrContinue, disabled: true};
                }
            }
        }  else if (2 === this.props.currentStep) {
            if (!!errors.skill || !touched.skill) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true}};
            // const experiencesStatus = getExperiencesWithError(values.experiences, errors);
            
        } else if (3 === this.props.currentStep) {
            if (values.diagnostics.length > 1) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true}};
        } else if (4 === this.props.currentStep) {
            buttonAttrContinue = {...buttonAttrContinue, onClick: this.onSubmit(values)};
            submitText = "Guardar";
        }
        return (
            <React.Fragment>
                <MentorModalBase
                    show={this.state.modal}
                    onCloseModal={this.closeModal}>
                    <ContentModal.Generic generic={this.warningContent} loading={false} confirm={this.redirect} />
                </MentorModalBase>
                {1 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormPersonalDataTemplate
                            title={"Para empezar, ingresa los datos personales del especialista"}
                            disableFields={this.state.disabledFields}
                            onChangeDocument={this.onChangeDocument}
                            documentStatus={this.state.documentStatus}
                            updateDisabledFields={this.updateDisabledFields}/>
                    </FormManagerContainer>}
                {2 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormOccupationalDataTemplate 
                            title={"Informacion Profesional"}
                            disableFields={this.state.disabledFields}>
                            <FormImage id={"fileImageUploader"} mentor={false}/>
                        </FormOccupationalDataTemplate >
                    </FormManagerContainer>}
                {3 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormPatientInfo
                            title={"Ingrese la información que será visible en el perfil"}
                            name={`${values.firstName} ${values.lastName}`} />
                            <FormExperienceTemplate/>
                            <EducationInfo/>
                    </FormManagerContainer>}
                    {4 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormReviewTemplate
                            title={"Estás agregando al doctor"}
                            name={`${values.firstName} ${values.lastName}`}
                            subTitle={"Revisa la información que agregaste del doctor"} />
                    </FormManagerContainer>}
                <FormManagerContainer
                    style={{display: 'flex', justifyContent: 'flex-end', margin: ' 0 auto'}}>
                    <ButtonLink text={"Cancelar"}
                                attrs={{onClick: this.openModal, ...buttonAttrCancel}} />
                    <ButtonNormal text={"Retroceder"}
                                  type={THEME_SECONDARY}
                                  attrs={{onClick: this.props.onBeforeStep, ...buttonAttrBack}} />
                    <ButtonNormal text={submitText}
                                  attrs={{onClick: this.props.onNextStep, ...buttonAttrContinue}}/>
                </FormManagerContainer>
            </React.Fragment>
        )
    }

    private updateDisabledFields(disableFields: IFormManagerDisabledFields) {
        this.setState({ disabledFields: disableFields });
    }

    private closeModal() {
        this.setState({modal: false})
    }

    private onChangeDocument(status: number) {
        this.setState({documentStatus: status});
    }

    private onSubmit(values: IMentorFormValidations) {
        return () => {
            this.props.onHandleSubmit(values);
        }
    }

    private openModal() {
        if (this.props.currentStep === 1 ) {
            this.redirect();
        } else if (!this.props.saving) {
            this.setState({modal: true})
        }
    }

    private redirect() {
        window.location.assign('/');
    }

    private cleanDocument() {
        this.setState({documentStatus: DOCUMENT_STATUS.WAITING})
        if (this.props.updateField) {
            this.props.updateField('document', '');
        }
    }

    private emailIsNotAllowed(status: string, errors: any, touched: any) {
        return (!!errors.status ||
            !touched.status ||
            status === emailStatus.ALREADY_REGISTERED ||
            status === emailStatus.ERROR_PROCESS ||
            status === emailStatus.EMAIL_NOT_VALID ||
            status === emailStatus.CLEAN)
    }
}

export default FormManager;
