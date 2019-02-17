import * as React from "react";
import styled from "styled-components";
import {ButtonLink, ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import ContentModal, {IGenericContentModal} from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {emailStatus, IMentorFormValidations} from "../../../../../domain/Mentor/MentorCreate";
import {limitDescription} from "../../MentorCreate.validations";
import FormExperience from "../FormExperience/FormExperience";
import FormImage from "../FormImage/FormImage";
import FormMail from "../FormMail/FormMail";
import FormPersonalData from "../FormPersonalData/FormPersonalData";
import FormProfile from "../FormProfile/FormProfile";
import FormReview from "../FormReview/FormReview";
import {formTemplateHOC} from "./FormTemplateHOC";

interface IPropsFormManager {
    currentStep: number;
    formData: {
        errors: any;
        touched: any;
        values: IMentorFormValidations;
    }
    onBeforeStep: () => void;
    onNextStep: () => void;
    submitText: string;
    onHandleSubmit: (e: any) => void;
}

export interface IFormManagerDisabledFields {
    firstName: boolean;
    lastName: boolean;
    documentType: boolean;
    document: boolean;
}

interface IStateFormManager {
    disabledFields: IFormManagerDisabledFields;
    modal: boolean;
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
    private warningContent: IGenericContentModal;
    constructor(props: IPropsFormManager) {
        super(props);
        this.buttonAttrBack = {type: "button", style: {marginLeft: 24}};
        this.buttonAttrContinue = {type: "button", style: {marginLeft: 24}};
        this.updateDisabledFields = this.updateDisabledFields.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.state = {
            disabledFields: {
                document: false,
                documentType: false,
                firstName: false,
                lastName: false,
            },
            modal: false
        };
        this.warningContent = {
            button: "Aceptar",
            description: "Si cancela todo se puede descontrolarsh",
            image: <Icon name={'alert'} />,
            title: "¿Seguro que deseas cancelar?"
        }
    }

    public render() {
        let buttonAttrBack = {...this.buttonAttrBack};
        let buttonAttrContinue = {...this.buttonAttrContinue};
        const {errors, touched, values} = this.props.formData;
        if (1 === this.props.currentStep) {
            buttonAttrBack = {...buttonAttrBack, disabled: ' '};
            if (!!errors.email || !touched.email) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (
                !!errors.validation ||
                !touched.validation ||
                values.validation === emailStatus.ALREADY_REGISTERED ||
                values.validation === emailStatus.ERROR_PROCESS ||
                values.validation === emailStatus.CLEAN) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            }
        } else if (2 === this.props.currentStep) {
            if (!!errors.firstName || !touched.firstName) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (!!errors.lastName || !touched.lastName) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (!!errors.documentType || !touched.documentType) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (!!errors.document || !touched.document) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (!!errors.location || !touched.location) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (!!errors.skills || !touched.skills) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            }
        } else if (3 === this.props.currentStep) {
            const experienceHasError = values.experiences.map((experience, index) => {
                let hasError = false;
                const someFieldCompleted =
                    (!experience.currentJob && experience.toYear && experience.toYear.length > 0) ||
                    (!experience.currentJob && experience.toMonth && experience.toMonth.length > 0) ||
                    (experience.fromMonth && experience.fromMonth.length > 0) ||
                    (experience.fromYear && experience.fromYear.length > 0) ||
                    (experience.company && experience.company.length > 0) ||
                    (experience.position && experience.position.length > 0);
                if (someFieldCompleted) {
                    const allShouldBeFull =
                        (experience.fromMonth && experience.fromMonth.length > 0) &&
                        (experience.fromYear && experience.fromYear.length > 0) &&
                        (!!experience.currentJob || (!experience.currentJob && experience.toYear && experience.toYear.length > 0)) &&
                        (!!experience.currentJob ||(!experience.currentJob && experience.toMonth && experience.toMonth.length > 0)) &&
                        (experience.company && experience.company.length > 0) &&
                        (experience.position && experience.position.length > 0);

                    if (allShouldBeFull) {
                        hasError = !!errors.experiences && !!errors.experiences[index];
                    } else {
                        hasError = true;
                    }
                }
                return hasError;
            });
            if (values.description && values.description.length > limitDescription) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (experienceHasError.some(v => v)) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            }
        } else if (4 === this.props.currentStep) {
            buttonAttrContinue = {...buttonAttrContinue, onClick: this.onSubmit(values)};
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
                            updateDisabledFields={this.updateDisabledFields}/>
                    </FormManagerContainer>}
                {2 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormPersonalDataTemplate
                            disableFields={this.state.disabledFields}
                            title={"Datos personales del mentor"}
                            subTitle={"Ingresa los datos del mentor que deseas agregar"} />
                    </FormManagerContainer>}
                {3 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormExperienceTemplate
                            title={"Perfil del mentor"}
                            name={`${values.firstName} ${values.lastName}`}
                            subTitle={"Esta información será visible en el perfil del mentor"} >
                            <FormImage id={"fileImageUploader"}/>
                        </FormExperienceTemplate>
                    </FormManagerContainer>}
                {4 === this.props.currentStep &&
                    <FormManagerContainer>
                        <FormReviewTemplate
                            title={"Estás agregando al mentor"}
                            name={"Mario Augusto Benedetti de las Casas Montalván"}
                            subTitle={"Revisa la información que agregaste del mentor"} />
                    </FormManagerContainer>}
                <FormManagerContainer
                    style={{display: 'flex', justifyContent: 'flex-end', margin: ' 0 auto'}}>
                    <ButtonLink text={"Cancelar"} attrs={{onClick: this.openModal}} />
                    <ButtonNormal text={"Retroceder"}
                                  type={THEME_SECONDARY}
                                  attrs={{onClick: this.props.onBeforeStep, ...buttonAttrBack}} />
                    <ButtonNormal text={this.props.submitText}
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

    private onSubmit(values: IMentorFormValidations) {
        return () => {
            this.props.onHandleSubmit(values);
        }
    }

    private openModal() {
        this.setState({modal: true})
    }

    private redirect() {
        window.location.assign('/');
    }
}

export default FormManager;
