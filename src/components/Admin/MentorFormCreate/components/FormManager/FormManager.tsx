import * as React from "react";
import styled from "styled-components";
import {ButtonLink, ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import ContentModal, {IGenericContentModal} from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {emailStatus, IMentorFormValidations} from "../../../../../domain/Mentor/MentorBaseForm";
import FormExperience from "../../../MentorFormBase/components/FormExperience/FormExperience";
import getExperiencesWithError from "../../../MentorFormBase/components/FormExperience/ValidateExperiences";
import FormImage from "../../../MentorFormBase/components/FormImage/FormImage";
import FormPersonalData from "../../../MentorFormBase/components/FormPersonalData/FormPersonalData";
import FormProfile from "../../../MentorFormBase/components/FormProfile/FormProfile";
import {formTemplateHOC} from "../../../MentorFormBase/components/FormTemplate/FormTemplateHOC";
import {limitDescription} from "../../../MentorFormBase/MentorFormBase.validations";
import FormMail from "../FormMail/FormMail";
import {DOCUMENT_STATUS} from "../FormMail/UseHandlerDocument";
import FormReview from "../FormReview/FormReview";

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

const FormMailTemplate = formTemplateHOC(FormMail);
const FormPersonalDataTemplate = formTemplateHOC(FormPersonalData);
const FormExperienceTemplate = formTemplateHOC(FormProfile, FormExperience);
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
            buttonAttrCancel = {...buttonAttrCancel, disabled: ' '};
            buttonAttrBack = {...buttonAttrBack, disabled: ' '};
            buttonAttrContinue = {...buttonAttrContinue, loading: 'true'};
        }
        if (1 === this.props.currentStep) {
            buttonAttrBack = {...buttonAttrBack, disabled: true};
            if (!!errors.email || !touched.email) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (this.emailIsNotAllowed(values.status, errors, touched)) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (values.status !== emailStatus.FULL_DATA) {
                if (!!errors.documentType || !touched.documentType) {
                    buttonAttrContinue = {...buttonAttrContinue, disabled: true};
                } else if (!!errors.document || !touched.document) {
                    buttonAttrContinue = {...buttonAttrContinue, disabled: true};
                } else if (this.state.documentStatus !== DOCUMENT_STATUS.NOT_FOUND) {
                    buttonAttrContinue = {...buttonAttrContinue, disabled: true};
                }
            }
        } else if (2 === this.props.currentStep) {
            if (!!errors.firstName || !touched.firstName) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (!!errors.lastName || !touched.lastName) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (!!errors.location || !touched.location) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (!!errors.skills || !touched.skills) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (!!errors.contactNumber) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            }
        } else if (3 === this.props.currentStep) {
            const experiencesStatus = getExperiencesWithError(values.experiences, errors);
            if (values.description && values.description.length > limitDescription) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (experiencesStatus.some(error => !!error)) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            }else if (experiencesStatus.length < values.experiences.length && values.experiences.length > 1 ) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            }
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
                        <FormMailTemplate
                            title={"Para empezar, ingresa el correo del mentor"}
                            disableFields={this.state.disabledFields}
                            onChangeDocument={this.onChangeDocument}
                            documentStatus={this.state.documentStatus}
                            updateDisabledFields={this.updateDisabledFields}/>
                    </FormManagerContainer>}
                {2 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormPersonalDataTemplate
                            disableFields={this.state.disabledFields}
                            title={"Datos personales del mentor"}
                            onChangeDocument={this.onChangeDocument}
                            subTitle={"Ingresa los datos del mentor que deseas agregar"} />
                    </FormManagerContainer>}
                {3 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormExperienceTemplate
                            title={"Perfil del mentor"}
                            titleForm={"Otras experiencias laborales"}
                            name={`${values.firstName} ${values.lastName}`}
                            subTitle={"Esta información será visible en el perfil del mentor"} >
                            <FormImage id={"fileImageUploader"} mentor={false}/>
                        </FormExperienceTemplate>
                    </FormManagerContainer>}
                {4 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormReviewTemplate
                            title={"Estás agregando al mentor"}
                            name={`${values.firstName} ${values.lastName}`}
                            subTitle={"Revisa la información que agregaste del mentor"} />
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