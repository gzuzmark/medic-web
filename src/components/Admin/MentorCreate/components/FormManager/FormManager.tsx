import * as React from "react";
import styled from "styled-components";
import {ButtonLink, ButtonNormal, THEME_SECONDARY} from "../../../../../common/Buttons/Buttons";
import ContentModal, {IGenericContentModal} from "../../../../../common/ConsoleModal/ContentModal";
import MentorModalBase from "../../../../../common/ConsoleModal/MentorModalBase";
import Icon from "../../../../../common/Icon/Icon";
import {emailStatus, IMentorFormExperience, IMentorFormValidations} from "../../../../../domain/Mentor/MentorCreate";
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
    saving?: boolean;
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

const filter = {
    EVERY: 'every',
    SOME: 'some'
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
        this.getExperiencesWithError = this.getExperiencesWithError.bind(this);
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
            modal: false
        };
        this.warningContent = {
            button: "Aceptar",
            description: "Si cancelas, perderás todos los datos ingresados",
            image: <Icon name={'alert'} />,
            title: "¿Seguro que deseas cancelar?"
        }
    }

    public render() {
        let buttonAttrCancel = {...this.buttonAttrCancel};
        let buttonAttrBack = {...this.buttonAttrBack};
        let buttonAttrContinue = {...this.buttonAttrContinue};
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
            } else if (!!errors.numberContact) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            }
        } else if (3 === this.props.currentStep) {
            const experiencesStatus = this.getExperiencesWithError(values.experiences, errors);
            if (values.description && values.description.length > limitDescription) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            } else if (experiencesStatus.some(error => !!error)) {
                buttonAttrContinue = {...buttonAttrContinue, disabled: true};
            }else if (experiencesStatus.length < values.experiences.length && values.experiences.length > 1 ) {
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
        if (!this.props.saving) {
            this.setState({modal: true})
        }
    }

    private redirect() {
        window.location.assign('/');
    }

    private emailIsNotAllowed(status: string, errors: any, touched: any) {
        return (!!errors.status ||
            !touched.status ||
            status === emailStatus.ALREADY_REGISTERED ||
            status === emailStatus.ERROR_PROCESS ||
            status === emailStatus.CLEAN)
    }

    private getExperiencesWithError(experiences: IMentorFormExperience[], errors: any) {
        const experiencesCompleted = experiences.filter((experience, index) => {
            return (!experience.currentJob && experience.toYear && experience.toYear.length > 0) ||
                (!experience.currentJob && experience.toMonth && experience.toMonth.length > 0) ||
                (!!experience.currentJob) ||
                this.isValidFields(experience, ["fromMonth", "fromYear", "company", "position"], filter.SOME);
        });
        const experiencesStatus = experiencesCompleted.map((experience, index) => {
            let hasError = false;
            const allShouldBeFull =
                (!!experience.currentJob || (!experience.currentJob && experience.toYear && experience.toYear.length > 0)) &&
                (!!experience.currentJob ||(!experience.currentJob && experience.toMonth && experience.toMonth.length > 0)) &&
                this.isValidFields(experience, ["fromMonth", "fromYear", "company", "position"], filter.EVERY);
            hasError = !allShouldBeFull || (!!errors.experiences && !!errors.experiences[index])
            return hasError;
        });
        return experiencesStatus
    }

    private isValidFields(experience: IMentorFormExperience, keys: string[], mode: string) {
        let status = false;
        if (mode === filter.SOME) {
            status = keys.some((key: string) => {
                return !!experience[key] && experience[key].trim().length > 0;
            })
        } else if (mode === filter.EVERY) {
            status = keys.every((key: string) => {
                return !!experience[key] && experience[key].trim().length > 0;
            })
        }
        return status
    }
}

export default FormManager;
